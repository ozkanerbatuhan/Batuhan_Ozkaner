"use client";

import { useLanguage } from "@/lib/i18n/context";
import { EXPERIENCE, pick } from "@/lib/data/content";
import { Section, SectionHeading, Reveal } from "@/components/section";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  const { t, lang } = useLanguage();

  return (
    <Section id="experience">
      <SectionHeading
        index="02"
        title={t.experience.title}
        subtitle={t.experience.subtitle}
      />

      <div className="relative">
        {/* Vertical timeline rail */}
        <div className="absolute left-2 top-2 bottom-2 w-px bg-border sm:left-2.5" />

        <div className="space-y-8">
          {EXPERIENCE.map((entry, i) => (
            <Reveal key={`${entry.company}-${i}`} delay={i * 0.04}>
              <div className="relative pl-10 sm:pl-12">
                {/* Node */}
                <span className="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-primary/40 bg-background sm:left-0.5">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>

                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-semibold">{pick(entry.role, lang)}</h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {pick(entry.period, lang)}
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-primary">
                  {entry.company}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pick(entry.description, lang)}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="mono">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
