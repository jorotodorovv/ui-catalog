"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Code2 } from "lucide-react";
import { ThemeToggle } from "@/registry/theme-toggle";
import { useScrollDirection } from "@/registry/use-scroll-direction/use-scroll-direction";
import { REGISTRY_NAME, GITHUB_REPO_URL } from "@/lib/catalog";
import { BrandLogo } from "./brand-logo";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function CatalogHeader() {
  const isHeaderVisible = useScrollDirection();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] supports-[backdrop-filter]:bg-background/70"
          : "border-b border-border/20 bg-background/50 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-lg py-1 px-1 -ml-1 transition-transform"
          aria-label={`${REGISTRY_NAME} home`}
        >
          <BrandLogo size={34} />
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-tight text-sm text-foreground group-hover:text-primary transition-colors">
              {REGISTRY_NAME}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border border-border/60 bg-muted/60 text-muted-foreground shadow-2xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 dark:bg-emerald-400" />
              </span>
              registry
            </span>
          </div>
        </Link>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/r/index.json"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-all font-mono px-2.5 py-1.5 rounded-lg border border-border/40 hover:border-border/80 bg-muted/30 hover:bg-muted/70 shadow-2xs group"
            title="View registry schema JSON"
          >
            <Code2 className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span>registry.json</span>
          </Link>

          <Link
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            title="View on GitHub"
            className="h-10 w-10 rounded-full hover:bg-secondary border border-border/30 shadow-md flex items-center justify-center active:scale-95 transition-all text-muted-foreground hover:text-foreground relative group"
          >
            <GithubIcon className="size-4.5 transition-transform group-hover:scale-110" />
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
