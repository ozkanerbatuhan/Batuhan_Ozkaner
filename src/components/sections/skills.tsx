"use client";

import { useLanguage } from "@/lib/i18n/context";
import { SKILL_GROUPS } from "@/lib/data/content";
import { Section, SectionHeading, Reveal } from "@/components/section";
import { Card } from "@/components/ui/card";

export function Skills() {
  const { t } = useLanguage();

  return (
    <Section id="skills">
      <SectionHeading
        eyebrow={t.skills.eyebrow}
        title={t.skills.title}
        subtitle={t.skills.subtitle}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.05}>
            <Card className="h-full p-5 transition-colors hover:border-primary/40">
              <h3 className="font-display mb-4 text-base font-semibold text-foreground">
                {t.skills.groups[group.group]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-sm text-foreground/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
