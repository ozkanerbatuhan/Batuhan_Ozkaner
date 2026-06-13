"use client";

import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { EDUCATION, pick } from "@/lib/data/content";
import { Section, SectionHeading, Reveal } from "@/components/section";
import { Card } from "@/components/ui/card";

export function Education() {
  const { t, lang } = useLanguage();

  return (
    <Section id="education">
      <SectionHeading
        index="04"
        title={t.education.title}
        subtitle={t.education.subtitle}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {EDUCATION.map((edu, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <Card className="flex h-full items-start gap-4 p-5 transition-colors hover:border-primary/30">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius)] border border-border bg-muted/50 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold leading-tight">
                  {pick(edu.degree, lang)}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {edu.school}
                </p>
                <div className="mt-2 flex items-center gap-3 font-mono text-xs text-muted-foreground">
                  <span>{edu.period}</span>
                  <span className="text-primary">
                    {t.education.gpa}: {edu.gpa}
                  </span>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
