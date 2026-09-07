"use client";

import React, { useRef } from "react";
import { useScrollDirection } from "@/registry/use-scroll-direction/use-scroll-direction";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

export function ScrollDirectionDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isNavVisible = useScrollDirection({
    targetRef: containerRef,
    threshold: 20,
    axisOffset: 8,
  });

  const handleScrollDown = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ top: 90, behavior: "smooth" });
  };

  const handleScrollUp = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ top: -90, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center gap-2.5 w-full max-w-[280px]">
      {/* Compact Mini-Viewport */}
      <div className="relative w-full h-36 rounded-lg border border-border/60 bg-background overflow-hidden">
        {/* Auto-Hiding Mini Navigation Bar */}
        <div
          className={`absolute top-0 inset-x-0 z-10 h-7 px-3 flex items-center justify-between bg-card/90 backdrop-blur-xs border-b border-border/40 text-[11px] font-medium transition-all duration-200 ease-out ${
            isNavVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <span className="font-semibold tracking-tight text-foreground">Navigation</span>
          <span className="text-[10px] text-emerald-500 font-mono">Visible</span>
        </div>

        {/* Scrollable Content */}
        <div
          ref={containerRef}
          className="h-full overflow-y-auto pt-9 pb-3 px-3 space-y-1.5 text-xs text-muted-foreground"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-6 rounded bg-muted/40 border border-border/20 px-2 flex items-center justify-between text-[10px]"
            >
              <span>Feed Item {i}</span>
              <span className="text-muted-foreground/50">scroll me</span>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Controls & Status */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleScrollDown}
            className="h-7 text-[11px] px-2 gap-1 cursor-pointer"
          >
            <ArrowDown className="h-3 w-3" />
            Down
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleScrollUp}
            className="h-7 text-[11px] px-2 gap-1 cursor-pointer"
          >
            <ArrowUp className="h-3 w-3" />
            Up
          </Button>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-1 text-[10px] font-mono">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isNavVisible ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
          <span className="text-muted-foreground">
            {isNavVisible ? "Nav Visible" : "Nav Hidden"}
          </span>
        </div>
      </div>
    </div>
  );
}
