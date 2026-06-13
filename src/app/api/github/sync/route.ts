import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { fetchPublicRepos } from "@/lib/github";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * POST /api/github/sync
 * Fetches the user's public GitHub repos and upserts them into the projects
 * table as `github_open` entries, matched by github_repo_url. Existing rows
 * keep their is_visible flag and display_order. Admin-only.
 */
export async function POST() {
  if (!isSupabaseConfigured || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Supabase is not fully configured." },
      { status: 503 },
    );
  }

  // Authenticate the caller via their session cookie.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const repos = await fetchPublicRepos();
  if (repos.length === 0) {
    return NextResponse.json({ synced: 0 });
  }

  const admin = createAdminClient();

  // Load existing rows to preserve is_visible / display_order on update.
  const { data: existing } = await admin
    .from("projects")
    .select("id, github_repo_url, display_order");

  const byUrl = new Map(
    (existing ?? [])
      .filter((r) => r.github_repo_url)
      .map((r) => [r.github_repo_url as string, r]),
  );

  let synced = 0;
  let nextOrder =
    Math.max(0, ...(existing ?? []).map((r) => r.display_order ?? 0)) + 1;

  for (const repo of repos) {
    const tech_stack = [repo.language, ...(repo.topics ?? [])].filter(
      (v): v is string => Boolean(v),
    );

    const base = {
      title: repo.name,
      description: repo.description ?? "",
      type: "github_open" as const,
      github_repo_url: repo.html_url,
      tech_stack,
    };

    const match = byUrl.get(repo.html_url);
    if (match) {
      // Update metadata only; keep visibility & order untouched.
      await admin.from("projects").update(base).eq("id", match.id);
    } else {
      await admin.from("projects").insert({
        ...base,
        is_visible: true,
        display_order: nextOrder++,
      });
    }
    synced++;
  }

  return NextResponse.json({ synced });
}
