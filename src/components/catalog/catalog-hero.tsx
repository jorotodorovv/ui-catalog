"use client";

import React from "react";

export function CatalogHero() {
  return (
    <section className="py-12 px-6 border-b border-border/40">
      <div className="max-w-3xl mx-auto text-center space-y-3">
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
