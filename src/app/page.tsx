"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/custom/theme-toggle";
import { CopyButton } from "@/components/copy-button";
import { Sparkles, Terminal, ExternalLink } from "lucide-react";

export default function CatalogPage() {
  const cliCommand = "npx shadcn add @joro-ui/theme-toggle";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
              JU
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-base">joro-ui</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium border border-border/60">
                shadcn registry
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/r/index.json"
              target="_blank"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-mono"
            >
              registry.json <ExternalLink className="h-3 w-3" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border/40 py-16 px-6 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
            <Sparkles className="h-3.5 w-3.5" /> Personal Component Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Curated React Components & Hooks
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A personal shadcn registry with motion-driven micro-interactions, clean hooks, and seamless multi-file CLI imports.
          </p>

          {/* Quick Setup Card */}
          <div className="mt-8 max-w-xl mx-auto text-left rounded-xl border border-border/60 bg-card p-4 shadow-sm text-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-xs tracking-wider uppercase text-muted-foreground flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5" /> One-Time Setup in components.json
              </span>
              <CopyButton text={`{\n  "registries": {\n    "@joro-ui": "https://joro-ui.vercel.app/r"\n  }\n}`} />
            </div>
            <pre className="text-xs font-mono bg-muted/60 p-3 rounded-lg overflow-x-auto text-foreground/90">
{`"registries": {
  "@joro-ui": "https://joro-ui.vercel.app/r"
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <main className="max-w-5xl mx-auto px-6 py-12 flex-1 w-full space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Components</h2>
            <p className="text-sm text-muted-foreground">Ready-to-use registry items</p>
          </div>
          <span className="text-xs text-muted-foreground">1 component available</span>
        </div>

        {/* Theme Toggle Component Card */}
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="p-6 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-semibold tracking-tight">Theme Toggle</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-mono">
                  registry:component
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Circular View Transitions API reveal animation with smooth icon arc trajectory and companion hook.
              </p>
            </div>

            {/* Dependency Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">
                framer-motion
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">
                next-themes
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">
                lucide-react
              </span>
            </div>
          </div>

          {/* Quick CLI Command Bar */}
          <div className="px-6 py-3 bg-muted/40 border-b border-border/40 flex items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-muted-foreground select-none">$</span>
              <span className="text-foreground font-medium">{cliCommand}</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/r/theme-toggle.json"
                target="_blank"
                className="text-muted-foreground hover:text-foreground text-[11px] flex items-center gap-1 underline underline-offset-2"
              >
                json <ExternalLink className="h-3 w-3" />
              </Link>
              <CopyButton text={cliCommand} />
            </div>
          </div>

          {/* Interactive Live Playground */}
          <div className="p-8">
            <div className="h-64 rounded-xl border border-dashed border-border/80 flex flex-col items-center justify-center gap-4 bg-muted/10 relative">
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">Click to test the View Transition</p>
                <p className="text-xs text-muted-foreground">Expands a circular clip-path reveal originating from the click</p>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border/40 shadow-sm">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6 text-center text-xs text-muted-foreground">
        <p>joro-ui • Personal React Component Catalog & Custom Registry • Powered by Bun & Next.js</p>
      </footer>
    </div>
  );
}
