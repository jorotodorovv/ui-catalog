"use client";

import React, { useState, useMemo } from "react";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { CatalogHeader } from "@/components/catalog/catalog-header";
import { CatalogHero } from "@/components/catalog/catalog-hero";
import { CatalogToolbar, CategoryFilter } from "@/components/catalog/catalog-toolbar";
import { CatalogGrid } from "@/components/catalog/catalog-grid";
import { CatalogFooter } from "@/components/catalog/catalog-footer";

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");

  const filteredItems = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.dependencies.some((dep) => dep.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, selectedCategory]);

  const componentsCount = CATALOG_ITEMS.filter((i) => i.category === "components").length;
  const hooksCount = CATALOG_ITEMS.filter((i) => i.category === "hooks").length;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <CatalogHeader />
      <CatalogHero />
      <CatalogToolbar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={CATALOG_ITEMS.length}
        filteredCount={filteredItems.length}
        componentsCount={componentsCount}
        hooksCount={hooksCount}
      />
      <main className="max-w-7xl mx-auto px-6 py-6 pb-16 flex-1 w-full">
        <CatalogGrid
          items={filteredItems}
          searchQuery={searchQuery}
          onResetFilters={() => {
            setSearchQuery("");
            setSelectedCategory("all");
          }}
        />
      </main>
      <CatalogFooter />
    </div>
  );
}
