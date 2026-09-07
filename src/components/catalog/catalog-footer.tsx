import React from "react";
import { CheckCircle2 } from "lucide-react";
import { REGISTRY_NAME } from "@/lib/catalog";

export function CatalogFooter() {
  return (
    <footer className="border-t border-border/40 py-8 px-6 text-center text-xs text-muted-foreground bg-muted/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{REGISTRY_NAME}</span>
          <span>•</span>
          <span>Personal React Component Catalog & Custom Registry</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground/80">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          <span>Ready for shadcn CLI & modern web apps</span>
        </div>
      </div>
    </footer>
  );
}
