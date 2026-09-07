"use client";

import React from "react";
import { Search, X, Layers, Code2, ArrowUpDown } from "lucide-react";

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
  filteredCount,
  componentsCount,
  hooksCount,
}: CatalogToolbarProps) {
  return (
    <section className="border-b border-border/30 bg-muted/10 sticky top-16 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => onSelectCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/40"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            All Items
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === "all"
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {totalCount}
            </span>
          </button>

          <button
            onClick={() => onSelectCategory("components")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === "components"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/40"
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            Components
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === "components"
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {componentsCount}
            </span>
          </button>

          <button
            onClick={() => onSelectCategory("hooks")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === "hooks"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/40"
            }`}
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            Hooks
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === "hooks"
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {hooksCount}
            </span>
          </button>
        </div>

        {/* Search Input & Item Counter */}
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8.5 pr-8 py-1.5 rounded-lg text-xs bg-background border border-border/60 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                aria-label="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:inline-block">
            {filteredCount} of {totalCount} items
          </span>
        </div>
      </div>
    </section>
  );
}
