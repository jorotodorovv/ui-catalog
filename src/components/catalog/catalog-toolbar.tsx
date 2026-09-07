"use client";

import React from "react";
import { Search, X } from "lucide-react";

export type CategoryFilter = "all" | "components" | "hooks";

interface CatalogToolbarProps {
  selectedCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  filteredCount: number;
  componentsCount: number;
  hooksCount: number;
}

export function CatalogToolbar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
  componentsCount,
  hooksCount,
}: CatalogToolbarProps) {
  const tabs = [
    { id: "all" as const, label: "All", count: totalCount },
    { id: "components" as const, label: "Components", count: componentsCount },
    { id: "hooks" as const, label: "Hooks", count: hooksCount },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-6 pb-2 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Category Tabs */}
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectCategory(tab.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === tab.id
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-[10px] text-muted-foreground font-mono">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search components..."
          className="w-full pl-8 pr-8 py-1.5 text-xs rounded-md border border-border/60 bg-background text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-foreground/40 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}
