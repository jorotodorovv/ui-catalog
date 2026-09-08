import React from "react";
import Link from "next/link";
import { REGISTRY_NAME, GITHUB_REPO_URL } from "@/lib/catalog";

export function CatalogFooter() {
  return (
    <footer className="border-t border-border/40 py-6 px-6 text-xs text-muted-foreground">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>{REGISTRY_NAME} — Personal UI registry</span>
        <div className="flex items-center gap-4">
          <Link
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          <span className="text-border">•</span>
          <span>Built with Next.js, Tailwind CSS & Radix UI</span>
        </div>
      </div>
    </footer>
  );
}
