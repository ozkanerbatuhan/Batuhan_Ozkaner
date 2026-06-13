import { GitHubRepo } from "./types";
import { PROFILE } from "./data/content";

const GITHUB_API = `https://api.github.com/users/${PROFILE.githubUser}/repos?per_page=100&sort=updated`;

/** Build auth headers when a token is available (raises the rate limit). */
function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

/**
 * Fetch all public repos for the configured user.
 * Cached via Next.js ISR (revalidate every hour). Forks and archived repos
 * are filtered out. Returns an empty array on any failure so the page still
 * renders the curated projects.
 */
export async function fetchPublicRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(GITHUB_API, {
      headers: githubHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const repos = (await res.json()) as GitHubRepo[];
    return repos
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  } catch {
    return [];
  }
}
