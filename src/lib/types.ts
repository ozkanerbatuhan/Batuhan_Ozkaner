export type ProjectType =
  | "github_open"
  | "github_private"
  | "app_store"
  | "hardware";

/** A row of the Supabase `projects` table (also used as the public shape). */
export interface Project {
  id: string;
  title: string;
  /** Primary description (English by convention). */
  description: string;
  /** Optional Turkish description; falls back to `description` when empty. */
  description_tr: string | null;
  type: ProjectType;
  github_repo_url: string | null;
  app_store_url: string | null;
  tech_stack: string[];
  is_visible: boolean;
  display_order: number;
  /** GitHub-derived metadata (only present for synced public repos). */
  stars?: number | null;
  language?: string | null;
  updated_at_gh?: string | null;
  created_at?: string;
}

/** Category buckets used by the public Projects filter tabs. */
export type ProjectFilter =
  | "all"
  | "mobile"
  | "hardware"
  | "ai_ml"
  | "web"
  | "open_source";

/** Raw shape returned by the GitHub REST API (the fields we use). */
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}
