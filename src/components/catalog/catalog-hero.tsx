"use client";

import React from "react";
import { Sparkles, Terminal } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { REGISTRY_HOMEPAGE, REGISTRY_NAME } from "@/lib/catalog";

export function CatalogHero() {
  const setupSnippet = `"registries": {\n  "@${REGISTRY_NAME}": "${REGISTRY_HOMEPAGE}/r/{name}.json"\n}`;

  return (
    <section className="border-b border-border/40 py-14 px-6 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
          <Sparkles className="h-3.5 w-3.5" /> Personal Component Catalog
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Curated React Components & Hooks
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          A personal shadcn registry with motion-driven micro-interactions, clean hooks, and seamless multi-file CLI imports.
        </p>

        {/* Quick Setup Card */}
        <div className="mt-6 max-w-xl mx-auto text-left rounded-xl border border-border/60 bg-card p-4 shadow-sm text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-xs tracking-wider uppercase text-muted-foreground flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5" /> One-Time Setup in components.json
            </span>
            <CopyButton text={`{\n  ${setupSnippet}\n}`} />
          </div>
          <pre className="text-xs font-mono bg-muted/60 p-3 rounded-lg overflow-x-auto text-foreground/90">
{setupSnippet}
          </pre>
        </div>
      </div>
    </section>
  );
}
