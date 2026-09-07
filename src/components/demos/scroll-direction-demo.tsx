"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScrollDirection } from "@/registry/use-scroll-direction/use-scroll-direction";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  RotateCcw,
  Sparkles,
  Compass,
  Search,
  Bell,
  Home,
  Bookmark,
  User,
  Heart,
  MessageCircle,
  Share2,
  Smartphone,
} from "lucide-react";

export function ScrollDirectionDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isNavVisible = useScrollDirection({
    targetRef: containerRef,
    threshold: 30,
    axisOffset: 8,
  });

  const [currentScrollY, setCurrentScrollY] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      setCurrentScrollY(el.scrollTop);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ top: 180, behavior: "smooth" });
  };

  const handleScrollUp = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ top: -180, behavior: "smooth" });
  };

  const handleScrollToTop = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* HUD & Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-muted/40 border border-border/50 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleScrollDown}
            className="h-7 text-[11px] gap-1 hover:bg-secondary"
          >
            <ArrowDown className="h-3 w-3" />
            Scroll Down
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleScrollUp}
            className="h-7 text-[11px] gap-1 hover:bg-secondary"
          >
            <ArrowUp className="h-3 w-3" />
            Scroll Up
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleScrollToTop}
            className="h-7 text-[11px] gap-1 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" />
            Top
          </Button>
        </div>

        {/* Live HUD Indicator */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-background/80 border border-border/40">
            <span className="text-muted-foreground">Offset:</span>
            <span className="font-semibold text-foreground">{Math.round(currentScrollY)}px</span>
          </div>

          <div
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border font-semibold transition-colors ${
              isNavVisible
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
            }`}
          >
            {isNavVisible ? (
              <>
                <ArrowUp className="h-3 w-3" />
                <span>NAV VISIBLE (Up / At Top)</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3" />
                <span>NAV HIDDEN (Down)</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Mobile Device Frame Simulator */}
      <div className="relative mx-auto w-full max-w-[340px] rounded-[2.5rem] border-[6px] border-border/80 bg-background shadow-xl overflow-hidden ring-1 ring-border/40">
        {/* Device Speaker & Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full bg-border/60 z-30 flex items-center justify-center">
          <div className="w-10 h-1 rounded-full bg-background/80" />
        </div>

        {/* Dynamic Auto-Hiding Header */}
        <div
          className={`absolute top-0 left-0 right-0 z-20 pt-8 pb-3 px-4 bg-background/90 backdrop-blur-md border-b border-border/50 transition-all duration-300 ease-in-out ${
            isNavVisible
              ? "translate-y-0 opacity-100 shadow-sm"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
                JU
              </div>
              <div className="leading-tight">
                <span className="font-semibold text-xs block">Explore Feed</span>
                <span className="text-[9px] text-muted-foreground">Auto-hides on scroll</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="h-7 w-7 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground" aria-label="Search">
                <Search className="h-3.5 w-3.5" />
              </button>
              <button className="h-7 w-7 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground" aria-label="Notifications">
                <Bell className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Container Content */}
        <div
          ref={containerRef}
          className="h-[360px] overflow-y-auto px-4 pt-20 pb-20 space-y-3.5 select-none scroll-smooth"
        >
          <div className="text-[11px] font-medium text-muted-foreground px-1 flex items-center justify-between">
            <span>Scroll inside or use buttons above</span>
            <Smartphone className="h-3.5 w-3.5" />
          </div>

          {/* Feed Post 1 */}
          <div className="rounded-xl border border-border/60 bg-card p-3 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center text-[10px] font-bold">
                A
              </div>
              <div>
                <span className="text-xs font-medium block">Alex Rivers</span>
                <span className="text-[9px] text-muted-foreground">Design Engineer • 12m ago</span>
              </div>
            </div>
            <p className="text-xs text-foreground/90 leading-relaxed">
              Auto-hiding navigation bars maximize mobile reading real estate by up to 18%.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground text-[10px] pt-1">
              <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
                <Heart className="h-3 w-3" /> 142
              </span>
              <span className="flex items-center gap-1 cursor-pointer">
                <MessageCircle className="h-3 w-3" /> 28
              </span>
              <span className="flex items-center gap-1 cursor-pointer">
                <Share2 className="h-3 w-3" /> Share
              </span>
            </div>
          </div>

          {/* Feed Post 2 */}
          <div className="rounded-xl border border-border/60 bg-card p-3 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-[10px] font-bold">
                M
              </div>
              <div>
                <span className="text-xs font-medium block">Maya Chen</span>
                <span className="text-[9px] text-muted-foreground">Frontend Architect • 1h ago</span>
              </div>
            </div>
            <p className="text-xs text-foreground/90 leading-relaxed">
              Thresholding and hysteresis prevent annoying micro-jitter when user lifts finger from touchscreen.
            </p>
            <div className="h-24 rounded-lg bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-violet-500/10 border border-border/40 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary/60" />
            </div>
            <div className="flex items-center gap-4 text-muted-foreground text-[10px] pt-1">
              <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
                <Heart className="h-3 w-3" /> 89
              </span>
              <span className="flex items-center gap-1 cursor-pointer">
                <MessageCircle className="h-3 w-3" /> 14
              </span>
            </div>
          </div>

          {/* Feed Post 3 */}
          <div className="rounded-xl border border-border/60 bg-card p-3 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center text-[10px] font-bold">
                J
              </div>
              <div>
                <span className="text-xs font-medium block">Joro Tech</span>
                <span className="text-[9px] text-muted-foreground">Core UI Team • 3h ago</span>
              </div>
            </div>
            <p className="text-xs text-foreground/90 leading-relaxed">
              Supports both page window scroll and custom container refs for modular dashboards and previews.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground text-[10px] pt-1">
              <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
                <Heart className="h-3 w-3" /> 312
              </span>
              <span className="flex items-center gap-1 cursor-pointer">
                <MessageCircle className="h-3 w-3" /> 45
              </span>
            </div>
          </div>

          {/* Bottom Feed Spacer */}
          <div className="py-4 text-center text-[10px] text-muted-foreground/60">
            End of sample feed
          </div>
        </div>

        {/* Dynamic Auto-Hiding Bottom Dock */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-20 pb-4 pt-2 px-6 bg-background/90 backdrop-blur-md border-t border-border/50 transition-all duration-300 ease-in-out ${
            isNavVisible
              ? "translate-y-0 opacity-100 shadow-sm"
              : "translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <button className="flex flex-col items-center gap-0.5 text-primary text-[9px] font-medium" aria-label="Home">
              <Home className="h-4 w-4" />
              <span>Feed</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 text-[9px] hover:text-foreground" aria-label="Discover">
              <Compass className="h-4 w-4" />
              <span>Explore</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 text-[9px] hover:text-foreground" aria-label="Saved">
              <Bookmark className="h-4 w-4" />
              <span>Saved</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 text-[9px] hover:text-foreground" aria-label="Profile">
              <User className="h-4 w-4" />
              <span>Me</span>
            </button>
          </div>
          {/* Home indicator bar */}
          <div className="w-20 h-1 rounded-full bg-border mx-auto mt-2" />
        </div>
      </div>
    </div>
  );
}
