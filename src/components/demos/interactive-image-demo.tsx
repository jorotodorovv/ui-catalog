"use client";

import React, { useState } from "react";
import { InteractiveImage } from "@/registry/interactive-image";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, AlertCircle, ImageIcon } from "lucide-react";

const SAMPLE_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80";

export function InteractiveImageDemo() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [key, setKey] = useState(0);

  const handleSimulateGenerate = () => {
    setIsBroken(false);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setKey((k) => k + 1);
    }, 1200);
  };

  const handleTestShimmer = () => {
    setIsBroken(false);
    setIsGenerating(false);
    setKey((k) => k + 1);
  };

  const handleToggleBroken = () => {
    setIsGenerating(false);
    setIsBroken((prev) => !prev);
  };

  const activeSrc = isBroken ? null : SAMPLE_IMAGE;

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-[280px]">
      {/* Compact Image Container */}
      <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-border/60 bg-muted">
        <InteractiveImage
          key={`${activeSrc}-${key}`}
          src={activeSrc}
          alt="Sample pasta dish"
          isGenerating={isGenerating}
          fallbackIcon={
            <div className="flex flex-col items-center justify-center gap-1.5 p-4 text-center text-muted-foreground">
              <ImageIcon className="h-6 w-6 stroke-[1.5]" />
              <span className="text-[11px] font-medium">Image unavailable</span>
            </div>
          }
        />
      </div>

      {/* Simple, Compact Control Strip */}
      <div className="flex items-center justify-between gap-1.5 w-full">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSimulateGenerate}
            disabled={isGenerating}
            className="h-7 text-[11px] px-2 gap-1 cursor-pointer"
            title="Simulate AI generation state"
          >
            <Sparkles className={`h-3 w-3 ${isGenerating ? "animate-spin" : ""}`} />
            Generate
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleTestShimmer}
            disabled={isGenerating}
            className="h-7 text-[11px] px-2 gap-1 text-muted-foreground hover:text-foreground cursor-pointer"
            title="Reload image to test shimmer skeleton"
          >
            <RefreshCw className="h-3 w-3" />
            Shimmer
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleBroken}
            disabled={isGenerating}
            className={`h-7 text-[11px] px-2 gap-1 cursor-pointer ${
              isBroken
                ? "text-destructive hover:text-destructive"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Simulate broken URL / 404 fallback"
          >
            <AlertCircle className="h-3 w-3" />
            {isBroken ? "Reset" : "404"}
          </Button>
        </div>

        {/* Minimal Status Dot */}
        <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isGenerating
                ? "bg-amber-500 animate-pulse"
                : isBroken
                ? "bg-destructive"
                : "bg-emerald-500"
            }`}
          />
          <span className="hidden sm:inline">
            {isGenerating ? "Loading" : isBroken ? "Fallback" : "Ready"}
          </span>
        </div>
      </div>
    </div>
  );
}
