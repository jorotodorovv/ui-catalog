"use client";

import React from "react";
import Link from "next/link";
import { CatalogItem } from "@/lib/catalog";
import { CopyButton } from "@/components/copy-button";
import { CatalogItemDemo } from "@/components/catalog/catalog-item-demo";

interface CatalogCardProps {
  item: CatalogItem;
}

export function CatalogCard({ item }: CatalogCardProps) {
  const Icon = item.icon;

  return (
    <article
      className={`rounded-2xl border border-border/70 bg-card shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden ${
        item.fullWidth ? "lg:col-span-2" : ""
      }`}
    >
      {/* Card Header */}
      <div className="p-5 sm:p-6 border-b border-border/40 bg-muted/10 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-xs">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold tracking-tight">{item.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-mono font-medium border border-border/50">
                  {item.type}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                {item.description}
              </p>
            </div>
          </div>

          {/* Dependencies Badges */}
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            {item.dependencies.map((dep) => (
              <span
                key={dep}
                className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/80 border border-border/40 text-muted-foreground font-mono"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CLI Command Strip */}
      <div className="px-5 py-2.5 bg-muted/30 border-b border-border/40 flex items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 overflow-x-auto text-muted-foreground">
          <span className="text-primary font-bold select-none">$</span>
          <span className="text-foreground font-medium whitespace-nowrap">{item.cli}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={item.json}
            target="_blank"
            className="text-muted-foreground hover:text-foreground text-[11px] underline underline-offset-2 flex items-center gap-1"
            title="View raw registry JSON schema"
          >
            json
          </Link>
          <CopyButton text={item.cli} />
        </div>
      </div>

      {/* Interactive Demo Playground Canvas */}
      <div className="p-6 flex-1 flex flex-col justify-center bg-muted/5 relative">
        <CatalogItemDemo id={item.id} />
      </div>
    </article>
  );
}
