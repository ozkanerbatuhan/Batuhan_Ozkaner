"use client";

import { Apple, Cpu, ExternalLink, Lock, Star } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Project, ProjectType } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/context";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

const TYPE_META: Record<
  ProjectType,
  { icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  github_open: { icon: GithubIcon, label: "Open Source" },
  github_private: { icon: Lock, label: "Private" },
  app_store: { icon: Apple, label: "App Store" },
  hardware: { icon: Cpu, label: "Hardware" },
};

function formatDate(iso?: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });
}

export function ProjectCard({ project }: { project: Project }) {
  const { t, lang } = useLanguage();
  const meta = TYPE_META[project.type];
  const Icon = meta.icon;

  const description =
    lang === "tr"
      ? project.description_tr || project.description
      : project.description;

  const updated = formatDate(project.updated_at_gh);

  return (
    <Card className="group flex h-full flex-col p-5 transition-colors hover:border-primary/40">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius)] border border-border bg-muted/50 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        {typeof project.stars === "number" && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5" />
            {project.stars}
          </span>
        )}
      </div>

      <h3 className="font-display text-lg font-semibold leading-tight">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech_stack.slice(0, 5).map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {project.language && <span>{project.language}</span>}
          {updated && (
            <span>
              {t.projects.updated} {updated}
            </span>
          )}
          {project.type === "github_private" && (
            <span className="inline-flex items-center gap-1">
              <Lock className="h-3 w-3" />
              {t.projects.private_note}
            </span>
          )}
        </div>

        {project.type === "github_open" && project.github_repo_url && (
          <a
            href={project.github_repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <GithubIcon className="h-3.5 w-3.5" />
            {t.projects.view_repo}
          </a>
        )}
        {project.type === "app_store" && project.app_store_url && (
          <a
            href={project.app_store_url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t.projects.view_app}
          </a>
        )}
      </div>
    </Card>
  );
}
