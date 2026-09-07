"use client";

import React, { useState } from "react";
import { ThemeToggle } from "@/registry/theme-toggle";
import { MultiFilterDropdown, MultiFilterOption } from "@/registry/multi-filter-dropdown";
import { FilterDropdown, FilterOption } from "@/registry/filter-dropdown";
import { InteractiveImageDemo } from "@/components/demos/interactive-image-demo";
import { ScrollDirectionDemo } from "@/components/demos/scroll-direction-demo";
import { StudioCanvas } from "@/components/catalog/studio-canvas";
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
        <StudioCanvas
          title="Click to test View Transition"
          description="Expands a circular clip-path reveal originating from the click origin with arc trajectory."
          resetTooltip="Reset theme demo"
        >
          <div className="p-4 rounded-2xl bg-card/90 border border-border/60 shadow-xs backdrop-blur-xs transition-shadow hover:shadow-sm">
            <ThemeToggle />
          </div>
        </StudioCanvas>
      );

    case "multi-filter-dropdown":
      return (
        <StudioCanvas
          title="Interactive Multi-Select Card"
          description="Select ingredients, observe stacked emoji preview badges, or click clear."
          resetTooltip="Reset ingredients filter"
        >
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
        </StudioCanvas>
      );

    case "filter-dropdown":
      return (
        <StudioCanvas
          title="Single-Select Filter Card"
          description="Select a platform, observe the active highlight and quick clear trigger."
          onReset={() => setPlatform("youtube")}
          resetTooltip="Reset platform selection"
        >
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
        </StudioCanvas>
      );

    case "interactive-image":
      return <InteractiveImageDemo />;

    case "use-scroll-direction":
      return <ScrollDirectionDemo />;

    default:
      return (
        <StudioCanvas showReset={false} minHeight="min-h-44 h-44">
          <span className="text-xs font-medium text-muted-foreground">Demo coming soon</span>
        </StudioCanvas>
      );
  }
}
