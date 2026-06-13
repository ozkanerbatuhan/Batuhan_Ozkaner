"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Apple } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { useLanguage } from "@/lib/i18n/context";
import { APPS, PROFILE } from "@/lib/data/content";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative flex min-h-[92vh] items-center overflow-hidden px-4 pt-24 sm:px-6"
    >
      {/* Circuit-board grid background */}
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {t.hero.badge}
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            {PROFILE.name}
          </h1>
          <p className="mt-3 font-mono text-lg text-primary sm:text-2xl">
            {t.hero.title}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.hero.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className={buttonVariants({ size: "lg" })}>
              {t.hero.cta_projects}
              <ArrowRight className="h-4 w-4" />
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
          </div>

          {/* App Store apps */}
          <div className="mt-10">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {t.hero.apps_title}
            </p>
            <div className="flex flex-wrap gap-2">
              {APPS.map((app) => (
                <a
                  key={app.name}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-[var(--radius)] border border-border bg-card px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-muted"
                >
                  <Apple className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                  {app.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
