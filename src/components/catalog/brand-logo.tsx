import React, { useId } from "react";

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export function BrandLogo({ className = "", size = 36 }: BrandLogoProps) {
  const id = useId();
  const topGradId = `${id}-top`;
  const leftGradId = `${id}-left`;
  const rightGradId = `${id}-right`;
  const coreGradId = `${id}-core`;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer ambient glow */}
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-blue-600/35 via-violet-500/25 to-sky-400/35 blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300" />

      {/* Badge surface */}
      <div
        className="relative rounded-xl bg-background/90 dark:bg-card/90 border border-border/80 dark:border-border/50 shadow-xs ring-1 ring-border/20 backdrop-blur-xs flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50 overflow-hidden"
        style={{ width: size, height: size }}
      >
        {/* Subtle top-light highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

        {/* Custom Geometric SVG logo mark */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 relative z-10"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={topGradId}
              x1="3.5"
              y1="2.5"
              x2="20.5"
              y2="12.3"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient
              id={leftGradId}
              x1="3.5"
              y1="8.7"
              x2="11"
              y2="21.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient
              id={rightGradId}
              x1="13"
              y1="8.7"
              x2="20.5"
              y2="21.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#818cf8" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient
              id={coreGradId}
              x1="9"
              y1="8"
              x2="15"
              y2="12"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="1" stopColor="#38bdf8" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Top isometric facet */}
          <path
            d="M12 2.5L20.5 7.4L12 12.3L3.5 7.4L12 2.5Z"
            fill={`url(#${topGradId})`}
          />

          {/* Left isometric facet (J-stem) */}
          <path
            d="M3.5 8.7L11 13V21.5L3.5 17.2V8.7Z"
            fill={`url(#${leftGradId})`}
          />

          {/* Right isometric facet (U-wing) */}
          <path
            d="M13 13L20.5 8.7V17.2L13 21.5V13Z"
            fill={`url(#${rightGradId})`}
          />

          {/* Core luminous prism accent */}
          <path
            d="M12 7.8L15 9.5L12 11.2L9 9.5L12 7.8Z"
            fill={`url(#${coreGradId})`}
          />
        </svg>
      </div>
    </div>
  );
}
