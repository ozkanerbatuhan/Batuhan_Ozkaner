"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { cn } from "@/lib/utils";

const SECTIONS = [
  "about",
  "skills",
  "experience",
  "projects",
  "education",
  "contact",
] as const;

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="#top" className="group flex items-center gap-2.5">
          <span className="font-display flex h-9 w-9 items-center justify-center rounded-[0.7rem] bg-primary text-sm font-semibold text-primary-foreground">
            BÖ
          </span>
          <span className="font-display hidden text-[0.95rem] font-semibold tracking-tight sm:inline">
            Batuhan Özkaner
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.nav[s]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-border text-muted-foreground md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {SECTIONS.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {t.nav[s]}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
