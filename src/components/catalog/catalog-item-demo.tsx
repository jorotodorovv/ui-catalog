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
        <div className="flex items-center justify-center p-4">
          <ThemeToggle />
        </div>
      );

    case "multi-filter-dropdown":
      return (
        <div className="w-44 flex justify-center p-4">
          <MultiFilterDropdown
            title="Ingredients"
            options={INGREDIENT_OPTIONS}
            defaultValues={["Carrot", "Tomato"]}
            icon={Tag}
            showSearch={true}
            placeholder="Search..."
          />
        </div>
      );

    case "filter-dropdown":
      return (
        <div className="w-44 flex justify-center p-4">
          <FilterDropdown
            title="Platform"
            options={PLATFORM_OPTIONS}
            selectedValue={platform}
            onValueChange={setPlatform}
            icon={Globe}
            showSearch={true}
          />
        </div>
      );

    case "interactive-image":
      return <InteractiveImageDemo />;

    case "use-scroll-direction":
      return <ScrollDirectionDemo />;

    default:
      return (
        <p className="text-xs text-muted-foreground">Demo coming soon</p>
      );
  }
}
