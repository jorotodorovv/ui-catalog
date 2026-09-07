"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/registry/theme-toggle";
import { useScrollDirection } from "@/registry/use-scroll-direction/use-scroll-direction";
import { REGISTRY_NAME } from "@/lib/catalog";

export function CatalogHeader() {
  const isHeaderVisible = useScrollDirection();

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-transform duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-tight text-sm text-foreground">
            {REGISTRY_NAME}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
            registry
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/r/index.json"
            target="_blank"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
          >
            registry.json
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
