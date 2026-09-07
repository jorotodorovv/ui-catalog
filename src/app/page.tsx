"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/registry/theme-toggle";
import { MultiFilterDropdown, MultiFilterOption } from "@/registry/multi-filter-dropdown";
import { FilterDropdown, FilterOption } from "@/registry/filter-dropdown";
import { useScrollDirection } from "@/registry/use-scroll-direction/use-scroll-direction";
import { InteractiveImageDemo } from "@/components/demos/interactive-image-demo";
import { ScrollDirectionDemo } from "@/components/demos/scroll-direction-demo";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Terminal,
  ExternalLink,
  Tag,
  Globe,
  SunMoon,
  ListFilter,
  SlidersHorizontal,
  ImageIcon,
  ArrowUpDown,
  Search,
  X,
  Code2,
  Layers,
  CheckCircle2,
} from "lucide-react";

const SAMPLE_INGREDIENT_OPTIONS: MultiFilterOption[] = [
  { value: "Carrot", label: "Carrot", emoji: "🥕" },
  { value: "Tomato", label: "Tomato", emoji: "🍅" },
  { value: "Cheese", label: "Cheese", emoji: "🧀" },
  { value: "Garlic", label: "Garlic", emoji: "🧄" },
  { value: "Onion", label: "Onion", emoji: "🧅" },
  { value: "Basil", label: "Basil", emoji: "🌿" },
  { value: "Pepper", label: "Bell Pepper", emoji: "🫑" },
];

const SAMPLE_PLATFORM_OPTIONS: FilterOption[] = [
  { value: "youtube", label: "YouTube", emoji: "▶️" },
  { value: "instagram", label: "Instagram", emoji: "📸" },
  { value: "tiktok", label: "TikTok", emoji: "🎵" },
  { value: "web", label: "Website", emoji: "🌐" },
];

interface CatalogItem {
  id: string;
  name: string;
  type: "registry:component" | "registry:hook";
  category: "components" | "hooks";
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  cli: string;
  json: string;
  dependencies: string[];
  fullWidth?: boolean;
}

const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "theme-toggle",
    name: "Theme Toggle",
    type: "registry:component",
    category: "components",
    icon: SunMoon,
    description: "Circular View Transitions API reveal animation with smooth icon arc trajectory and companion hook.",
    cli: "npx shadcn add @joro-ui/theme-toggle",
    json: "/r/theme-toggle.json",
    dependencies: ["framer-motion", "next-themes", "lucide-react"],
  },
  {
    id: "multi-filter-dropdown",
    name: "Multi-Filter Dropdown",
    type: "registry:component",
    category: "components",
    icon: SlidersHorizontal,
    description: "Grid-friendly square card multi-select popover with stacked badge preview, emojis, search, and clear trigger.",
    cli: "npx shadcn add @joro-ui/multi-filter-dropdown",
    json: "/r/multi-filter-dropdown.json",
    dependencies: ["button", "popover", "command", "lucide-react"],
  },
  {
    id: "filter-dropdown",
    name: "Filter Dropdown",
    type: "registry:component",
    category: "components",
    icon: ListFilter,
    description: "Grid-friendly square card single-select popover with active state badge, clear trigger, emojis, and search.",
    cli: "npx shadcn add @joro-ui/filter-dropdown",
    json: "/r/filter-dropdown.json",
    dependencies: ["button", "popover", "command", "lucide-react"],
  },
  {
    id: "interactive-image",
    name: "Interactive Image",
    type: "registry:component",
    category: "components",
    icon: ImageIcon,
    description: "Progressive Next.js image loader with skeleton shimmer, smooth fade-in, fallback placeholder, and AI generating state.",
    cli: "npx shadcn add @joro-ui/interactive-image",
    json: "/r/interactive-image.json",
    dependencies: ["skeleton", "next/image", "lucide-react"],
    fullWidth: true,
  },
  {
    id: "use-scroll-direction",
    name: "useScrollDirection",
    type: "registry:hook",
    category: "hooks",
    icon: ArrowUpDown,
    description: "Smart vertical scroll direction hook with thresholding, bounce protection, and optional container ref for auto-hiding headers and bottom docks.",
    cli: "npx shadcn add @joro-ui/use-scroll-direction",
    json: "/r/use-scroll-direction.json",
    dependencies: ["react"],
    fullWidth: true,
  },
];

