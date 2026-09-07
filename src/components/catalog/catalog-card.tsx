"use client";

import React from "react";
import Link from "next/link";
import { CatalogItem } from "@/lib/catalog";
import { CopyButton } from "@/components/copy-button";
import { CatalogItemDemo } from "@/components/catalog/catalog-item-demo";
import { cn } from "@/lib/utils";

interface CatalogCardProps {
  item: CatalogItem;
}

export function CatalogCard({ item }: CatalogCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden transition-colors hover:border-border",
        item.fullWidth && "lg:col-span-2"
      )}
    >
      {/* Live Component Preview */}
      <div className="relative flex-1 min-h-[220px] flex items-center justify-center p-6 bg-muted/15 border-b border-border/40">
        <CatalogItemDemo id={item.id} />
      </div>

      {/* Component Details */}
      <div className="p-5 flex flex-col justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium text-base text-foreground tracking-tight">
              {item.name}
            </h3>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
              {item.type.replace("registry:", "")}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Minimal CLI Command Strip */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/30">
          <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground min-w-0 overflow-hidden">
            <span className="text-muted-foreground/50 select-none">$</span>
            <span className="truncate select-all text-foreground/80">{item.cli}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {item.json && (
              <Link
                href={item.json}
                target="_blank"
                className="text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
                title="View registry JSON schema"
              >
                json
              </Link>
            )}
            <CopyButton text={item.cli} className="h-7 w-7 text-muted-foreground hover:text-foreground" />
          </div>
        </div>
      </div>
    </article>
  );
}
