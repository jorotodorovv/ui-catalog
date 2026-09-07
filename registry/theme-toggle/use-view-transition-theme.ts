import React from 'react';
import { useTheme } from 'next-themes';

export interface ViewTransitionThemeOptions {
  /**
   * Transition animation duration in milliseconds.
   * @default 500
   */
  duration?: number;
  /**
   * Timing function for the transition clip-path expansion.
   * @default 'cubic-bezier(0.4, 0, 0.2, 1)'
   */
  easing?: string;
}

/**
 * Reusable hook to handle theme switching using document.startViewTransition()
 * combined with a circular clip-path reveal animation originating from the user's click position.
 */
export function useViewTransitionTheme(options: ViewTransitionThemeOptions = {}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { duration = 500, easing = 'cubic-bezier(0.4, 0, 0.2, 1)' } = options;

  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  const toggleTheme = (event?: React.MouseEvent<HTMLElement> | MouseEvent) => {
    const nextTheme = isDark ? 'light' : 'dark';

    let x = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    let y = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

    if (event?.currentTarget && 'getBoundingClientRect' in event.currentTarget) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    const endRadius =
      typeof window !== 'undefined'
        ? Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
          )
        : 1000;

    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--x', `${x}px`);
      document.documentElement.style.setProperty('--y', `${y}px`);
      document.documentElement.style.setProperty('--r', `${endRadius}px`);
    }

    const isReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (typeof document === 'undefined' || !document.startViewTransition || isReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      if (typeof document.documentElement.animate === 'function') {
        document.documentElement.animate(
          { clipPath },
          {
            duration,
            easing,
            pseudoElement: '::view-transition-new(root)',
          }
        );
      }
    });
  };

  return {
    theme,
    resolvedTheme,
    isDark,
    setTheme,
    toggleTheme,
  };
}
