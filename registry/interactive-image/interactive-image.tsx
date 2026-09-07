'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

export interface InteractiveImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  fallbackIcon?: React.ReactNode;
  width?: number;
  quality?: number;
  isGenerating?: boolean;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

export function InteractiveImage({
  src,
  alt,
  className,
  wrapperClassName,
  fallbackIcon,
  width,
  quality = 75,
  isGenerating,
  priority = false,
}: InteractiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const checkImageComplete = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, []);

  const setImgRef = useCallback((node: HTMLImageElement | null) => {
    imgRef.current = node;
    checkImageComplete(node);
  }, [checkImageComplete]);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);

    if (imgRef.current) {
      checkImageComplete(imgRef.current);
    }
  }, [src, checkImageComplete]);

  const sizes = width
    ? `(max-width: 768px) 100vw, ${width}px`
    : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

  // When generating, always show the generating overlay regardless of src state
  if (isGenerating) {
    return (
      <div className={cn('relative w-full h-full overflow-hidden rounded-[inherit] bg-muted', wrapperClassName)}>
        {/* Show existing image underneath if available */}
        {src && !error && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            quality={quality}
            unoptimized
            className={cn('object-cover opacity-30 blur-sm scale-105', className)}
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20 text-white">
          <Loader2 className="h-8 w-8 animate-spin text-white drop-shadow-md" />
          <span className="text-[10px] uppercase tracking-widest font-bold mt-2 text-white/90 drop-shadow-sm">Generating...</span>
        </div>
      </div>
    );
  }

  // No image and not generating — show fallback
  if (!src || error) {
    return (
      <div className={cn('w-full h-full flex items-center justify-center rounded-[inherit] bg-muted text-muted-foreground/30', wrapperClassName)}>
        {fallbackIcon}
      </div>
    );
  }

  return (
    <div className={cn('relative w-full h-full overflow-hidden rounded-[inherit] bg-muted', wrapperClassName)}>
      {/* Loading Skeleton / Shimmer */}
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      )}

      {/* Image with progressive loading transition */}
      <Image
        ref={setImgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        unoptimized
        onLoad={(e) => {
          setIsLoaded(true);
          setError(false);
          checkImageComplete(e.currentTarget as HTMLImageElement);
        }}
        onError={() => setError(true)}
        className={cn(
          'object-cover transition-opacity duration-300 ease-out',
          isLoaded
            ? 'opacity-100'
            : 'opacity-0',
          className
        )}
      />
    </div>
  );
}
