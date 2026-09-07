export interface UsageSnippet {
  code: string;
  filename: string;
  language: string;
  description: string;
}

export const CATALOG_USAGE: Record<string, UsageSnippet> = {
  "theme-toggle": {
    filename: "site-header.tsx",
    language: "tsx",
    description: "Import and render inside any navbar or settings panel with next-themes.",
    code: `import { ThemeToggle } from "@/components/ui/custom/theme-toggle";

export function SiteHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="font-semibold text-lg tracking-tight">My App</div>
      <div className="flex items-center gap-4">
        {/* Click triggers circular clip-path reveal using View Transitions API */}
        <ThemeToggle />
      </div>
    </header>
  );
}`,
  },
  "multi-filter-dropdown": {
    filename: "recipe-filter.tsx",
    language: "tsx",
    description: "Card-style multi-select filter popover with emojis, search, and badges.",
    code: `"use client";

import { useState } from "react";
import { MultiFilterDropdown, MultiFilterOption } from "@/components/ui/custom/multi-filter-dropdown";
import { Tag } from "lucide-react";

const INGREDIENTS: MultiFilterOption[] = [
  { label: "Tomato", value: "tomato", emoji: "🍅" },
  { label: "Carrot", value: "carrot", emoji: "🥕" },
  { label: "Avocado", value: "avocado", emoji: "🥑" },
  { label: "Broccoli", value: "broccoli", emoji: "🥦" },
];

export function RecipeFilter() {
  const [selected, setSelected] = useState<string[]>(["tomato"]);

  return (
    <div className="w-48">
      <MultiFilterDropdown
        title="Ingredients"
        options={INGREDIENTS}
        values={selected}
        onValuesChange={setSelected}
        icon={Tag}
        showSearch
        placeholder="Filter ingredients..."
      />
    </div>
  );
}`,
  },
  "filter-dropdown": {
    filename: "channel-filter.tsx",
    language: "tsx",
    description: "Square single-select filter popover with active state badge and search.",
    code: `"use client";

import { useState } from "react";
import { FilterDropdown, FilterOption } from "@/components/ui/custom/filter-dropdown";
import { Globe } from "lucide-react";

const PLATFORMS: FilterOption[] = [
  { label: "YouTube", value: "youtube", emoji: "▶️" },
  { label: "GitHub", value: "github", emoji: "🐙" },
  { label: "Twitter", value: "twitter", emoji: "🐦" },
];

export function ChannelFilter() {
  const [platform, setPlatform] = useState<string>("youtube");

  return (
    <div className="w-48">
      <FilterDropdown
        title="Platform"
        options={PLATFORMS}
        selectedValue={platform}
        onValueChange={setPlatform}
        icon={Globe}
        showSearch
      />
    </div>
  );
}`,
  },
  "interactive-image": {
    filename: "product-hero.tsx",
    language: "tsx",
    description: "Responsive Next.js image loader with shimmer skeleton and smooth reveal.",
    code: `import { InteractiveImage } from "@/components/ui/custom/interactive-image";

export function ProductHero() {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border">
      <InteractiveImage
        src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80"
        alt="Product artwork"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
    </div>
  );
}`,
  },
  "use-scroll-direction": {
    filename: "floating-navbar.tsx",
    language: "tsx",
    description: "Auto-hiding sticky header with thresholding and bounce protection.",
    code: `"use client";

import { useScrollDirection } from "@/hooks/use-scroll-direction";

export function FloatingNavbar() {
  const scrollDirection = useScrollDirection({ threshold: 12 });
  const isHidden = scrollDirection === "down";

  return (
    <header
      className={\`fixed top-0 inset-x-0 z-50 transition-all duration-300 \${
        isHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }\`}
    >
      <div className="mx-auto max-w-5xl backdrop-blur-md bg-background/80 border-b p-4">
        Dynamic Auto-Hiding Navigation
      </div>
    </header>
  );
}`,
  },
};
