"use client";

import React from "react";
import { Search } from "lucide-react";
import { CatalogItem } from "@/lib/catalog";
import { CatalogCard } from "@/components/catalog/catalog-card";
import { Button } from "@/components/ui/button";
import { StudioCanvas } from "@/components/catalog/studio-canvas";

interface CatalogGridProps {
  items: CatalogItem[];
  searchQuery: string;
  onResetFilters: () => void;
}

export function CatalogGrid({ items, searchQuery, onResetFilters }: CatalogGridProps) {
  if (items.length === 0) {
    return (
      <StudioCanvas
        showReset={false}
        minHeight="min-h-72"
        className="max-w-md mx-auto py-12 px-8"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-muted/80 border border-border/60 flex items-center justify-center text-muted-foreground shadow-xs">
            <Search className="h-6 w-6" />
          </div>
          <div className="space-y-1 text-center">
            <h3 className="font-semibold text-base tracking-tight">No items found</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
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
      </StudioCanvas>
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
