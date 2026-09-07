import React from "react";
import { REGISTRY_NAME } from "@/lib/catalog";

export function CatalogFooter() {
  return (
    <footer className="border-t border-border/40 py-6 px-6 text-xs text-muted-foreground">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>{REGISTRY_NAME} — Personal UI registry</span>
        <span>Built with Next.js, Tailwind CSS & Radix UI</span>
      </div>
    </footer>
  );
}
