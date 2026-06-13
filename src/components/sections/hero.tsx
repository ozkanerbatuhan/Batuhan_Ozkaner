"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { APPS, PROFILE } from "@/lib/data/content";
import { GithubIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-36"
    >
      <div className="glow-hero pointer-events-none absolute inset-0 -z-10" />
      <div className="bg-dots pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: intro */}
        <div>
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
            className="mt-7 text-lg text-muted-foreground"
          >
            {t.hero.greeting}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="font-display mt-1 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl"
          >
            {PROFILE.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="font-display mt-6 max-w-xl text-2xl font-medium leading-snug tracking-tight text-foreground/90 sm:text-[1.7rem]"
          >
            {t.hero.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            {t.hero.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
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

        {/* Right: shipped apps (the signature — real App Store products) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="rounded-[1.4rem] border border-border bg-card/70 p-2 backdrop-blur"
        >
          <div className="flex items-center justify-between px-4 pt-3">
            <span className="eyebrow">{t.hero.apps_title}</span>
            <span className="text-xs text-muted-foreground">App Store</span>
          </div>
          <div className="mt-2 flex flex-col">
            {APPS.map((app) => (
              <a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-[1.1rem] p-3 transition-colors hover:bg-muted"
              >
                <Image
                  src={app.icon}
                  alt={app.name}
                  width={120}
                  height={120}
                  priority
                  className="h-14 w-14 rounded-[0.95rem] shadow-sm ring-1 ring-black/5"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium leading-tight">{app.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {app.tagline[lang]}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
