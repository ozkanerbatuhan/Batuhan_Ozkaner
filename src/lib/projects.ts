import { createClient } from "./supabase/server";
import { isSupabaseConfigured } from "./supabase/config";
import { fetchPublicRepos } from "./github";
import { FALLBACK_PROJECTS } from "./data/fallback-projects";
import { Project } from "./types";

/** Extract the repo name (last path segment) from a GitHub URL. */
function repoNameFromUrl(url: string | null): string | null {
  if (!url) return null;
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return parts[parts.length - 1]?.toLowerCase() ?? null;
  } catch {
    return null;
  }
}

/**
 * Enrich DB project rows with live GitHub metadata (stars, language, last
 * updated) by matching `github_repo_url` against the public repo list.
 */
async function enrichWithGitHub(projects: Project[]): Promise<Project[]> {
  const repos = await fetchPublicRepos();
  if (repos.length === 0) return projects;

  const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));

  return projects.map((p) => {
    const name = repoNameFromUrl(p.github_repo_url);
    const repo = name ? byName.get(name) : undefined;
    if (!repo) return p;
    return {
      ...p,
      description: p.description || repo.description || "",
      stars: repo.stargazers_count,
      language: repo.language,
      updated_at_gh: repo.updated_at,
    };
  });
}

/**
 * Public, visible projects ordered for display. Falls back to the curated
 * list when Supabase is not configured (demo mode).
 */
export async function getPublicProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) {
    return enrichWithGitHub(FALLBACK_PROJECTS.filter((p) => p.is_visible));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_visible", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) {
    // DB unreachable — degrade gracefully to the curated list.
    return enrichWithGitHub(FALLBACK_PROJECTS.filter((p) => p.is_visible));
  }

  return enrichWithGitHub(data as Project[]);
}

/** All projects (visible + hidden) for the admin dashboard. */
export async function getAllProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as Project[];
}
