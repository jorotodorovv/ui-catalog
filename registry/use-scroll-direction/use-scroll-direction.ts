import { useState, useEffect, useRef } from 'react';

export interface UseScrollDirectionOptions {
  threshold?: number;
  axisOffset?: number;
  targetRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Hook to track vertical scroll direction and determine if navigation header should be visible.
 * Returns true if scrolling up or at the top of the page/container, and false when scrolling down.
 * Supports both window scrolling and custom scrollable container targets via targetRef.
 */
export function useScrollDirection(options: UseScrollDirectionOptions = {}) {
  const { threshold = 50, axisOffset = 10, targetRef } = options;
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const target = targetRef ? targetRef.current : window;
    if (!target) return;

    const getScrollY = () => {
      if (targetRef && targetRef.current) {
        return targetRef.current.scrollTop;
      }
      return window.scrollY;
    };

    lastScrollY.current = getScrollY();

    const updateScrollDir = () => {
      const scrollY = getScrollY();

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

    target.addEventListener('scroll', updateScrollDir, { passive: true });
    return () => target.removeEventListener('scroll', updateScrollDir);
  }, [threshold, axisOffset, targetRef]);

  return isVisible;
}

