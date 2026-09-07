import React, { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useViewTransitionTheme } from './use-view-transition-theme';
import './view-transitions.css';

const easeInArc = [0.34, 1.56, 0.64, 1] as const;
const easeOutArc = [0.36, 0, 0.66, -0.56] as const;

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { isDark, toggleTheme } = useViewTransitionTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center border border-border/30">
        <div className="h-4 w-4 rounded-full bg-muted/60" />
      </div>
    );
  }

  const iconVariants: Variants = {
    initial: (darkState: boolean) => ({
      x: darkState ? 18 : -18,
      y: 18,
      rotate: darkState ? 90 : -90,
      opacity: 0,
      scale: 0.4,
    }),
    animate: {
      x: [null, -4, 0],
      y: [null, -6, 0],
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: easeInArc,
      },
    },
    exit: (darkState: boolean) => ({
      x: [0, 4, darkState ? -18 : 18],
      y: [0, -6, 18],
      rotate: darkState ? -90 : 90,
      opacity: 0,
      scale: 0.4,
      transition: {
        duration: 0.35,
        ease: easeOutArc,
      },
    }),
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="h-10 w-10 rounded-full hover:bg-secondary border border-border/30 shadow-md flex items-center justify-center active:scale-95 transition-all relative overflow-hidden"
    >
      <AnimatePresence mode="wait" custom={isDark}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          custom={isDark}
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-amber-500" />
          ) : (
            <Moon className="h-4 w-4 text-primary" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
