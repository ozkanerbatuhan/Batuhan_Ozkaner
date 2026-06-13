import { Project, ProjectFilter } from "./types";

const MOBILE_TECH = ["react native", "expo", "swift", "kotlin", "flutter"];
const WEB_TECH = ["react", "next.js", "next", "node.js", "node", "express", "typescript", "vue"];
const AIML_TECH = [
  "tensorflow",
  "scikit-learn",
  "fastapi",
  "openai",
  "ml",
  "ai agent",
  "pytorch",
  "machine learning",
];

function techHas(project: Project, needles: string[]) {
  const stack = project.tech_stack.map((t) => t.toLowerCase());
  return needles.some((n) => stack.some((t) => t.includes(n)));
}

/** Returns every filter category a project belongs to. */
export function categoriesFor(project: Project): ProjectFilter[] {
  const cats = new Set<ProjectFilter>(["all"]);

  if (project.type === "github_open") cats.add("open_source");
  if (project.type === "hardware") cats.add("hardware");
  if (project.type === "app_store" || techHas(project, MOBILE_TECH)) {
    cats.add("mobile");
  }
  if (techHas(project, AIML_TECH)) cats.add("ai_ml");
  if (techHas(project, WEB_TECH)) cats.add("web");

  return Array.from(cats);
}

export function matchesFilter(project: Project, filter: ProjectFilter): boolean {
  if (filter === "all") return true;
  return categoriesFor(project).includes(filter);
}
