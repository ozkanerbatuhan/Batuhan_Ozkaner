"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/icons";
import { useLanguage } from "@/lib/i18n/context";
import { PROFILE } from "@/lib/data/content";
import { Section, SectionHeading, Reveal } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";

export function Contact() {
  const { t } = useLanguage();

  const links = [
    {
      icon: Mail,
      label: t.contact.email,
      value: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
    },
    {
      icon: GithubIcon,
      label: t.contact.github,
      value: "@" + PROFILE.githubUser,
      href: PROFILE.github,
    },
    {
      icon: LinkedInIcon,
      label: t.contact.linkedin,
      value: PROFILE.name,
      href: PROFILE.linkedin,
    },
  ];

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {links.map((link, i) => {
          const Icon = link.icon;
          return (
            <Reveal key={link.label} delay={i * 0.05}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex h-full items-center gap-3 rounded-[var(--radius)] border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-muted"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius)] border border-border bg-muted/50 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {link.label}
                  </p>
                  <p className="truncate text-sm font-medium">{link.value}</p>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.15} className="mt-8 flex justify-center">
        <a
          href={`mailto:${PROFILE.email}`}
          className={buttonVariants({ size: "lg" })}
        >
          <Mail className="h-4 w-4" />
          {t.contact.cta}
        </a>
      </Reveal>
    </Section>
  );
}
