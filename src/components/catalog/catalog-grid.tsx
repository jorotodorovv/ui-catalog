"use client";

import React from "react";
import { CatalogItem } from "@/lib/catalog";
import { CatalogCard } from "@/components/catalog/catalog-card";
import { Button } from "@/components/ui/button";

interface CatalogGridProps {
  items: CatalogItem[];
  searchQuery: string;
  onResetFilters: () => void;
}

export function CatalogGrid({ items, searchQuery, onResetFilters }: CatalogGridProps) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center border border-border/50 rounded-xl bg-card/50 p-8 max-w-sm mx-auto space-y-3">
        <p className="text-sm font-medium text-foreground">No components found</p>
        <p className="text-xs text-muted-foreground">
          No matches for &ldquo;{searchQuery}&rdquo;.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={onResetFilters}
          className="text-xs h-7 cursor-pointer"
        >
          Clear filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {items.map((item) => (
        <CatalogCard key={item.id} item={item} />
      ))}
    </div>
  );
}
