"use client";

import React, { useState } from "react";
import { InteractiveImage } from "@/registry/interactive-image";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  RefreshCw,
  AlertCircle,
  Clock,
  Flame,
  ChefHat,
  Bookmark,
  Check,
  ImageIcon,
} from "lucide-react";

interface DishPreset {
  id: string;
  name: string;
  category: string;
  prepTime: string;
  calories: string;
  src: string;
  prompt: string;
}

const PRESETS: DishPreset[] = [
  {
    id: "truffle-pasta",
    name: "Truffle & Wild Mushroom Tagliatelle",
    category: "Italian Cuisine",
    prepTime: "25 min",
    calories: "480 kcal",
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
    prompt: "Handmade tagliatelle with shaved black summer truffles and chives",
  },
  {
    id: "ramen-bowl",
    name: "Hakata Tonkotsu Chashu Ramen",
    category: "Japanese Noodle",
    prepTime: "30 min",
    calories: "620 kcal",
    src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
    prompt: "Rich 18-hour pork broth with charred chashu, nitamago egg and nori",
  },
  {
    id: "avocado-bowl",
    name: "Superfood Avocado Salmon Poke",
    category: "Healthy Bowls",
    prepTime: "15 min",
    calories: "410 kcal",
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
    prompt: "Sustainably sourced salmon, ripe avocado, edamame, and sesame ponzu",
  },
];

export function InteractiveImageDemo() {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [key, setKey] = useState(0);
  const [saved, setSaved] = useState(false);

  const currentPreset = PRESETS[selectedPresetIndex];
  const activeSrc = isBroken ? null : currentPreset.src;

  const handleSimulateAiGenerate = () => {
    setIsBroken(false);
    setIsGenerating(true);

    // Pick next preset to simulate generating a new variation
    const nextIndex = (selectedPresetIndex + 1) % PRESETS.length;

    setTimeout(() => {
      setSelectedPresetIndex(nextIndex);
      setIsGenerating(false);
      setKey((k) => k + 1);
    }, 1400);
  };

  const handleReloadShimmer = () => {
    setIsBroken(false);
    setIsGenerating(false);
    setKey((k) => k + 1);
  };

  const handleToggleBroken = () => {
    setIsGenerating(false);
    setIsBroken((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Interactive Control Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-muted/40 border border-border/50 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSimulateAiGenerate}
            disabled={isGenerating}
            className="h-7 text-[11px] gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary border-primary/30"
          >
            <Sparkles className={`h-3 w-3 ${isGenerating ? "animate-spin" : ""}`} />
            {isGenerating ? "Generating Dish..." : "Simulate AI Generation"}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReloadShimmer}
            disabled={isGenerating}
            className="h-7 text-[11px] gap-1.5 hover:bg-secondary"
            title="Forces image reload to observe skeleton shimmer"
          >
            <RefreshCw className="h-3 w-3" />
            Test Shimmer
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleBroken}
            disabled={isGenerating}
            className={`h-7 text-[11px] gap-1.5 ${
              isBroken
                ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                : "hover:bg-secondary text-muted-foreground"
            }`}
            title="Simulate broken URL / missing image fallback"
          >
            <AlertCircle className="h-3 w-3" />
            {isBroken ? "Restore Image" : "Test Fallback (404)"}
          </Button>
        </div>

        {/* Live State Badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-background/80 border border-border/40 font-mono text-[10px]">
          <span className="text-muted-foreground">State:</span>
          {isGenerating ? (
            <span className="text-amber-500 font-semibold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Generating
            </span>
          ) : isBroken ? (
            <span className="text-destructive font-semibold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
              Fallback Icon
            </span>
          ) : (
            <span className="text-emerald-500 font-semibold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Progressive Render
            </span>
          )}
        </div>
      </div>

      {/* Realistic Real-World Implementation Card */}
      <div className="max-w-md mx-auto w-full rounded-2xl border border-border/70 bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* InteractiveImage Container */}
        <div className="relative aspect-[16/10] w-full bg-muted overflow-hidden">
          <InteractiveImage
            key={`${activeSrc}-${key}`}
            src={activeSrc}
            alt={currentPreset.name}
            isGenerating={isGenerating}
            fallbackIcon={
              <div className="flex flex-col items-center justify-center gap-2 p-6 text-center text-muted-foreground/60">
                <ImageIcon className="h-10 w-10 stroke-[1.2]" />
                <span className="text-xs font-medium">Image unavailable</span>
                <span className="text-[10px] text-muted-foreground/50">Gracefully handled fallback</span>
              </div>
            }
          />

          {/* Category Tag Overlay */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border/40 text-[11px] font-medium text-foreground shadow-sm flex items-center gap-1">
              <ChefHat className="h-3 w-3 text-primary" />
              {currentPreset.category}
            </span>
          </div>

          {/* Bookmark Action */}
          <button
            onClick={() => setSaved((s) => !s)}
            className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-background/90 backdrop-blur-md border border-border/40 flex items-center justify-center text-foreground hover:text-primary transition-all shadow-sm active:scale-90"
            aria-label="Save dish"
          >
            {saved ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h4 className="font-semibold text-base leading-tight tracking-tight">
              {currentPreset.name}
            </h4>
            <p className="text-xs text-muted-foreground font-mono truncate">
              {isGenerating ? "Updating neural recipe prompt..." : `Prompt: "${currentPreset.prompt}"`}
            </p>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-border/40 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
                {currentPreset.prepTime}
              </span>
              <span className="flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-amber-500/80" />
                {currentPreset.calories}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {PRESETS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setIsBroken(false);
                    setSelectedPresetIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === selectedPresetIndex && !isBroken
                      ? "w-5 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  aria-label={`Select ${p.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
