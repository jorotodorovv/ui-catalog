"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/registry/theme-toggle";
import { useScrollDirection } from "@/registry/use-scroll-direction/use-scroll-direction";
import { ExternalLink } from "lucide-react";
import { REGISTRY_NAME } from "@/lib/catalog";

export function CatalogHeader() {
  const isHeaderVisible = useScrollDirection();

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-transform duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
            JU
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-base">{REGISTRY_NAME}</span>
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
  );
}
