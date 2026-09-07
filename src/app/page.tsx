"use client";

import React, { useState } from "react";
import { ThemeToggle } from "@/components/ui/custom/theme-toggle";
import { CopyButton } from "@/components/copy-button";
import { Sparkles, Terminal, Layers, Code2, Eye, ExternalLink, CheckCircle2 } from "lucide-react";

const THEME_TOGGLE_CODE = `// src/components/ui/custom/theme-toggle.tsx
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useViewTransitionTheme } from '@/hooks/use-view-transition-theme';

const easeInArc = [0.34, 1.56, 0.64, 1] as const;
const easeOutArc = [0.36, 0, 0.66, -0.56] as const;

export function ThemeToggle() {
  const { isDark, toggleTheme } = useViewTransitionTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center border border-border/30">
        <div className="h-4 w-4 rounded-full bg-muted/60" />
      </div>
    );
  }

  const iconVariants: Variants = {
    initial: (darkState: boolean) => ({
      x: darkState ? 18 : -18,
      y: 18,
      rotate: darkState ? 90 : -90,
      opacity: 0,
      scale: 0.4,
    }),
    animate: {
      x: [null, -4, 0],
      y: [null, -6, 0],
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: easeInArc },
    },
    exit: (darkState: boolean) => ({
      x: [0, 4, darkState ? -18 : 18],
      y: [0, -6, 18],
      rotate: darkState ? -90 : 90,
      opacity: 0,
      scale: 0.4,
      transition: { duration: 0.35, ease: easeOutArc },
    }),
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="h-10 w-10 rounded-full hover:bg-secondary border border-border/30 shadow-md flex items-center justify-center active:scale-95 transition-all relative overflow-hidden"
    >
      <AnimatePresence mode="wait" custom={isDark}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          custom={isDark}
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-amber-500" />
          ) : (
            <Moon className="h-4 w-4 text-primary" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}`;

const HOOK_CODE = `// src/hooks/use-view-transition-theme.ts
import React from 'react';
import { useTheme } from 'next-themes';

export interface ViewTransitionThemeOptions {
  duration?: number;
  easing?: string;
}

export function useViewTransitionTheme(options: ViewTransitionThemeOptions = {}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { duration = 500, easing = 'cubic-bezier(0.4, 0, 0.2, 1)' } = options;

  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  const toggleTheme = (event?: React.MouseEvent<HTMLElement> | MouseEvent) => {
    const nextTheme = isDark ? 'light' : 'dark';

    let x = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    let y = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

    if (event?.currentTarget && 'getBoundingClientRect' in event.currentTarget) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    const endRadius =
      typeof window !== 'undefined'
        ? Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
        : 1000;

    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--x', \`\${x}px\`);
      document.documentElement.style.setProperty('--y', \`\${y}px\`);
      document.documentElement.style.setProperty('--r', \`\${endRadius}px\`);
    }

    const isReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (typeof document === 'undefined' || !document.startViewTransition || isReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        \`circle(0px at \${x}px \${y}px)\`,
        \`circle(\${endRadius}px at \${x}px \${y}px)\`,
      ];
      if (typeof document.documentElement.animate === 'function') {
        document.documentElement.animate(
          { clipPath },
          {
            duration,
            easing,
            pseudoElement: '::view-transition-new(root)',
          }
        );
      }
    });
  };

  return {
    theme,
    resolvedTheme,
    isDark,
    setTheme,
    toggleTheme,
  };
}`;

const CSS_CODE = `/* globals.css */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
  overflow: hidden;
  backface-visibility: hidden;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 9999;
  animation: reveal-circle 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes reveal-circle {
  from {
    clip-path: circle(0% at var(--x, 100%) var(--y, 0%));
  }
  to {
    clip-path: circle(var(--r, 150%) at var(--x, 100%) var(--y, 0%));
  }
}`;

export default function CatalogPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [activeCodeFile, setActiveCodeFile] = useState<"component" | "hook" | "css">("component");

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
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-base">joro-ui</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium border border-border/60">
                  shadcn registry
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs text-muted-foreground hidden sm:inline-block font-mono">
              catalog: joro-ui
            </div>
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
              <CopyButton text={`{\n  "registries": {\n    "@joro-ui": "https://<your-deployed-domain>/r"\n  }\n}`} />
            </div>
            <pre className="text-xs font-mono bg-muted/60 p-3 rounded-lg overflow-x-auto text-foreground/90">
{`"registries": {
  "@joro-ui": "https://<your-deployed-domain>/r"
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
            <CopyButton text={cliCommand} />
          </div>

          {/* Tab Controls */}
          <div className="px-6 pt-4 border-b border-border/40 flex items-center justify-between bg-card">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                  activeTab === "preview"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Eye className="h-3.5 w-3.5" /> Preview
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                  activeTab === "code"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" /> Code & Logic
              </button>
            </div>

            {activeTab === "code" && (
              <div className="flex items-center gap-1 pb-2">
                <button
                  onClick={() => setActiveCodeFile("component")}
                  className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                    activeCodeFile === "component"
                      ? "bg-secondary text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  theme-toggle.tsx
                </button>
                <button
                  onClick={() => setActiveCodeFile("hook")}
                  className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                    activeCodeFile === "hook"
                      ? "bg-secondary text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  use-view-transition-theme.ts
                </button>
                <button
                  onClick={() => setActiveCodeFile("css")}
                  className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                    activeCodeFile === "css"
                      ? "bg-secondary text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  view-transitions.css
                </button>
              </div>
            )}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "preview" ? (
              <div className="h-64 rounded-xl border border-dashed border-border/80 flex flex-col items-center justify-center gap-4 bg-muted/10 relative">
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium">Click to test the View Transition</p>
                  <p className="text-xs text-muted-foreground">Expands a circular clip-path reveal from the button</p>
                </div>
                <div className="p-4 rounded-2xl bg-card border border-border/40 shadow-sm">
                  <ThemeToggle />
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute right-3 top-3 z-10">
                  <CopyButton
                    text={
                      activeCodeFile === "component"
                        ? THEME_TOGGLE_CODE
                        : activeCodeFile === "hook"
                        ? HOOK_CODE
                        : CSS_CODE
                    }
                  />
                </div>
                <pre className="text-xs font-mono p-4 rounded-xl bg-muted/60 text-foreground overflow-x-auto max-h-96 leading-relaxed border border-border/40">
                  {activeCodeFile === "component" && THEME_TOGGLE_CODE}
                  {activeCodeFile === "hook" && HOOK_CODE}
                  {activeCodeFile === "css" && CSS_CODE}
                </pre>
              </div>
            )}
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
