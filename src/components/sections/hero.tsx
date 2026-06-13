"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { PROFILE } from "@/lib/data/content";
import { GithubIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative flex min-h-[88vh] items-center overflow-hidden px-4 pb-16 pt-32 sm:px-6"
    >
      <div className="glow-hero pointer-events-none absolute inset-0 -z-10" />
      <div className="bg-dots pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-amber" />
            {t.hero.location}
          </span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {t.hero.status}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease }}
          className="mt-8 text-lg text-muted-foreground"
        >
          {t.hero.greeting}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="font-display mt-1 text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl"
        >
          {PROFILE.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease }}
          className="font-display mt-7 max-w-2xl text-2xl font-medium leading-snug tracking-tight text-foreground/90 sm:text-[2rem]"
        >
          {t.hero.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {t.hero.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a href="#projects" className={buttonVariants({ size: "lg" })}>
            {t.hero.cta_projects}
            <ArrowDownRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            {t.hero.cta_contact}
          </a>
          <div className="flex items-center gap-1">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius)] border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email"
              className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius)] border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
