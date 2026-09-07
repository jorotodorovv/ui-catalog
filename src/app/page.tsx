"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/registry/theme-toggle";
import { MultiFilterDropdown, MultiFilterOption } from "@/registry/multi-filter-dropdown";
import { FilterDropdown, FilterOption } from "@/registry/filter-dropdown";
import { InteractiveImage } from "@/registry/interactive-image";
import { useScrollDirection } from "@/registry/use-scroll-direction/use-scroll-direction";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Terminal,
  ExternalLink,
  Tag,
  Globe,
  ImageIcon,
  ArrowUpDown,
  RefreshCw,
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

export default function CatalogPage() {
  const isHeaderVisible = useScrollDirection();
  const [isGenerating, setIsGenerating] = useState(false);
  const [platform, setPlatform] = useState("youtube");

  const components = [
    {
      id: "theme-toggle",
      name: "Theme Toggle",
      type: "registry:component",
      description: "Circular View Transitions API reveal animation with smooth icon arc trajectory and companion hook.",
      cli: "npx shadcn add @joro-ui/theme-toggle",
      json: "/r/theme-toggle.json",
      dependencies: ["framer-motion", "next-themes", "lucide-react"],
    },
    {
      id: "multi-filter-dropdown",
      name: "Multi-Filter Dropdown",
      type: "registry:component",
      description: "Grid-friendly square card multi-select popover with stacked badge preview, emojis, search, and clear trigger.",
      cli: "npx shadcn add @joro-ui/multi-filter-dropdown",
      json: "/r/multi-filter-dropdown.json",
      dependencies: ["button", "popover", "command", "lucide-react"],
    },
    {
      id: "filter-dropdown",
      name: "Filter Dropdown",
      type: "registry:component",
      description: "Grid-friendly square card single-select popover with active state badge, clear trigger, emojis, and search.",
      cli: "npx shadcn add @joro-ui/filter-dropdown",
      json: "/r/filter-dropdown.json",
      dependencies: ["button", "popover", "command", "lucide-react"],
    },
    {
      id: "interactive-image",
      name: "Interactive Image",
      type: "registry:component",
      description: "Progressive Next.js image loader with skeleton shimmer, smooth fade-in, fallback placeholder, and AI generating state.",
      cli: "npx shadcn add @joro-ui/interactive-image",
      json: "/r/interactive-image.json",
      dependencies: ["skeleton", "lucide-react"],
    },
    {
      id: "use-scroll-direction",
      name: "useScrollDirection",
      type: "registry:hook",
      description: "Smart vertical scroll direction hook with thresholding and bounce protection for auto-hiding navigation bars.",
      cli: "npx shadcn add @joro-ui/use-scroll-direction",
      json: "/r/use-scroll-direction.json",
      dependencies: ["react"],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      {/* Dynamic Navigation Bar tracking useScrollDirection */}
      <header
        className={`sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-transform duration-300 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
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
      <section className="border-b border-border/40 py-16 px-6 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
            <Sparkles className="h-3.5 w-3.5" /> Personal Component Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Curated React Components & Hooks
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A personal shadcn registry with motion-driven micro-interactions, clean hooks, and seamless multi-file CLI imports.
          </p>

          {/* Quick Setup Card */}
          <div className="mt-8 max-w-xl mx-auto text-left rounded-xl border border-border/60 bg-card p-4 shadow-sm text-sm">
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

      {/* Main Catalog Grid */}
      <main className="max-w-5xl mx-auto px-6 py-12 flex-1 w-full space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Catalog Items</h2>
            <p className="text-sm text-muted-foreground">Ready-to-use registry components & hooks</p>
          </div>
          <span className="text-xs text-muted-foreground">{components.length} items available</span>
        </div>

        {/* 1. Theme Toggle */}
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-semibold tracking-tight">Theme Toggle</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-mono">
                  registry:component
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Circular View Transitions API reveal animation with smooth icon arc trajectory and companion hook.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">framer-motion</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">next-themes</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">lucide-react</span>
            </div>
          </div>
          <div className="px-6 py-3 bg-muted/40 border-b border-border/40 flex items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-muted-foreground select-none">$</span>
              <span className="text-foreground font-medium">npx shadcn add @joro-ui/theme-toggle</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/r/theme-toggle.json" target="_blank" className="text-muted-foreground hover:text-foreground text-[11px] underline underline-offset-2">json</Link>
              <CopyButton text="npx shadcn add @joro-ui/theme-toggle" />
            </div>
          </div>
          <div className="p-8">
            <div className="h-56 rounded-xl border border-dashed border-border/80 flex flex-col items-center justify-center gap-4 bg-muted/10 relative">
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">Click to test the View Transition</p>
                <p className="text-xs text-muted-foreground">Expands a circular clip-path reveal originating from the click</p>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border/40 shadow-sm">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Multi-Filter Dropdown */}
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-semibold tracking-tight">Multi-Filter Dropdown</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-mono">
                  registry:component
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Grid-friendly square card multi-select popover with stacked badge preview, emojis, search, and clear trigger.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">button</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">popover</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">command</span>
            </div>
          </div>
          <div className="px-6 py-3 bg-muted/40 border-b border-border/40 flex items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-muted-foreground select-none">$</span>
              <span className="text-foreground font-medium">npx shadcn add @joro-ui/multi-filter-dropdown</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/r/multi-filter-dropdown.json" target="_blank" className="text-muted-foreground hover:text-foreground text-[11px] underline underline-offset-2">json</Link>
              <CopyButton text="npx shadcn add @joro-ui/multi-filter-dropdown" />
            </div>
          </div>
          <div className="p-8">
            <div className="h-56 rounded-xl border border-dashed border-border/80 flex flex-col items-center justify-center gap-4 bg-muted/10 relative">
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">Interactive Multi-Select Card</p>
                <p className="text-xs text-muted-foreground">Select multiple ingredients, view stacked emojis, or use the clear button</p>
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
          </div>
        </div>

        {/* 3. Filter Dropdown (Single-Select) */}
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-semibold tracking-tight">Filter Dropdown</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-mono">
                  registry:component
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Grid-friendly square card single-select popover with active state badge, clear trigger, emojis, and search.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">button</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">popover</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">command</span>
            </div>
          </div>
          <div className="px-6 py-3 bg-muted/40 border-b border-border/40 flex items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-muted-foreground select-none">$</span>
              <span className="text-foreground font-medium">npx shadcn add @joro-ui/filter-dropdown</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/r/filter-dropdown.json" target="_blank" className="text-muted-foreground hover:text-foreground text-[11px] underline underline-offset-2">json</Link>
              <CopyButton text="npx shadcn add @joro-ui/filter-dropdown" />
            </div>
          </div>
          <div className="p-8">
            <div className="h-56 rounded-xl border border-dashed border-border/80 flex flex-col items-center justify-center gap-4 bg-muted/10 relative">
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">Single-Select Card Filter</p>
                <p className="text-xs text-muted-foreground">Select a platform, observe the active highlight and quick clear trigger</p>
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
          </div>
        </div>

        {/* 4. Interactive Image */}
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-semibold tracking-tight">Interactive Image</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-mono">
                  registry:component
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Progressive Next.js image loader with skeleton shimmer, smooth fade-in, fallback placeholder, and AI generating overlay state.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">skeleton</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">next/image</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">lucide-react</span>
            </div>
          </div>
          <div className="px-6 py-3 bg-muted/40 border-b border-border/40 flex items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-muted-foreground select-none">$</span>
              <span className="text-foreground font-medium">npx shadcn add @joro-ui/interactive-image</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/r/interactive-image.json" target="_blank" className="text-muted-foreground hover:text-foreground text-[11px] underline underline-offset-2">json</Link>
              <CopyButton text="npx shadcn add @joro-ui/interactive-image" />
            </div>
          </div>
          <div className="p-8">
            <div className="min-h-56 rounded-xl border border-dashed border-border/80 flex flex-col items-center justify-center gap-4 bg-muted/10 p-6 relative">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsGenerating((prev) => !prev)}
                  className="text-xs"
                >
                  <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${isGenerating ? "animate-spin" : ""}`} />
                  Toggle AI Generating Overlay
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
                <div className="space-y-1 text-center">
                  <span className="text-xs text-muted-foreground">Active Image / Generating</span>
                  <div className="h-40 w-full rounded-xl overflow-hidden border border-border/50">
                    <InteractiveImage
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"
                      alt="Sample Dish"
                      isGenerating={isGenerating}
                    />
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <span className="text-xs text-muted-foreground">Fallback Placeholder</span>
                  <div className="h-40 w-full rounded-xl overflow-hidden border border-border/50">
                    <InteractiveImage
                      src={null}
                      alt="No Image"
                      fallbackIcon={<ImageIcon className="h-10 w-10 text-muted-foreground/30" />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. useScrollDirection Hook */}
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-semibold tracking-tight">useScrollDirection</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-mono">
                  registry:hook
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Smart vertical scroll direction hook with thresholding and bounce protection for auto-hiding navigation bars.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground font-mono">react</span>
            </div>
          </div>
          <div className="px-6 py-3 bg-muted/40 border-b border-border/40 flex items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-muted-foreground select-none">$</span>
              <span className="text-foreground font-medium">npx shadcn add @joro-ui/use-scroll-direction</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/r/use-scroll-direction.json" target="_blank" className="text-muted-foreground hover:text-foreground text-[11px] underline underline-offset-2">json</Link>
              <CopyButton text="npx shadcn add @joro-ui/use-scroll-direction" />
            </div>
          </div>
          <div className="p-8">
            <div className="h-44 rounded-xl border border-dashed border-border/80 flex flex-col items-center justify-center gap-3 bg-muted/10 relative text-center p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                <ArrowUpDown className="h-3.5 w-3.5" />
                Live State: Header is {isHeaderVisible ? "Visible (Scrolling Up)" : "Hidden (Scrolling Down)"}
              </div>
              <p className="text-xs text-muted-foreground max-w-sm">
                Scroll down this page to watch the sticky header smoothly animate off-screen, then scroll up slightly to reveal it.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6 text-center text-xs text-muted-foreground">
        <p>joro-ui • Personal React Component Catalog & Custom Registry • Powered by Bun & Next.js</p>
      </footer>
    </div>
  );
}
