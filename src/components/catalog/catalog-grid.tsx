"use client";

import React from "react";
import { Search } from "lucide-react";
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
      <div className="py-20 text-center rounded-2xl border border-dashed border-border/80 bg-muted/10 max-w-md mx-auto p-8 space-y-4">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
          <Search className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-base">No items found</h3>
          <p className="text-xs text-muted-foreground">
            No components or hooks match &ldquo;{searchQuery}&rdquo;. Try adjusting your search query or filter.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onResetFilters}
          className="text-xs cursor-pointer"
        >
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {items.map((item) => (
        <CatalogCard key={item.id} item={item} />
      ))}
    </div>
  );
}
