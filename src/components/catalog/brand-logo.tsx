import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export function BrandLogo({ className = "", size = 32 }: BrandLogoProps) {
  return (
    <div
      className={`relative rounded-lg bg-foreground text-background flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105 select-none shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Precision monochrome modular component grid glyph */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4.5"
      >
        {/* Solid component block */}
        <rect
          x="3"
          y="3"
          width="8"
          height="8"
          rx="2"
          fill="currentColor"
        />

        {/* Wireframe component block */}
        <rect
          x="13.75"
          y="3.75"
          width="6.5"
          height="6.5"
          rx="1.75"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        {/* Blueprint / slot block */}
        <rect
          x="3.75"
          y="13.75"
          width="6.5"
          height="6.5"
          rx="1.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 1.5"
        />

        {/* Interactive / filled-tint block */}
        <rect
          x="13.75"
          y="13.75"
          width="6.5"
          height="6.5"
          rx="1.75"
          fill="currentColor"
          fillOpacity="0.35"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
