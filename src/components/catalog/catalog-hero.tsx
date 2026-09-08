"use client";

import React from "react";

export function CatalogHero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-14 px-6 border-b border-border/40">
      {/* Background Grid: ultra-subtle pattern fading out before the cards grid */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full stroke-foreground/[0.03] dark:stroke-foreground/[0.045] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_0%,#000_20%,transparent_100%)] -z-10"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="hero-grid-pattern"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path d="M0 32V.5H32" fill="none" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-grid-pattern)" />
      </svg>

      {/* Top Viewport Beam */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-px bg-gradient-to-r from-transparent via-border/70 dark:via-primary/25 to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto text-center space-y-3">
        {/* Ambient Glow: Soft radial glow behind the title in dark mode */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[500px] h-[160px] rounded-full bg-primary/15 blur-[100px] -z-10 opacity-0 dark:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        />

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          Components & Hooks
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
          A personal collection of accessible, motion-driven React components and hooks for modern web apps.
        </p>
      </div>
    </section>
  );
}