export default function CatalogPage() {
  const isHeaderVisible = useScrollDirection();
  const [platform, setPlatform] = useState("youtube");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "components" | "hooks">("all");

  const filteredItems = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const matchesName = item.name.toLowerCase().includes(query);
      const matchesDesc = item.description.toLowerCase().includes(query);
      const matchesId = item.id.toLowerCase().includes(query);
      const matchesDeps = item.dependencies.some((dep) =>
        dep.toLowerCase().includes(query)
      );

      return matchesName || matchesDesc || matchesId || matchesDeps;
    });
  }, [searchQuery, selectedCategory]);

  const componentsCount = CATALOG_ITEMS.filter((i) => i.category === "components").length;
  const hooksCount = CATALOG_ITEMS.filter((i) => i.category === "hooks").length;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      {/* Dynamic Navigation Bar tracking useScrollDirection */}
      <header
        className={`sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-transform duration-300 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
              JU
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-base">joro-ui</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium border border-border/60">
                shadcn registry
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/r/index.json"
              target="_blank"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-mono"
            >
              registry.json <ExternalLink className="h-3 w-3" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border/40 py-14 px-6 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
            <Sparkles className="h-3.5 w-3.5" /> Personal Component Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Curated React Components & Hooks
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            A personal shadcn registry with motion-driven micro-interactions, clean hooks, and seamless multi-file CLI imports.
          </p>

          {/* Quick Setup Card */}
          <div className="mt-6 max-w-xl mx-auto text-left rounded-xl border border-border/60 bg-card p-4 shadow-sm text-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-xs tracking-wider uppercase text-muted-foreground flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5" /> One-Time Setup in components.json
              </span>
              <CopyButton
                text={`{\n  "registries": {\n    "@joro-ui": "https://joro-ui.vercel.app/r/{name}.json"\n  }\n}`}
              />
            </div>
            <pre className="text-xs font-mono bg-muted/60 p-3 rounded-lg overflow-x-auto text-foreground/90">
{`"registries": {
  "@joro-ui": "https://joro-ui.vercel.app/r/{name}.json"
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Catalog Controls & Filter Bar */}
      <section className="border-b border-border/30 bg-muted/10 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/40"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              All Items
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === "all" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {CATALOG_ITEMS.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory("components")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                selectedCategory === "components"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/40"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              Components
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === "components" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {componentsCount}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory("hooks")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                selectedCategory === "hooks"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/40"
              }`}
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              Hooks
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === "hooks" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8.5 pr-8 py-1.5 rounded-lg text-xs bg-background border border-border/60 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:inline-block">
              {filteredItems.length} of {CATALOG_ITEMS.length} items
            </span>
          </div>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full space-y-10">
        {filteredItems.length === 0 ? (
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
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-xs"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isFull = item.fullWidth;

              return (
                <article
                  key={item.id}
                  className={`rounded-2xl border border-border/70 bg-card shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden ${
                    isFull ? "lg:col-span-2" : ""
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

                  {/* Interactive Demo Area */}
                  <div className="p-6 flex-1 flex flex-col justify-center bg-muted/5 relative">
                    {item.id === "theme-toggle" && (
                      <div className="h-64 rounded-xl border border-dashed border-border/80 flex flex-col items-center justify-center gap-4 bg-muted/10 p-6 text-center relative overflow-hidden">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Click to test View Transition</p>
                          <p className="text-xs text-muted-foreground max-w-xs">
                            Expands a circular clip-path reveal originating from the click origin with arc trajectory.
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-sm">
                          <ThemeToggle />
                        </div>
                      </div>
                    )}

                    {item.id === "multi-filter-dropdown" && (
                      <div className="h-64 rounded-xl border border-dashed border-border/80 flex flex-col items-center justify-center gap-4 bg-muted/10 p-6 text-center relative">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Interactive Multi-Select Card</p>
                          <p className="text-xs text-muted-foreground max-w-xs">
                            Select ingredients, observe stacked emoji preview badges, or click clear.
                          </p>
                        </div>
                        <div className="w-36">
                          <MultiFilterDropdown
                            title="Ingredients"
                            options={SAMPLE_INGREDIENT_OPTIONS}
                            defaultValues={["Carrot", "Tomato"]}
                            icon={Tag}
                            showSearch={true}
                            placeholder="Search ingredient..."
                          />
                        </div>
                      </div>
                    )}

                    {item.id === "filter-dropdown" && (
                      <div className="h-64 rounded-xl border border-dashed border-border/80 flex flex-col items-center justify-center gap-4 bg-muted/10 p-6 text-center relative">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Single-Select Filter Card</p>
                          <p className="text-xs text-muted-foreground max-w-xs">
                            Select a platform, observe the active highlight and quick clear trigger.
                          </p>
                        </div>
                        <div className="w-36">
                          <FilterDropdown
                            title="Platform"
                            options={SAMPLE_PLATFORM_OPTIONS}
                            selectedValue={platform}
                            onValueChange={setPlatform}
                            icon={Globe}
                            showSearch={true}
                          />
                        </div>
                      </div>
                    )}

                    {item.id === "interactive-image" && (
                      <InteractiveImageDemo />
                    )}

                    {item.id === "use-scroll-direction" && (
                      <ScrollDirectionDemo />
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6 text-center text-xs text-muted-foreground bg-muted/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">joro-ui</span>
            <span>•</span>
            <span>Personal React Component Catalog & Custom Registry</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground/80">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span>Ready for shadcn CLI & modern web apps</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
