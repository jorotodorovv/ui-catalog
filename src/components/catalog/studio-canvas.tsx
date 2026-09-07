"use client";

import React, { useId, useState } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StudioCanvasProps {
  children: React.ReactNode | ((props: { resetKey: number }) => React.ReactNode);
  className?: string;
  canvasClassName?: string;
  onReset?: () => void;
  title?: string;
  description?: string;
  pattern?: "dots" | "checkered" | "grid";
  showReset?: boolean;
  minHeight?: string;
  resetTooltip?: string;
}

/**
 * StudioCanvas provides an elevated workbench canvas for interactive UI demos.
 * Eliminates unstyled wireframe borders with a subtle dotted mesh grid, inset vignette,
 * radial spotlight, and a floating canvas control (e.g. Reset state).
 */
export function StudioCanvas({
  children,
  className,
  canvasClassName,
  onReset,
  title,
  description,
  pattern = "dots",
  showReset = true,
  minHeight = "min-h-64",
  resetTooltip = "Reset demo state",
}: StudioCanvasProps) {
  const rawId = useId();
  // Sanitize ID for valid SVG pattern reference
  const patternId = `studio-pattern-${rawId.replace(/[:]/g, "")}`;
  const [resetKey, setResetKey] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = () => {
    if (isResetting) return;
    setIsResetting(true);
    setResetKey((prev) => prev + 1);
    onReset?.();
    setTimeout(() => {
      setIsResetting(false);
    }, 500);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/80 bg-card/30 p-6 text-center shadow-xs transition-colors duration-200",
        minHeight,
        className
      )}
    >
      {/* Dotted Mesh Grid / Workbench Pattern */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-foreground/[0.08] dark:text-foreground/[0.12]"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {pattern === "dots" && (
            <pattern
              id={patternId}
              x="0"
              y="0"
              width="18"
              height="18"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.1" fill="currentColor" />
            </pattern>
          )}

          {pattern === "checkered" && (
            <pattern
              id={patternId}
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <rect width="12" height="12" fill="currentColor" opacity="0.35" />
              <rect x="12" y="12" width="12" height="12" fill="currentColor" opacity="0.35" />
            </pattern>
          )}

          {pattern === "grid" && (
            <pattern
              id={patternId}
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.3"
              />
            </pattern>
          )}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Inset Vignette: radial gradient spotlight that softens dots at center and adds genuine depth */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-background/90 via-background/40 to-transparent dark:from-background/85 dark:via-background/30 dark:to-transparent"
        aria-hidden="true"
      />

      {/* Primary Subtle Color Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.09)_0%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Inset Vignette Edge Shadow & Crisp Inner Framing Ring */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_32px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_0_42px_rgba(0,0,0,0.55)] ring-1 ring-inset ring-foreground/[0.04] dark:ring-white/[0.05]"
        aria-hidden="true"
      />

      {/* Floating Top-Right Canvas Control (Reset / Refresh State) */}
      {showReset && (
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleReset}
            className="group relative flex h-7 w-7 items-center justify-center rounded-lg border border-border/70 bg-background/85 text-muted-foreground shadow-2xs backdrop-blur-xs transition-all duration-200 hover:bg-background hover:text-foreground hover:border-border hover:shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            title={resetTooltip}
            aria-label={resetTooltip}
          >
            <RotateCcw
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-500 ease-out",
                isResetting ? "-rotate-180 scale-90" : "group-hover:-rotate-45"
              )}
            />
            <span className="sr-only">{resetTooltip}</span>
          </button>
        </div>
      )}

      {/* Canvas Header / Explanatory Text */}
      {(title || description) && (
        <div className="relative z-10 mb-4 space-y-1 max-w-xs px-2">
          {title && (
            <p className="text-sm font-medium tracking-tight text-foreground">
              {title}
            </p>
          )}
          {description && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Centered Interactive Playground Subject */}
      <div
        key={resetKey}
        className={cn(
          "relative z-10 flex w-full items-center justify-center",
          canvasClassName
        )}
      >
        {typeof children === "function" ? children({ resetKey }) : children}
      </div>
    </div>
  );
}
