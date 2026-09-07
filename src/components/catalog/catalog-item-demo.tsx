"use client";

import React, { useState } from "react";
import { ThemeToggle } from "@/registry/theme-toggle";
import { MultiFilterDropdown, MultiFilterOption } from "@/registry/multi-filter-dropdown";
import { FilterDropdown, FilterOption } from "@/registry/filter-dropdown";
import { InteractiveImageDemo } from "@/components/demos/interactive-image-demo";
import { ScrollDirectionDemo } from "@/components/demos/scroll-direction-demo";
import mockFilterData from "@/data/mock-filter-options.json";
import { Tag, Globe } from "lucide-react";

const INGREDIENT_OPTIONS = mockFilterData.ingredients as MultiFilterOption[];
const PLATFORM_OPTIONS = mockFilterData.platforms as FilterOption[];

interface CatalogItemDemoProps {
  id: string;
}

export function CatalogItemDemo({ id }: CatalogItemDemoProps) {
  const [platform, setPlatform] = useState("youtube");

  switch (id) {
    case "theme-toggle":
      return (
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
      );

    case "multi-filter-dropdown":
      return (
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
              options={INGREDIENT_OPTIONS}
              defaultValues={["Carrot", "Tomato"]}
              icon={Tag}
              showSearch={true}
              placeholder="Search ingredient..."
            />
          </div>
        </div>
      );

    case "filter-dropdown":
      return (
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
              options={PLATFORM_OPTIONS}
              selectedValue={platform}
              onValueChange={setPlatform}
              icon={Globe}
              showSearch={true}
            />
          </div>
        </div>
      );

    case "interactive-image":
      return <InteractiveImageDemo />;

    case "use-scroll-direction":
      return <ScrollDirectionDemo />;

    default:
      return (
        <div className="h-44 rounded-xl border border-dashed border-border/80 flex items-center justify-center text-xs text-muted-foreground">
          Demo coming soon
        </div>
      );
  }
}
