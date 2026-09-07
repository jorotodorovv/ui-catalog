import React from "react";
import registryData from "../../registry.json";
import {
  SunMoon,
  SlidersHorizontal,
  ListFilter,
  ImageIcon,
  ArrowUpDown,
  Code2,
} from "lucide-react";

export interface CatalogItem {
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

interface ItemVisualConfig {
  icon: React.ComponentType<{ className?: string }>;
  fullWidth?: boolean;
}

/**
 * Visual configuration mapping icon and layout settings for catalog items.
 */
const ITEM_VISUAL_CONFIGS: Record<string, ItemVisualConfig> = {
  "theme-toggle": {
    icon: SunMoon,
  },
  "multi-filter-dropdown": {
    icon: SlidersHorizontal,
  },
  "filter-dropdown": {
    icon: ListFilter,
  },
  "interactive-image": {
    icon: ImageIcon,
    fullWidth: true,
  },
  "use-scroll-direction": {
    icon: ArrowUpDown,
    fullWidth: true,
  },
};

/**
 * Automatically extracts catalog items and metadata from registry.json.
 * Whenever registry.json is updated, the catalog instantly reflects changes without manual duplication.
 */
export const CATALOG_ITEMS: CatalogItem[] = registryData.items.map((item) => {
  const visualConfig = ITEM_VISUAL_CONFIGS[item.name] ?? { icon: Code2 };
  const allDependencies = [
    ...(item.dependencies ?? []),
    ...(item.registryDependencies ?? []),
  ];

  return {
    id: item.name,
    name: item.title ?? item.name,
    type: item.type as "registry:component" | "registry:hook",
    category: item.type === "registry:hook" ? "hooks" : "components",
    icon: visualConfig.icon,
    description: item.description ?? "",
    cli: `npx shadcn add @${registryData.name}/${item.name}`,
    json: `/r/${item.name}.json`,
    dependencies: allDependencies,
    fullWidth: visualConfig.fullWidth,
  };
});

export const REGISTRY_NAME = registryData.name;
export const REGISTRY_HOMEPAGE = registryData.homepage;
