import { useState, useEffect, useRef } from 'react';

export interface UseScrollDirectionOptions {
  threshold?: number;
  axisOffset?: number;
}

/**
 * Hook to track vertical scroll direction and determine if navigation header should be visible.
 * Returns true if scrolling up or at the top of the page, and false when scrolling down.
 */
export function useScrollDirection(options: UseScrollDirectionOptions = {}) {
  const { threshold = 50, axisOffset = 10 } = options;
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    lastScrollY.current = window.scrollY;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      // Ignore elastic scrolling bounce (negative scroll positions)
      if (scrollY < 0) {
        return;
      }

      // Ignore small scroll shifts to avoid flickering/jittering
      if (Math.abs(scrollY - lastScrollY.current) < axisOffset) {
        return;
      }

      if (scrollY <= threshold) {
        setIsVisible(true);
      } else if (scrollY > lastScrollY.current) {
        // Scrolling down -> hide header
        setIsVisible(false);
      } else {
        // Scrolling up -> show header
        setIsVisible(true);
      }

      lastScrollY.current = scrollY;
    };

    const handleScroll = () => {
      updateScrollDir();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, axisOffset]);

  return isVisible;
}
