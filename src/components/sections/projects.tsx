"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Project, ProjectFilter } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/context";
import { matchesFilter } from "@/lib/categorize";
import { Section, SectionHeading } from "@/components/section";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";

const FILTERS: ProjectFilter[] = [
  "all",
  "mobile",
  "hardware",
  "ai_ml",
  "web",
  "open_source",
];

export function Projects({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();
  const [active, setActive] = useState<ProjectFilter>("all");

  const filtered = useMemo(
    () => projects.filter((p) => matchesFilter(p, active)),
    [projects, active],
  );

  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        title={t.projects.title}
        subtitle={t.projects.subtitle}
      />

      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === f
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {t.projects.filters[f]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          {t.projects.empty}
        </p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </Section>
  );
}
