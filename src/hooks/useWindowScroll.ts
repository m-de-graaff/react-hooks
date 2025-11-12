'use client';
import { useCallback, useSyncExternalStore } from 'react';

interface WindowScroll {
  x: number;
  y: number;
}

type ScrollToFunction = {
  (x: number, y: number): void;
  (options: { top?: number; left?: number; behavior?: ScrollBehavior }): void;
};

function snapshot(): WindowScroll {
  if (typeof window === 'undefined') {
    return { x: 0, y: 0 };
  }
  return {
    x: window.scrollX,
    y: window.scrollY,
  };
}

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  window.addEventListener('scroll', callback, { passive: true });

  return () => {
    window.removeEventListener('scroll', callback);
  };
}

/**
 * Hook to track window scroll position and provide scroll control
 * @returns A tuple containing the current scroll position and a scrollTo function
 * @example
 * const [{ x, y }, scrollTo] = useWindowScroll();
 * // Scroll to specific coordinates
 * scrollTo(0, 100);
 * // Or use options object
 * scrollTo({ top: 100, left: 0, behavior: 'smooth' });
 */
function useWindowScroll(): readonly [WindowScroll, ScrollToFunction] {
  const scroll = useSyncExternalStore(subscribe, snapshot);

  const scrollTo = useCallback(
    (
      xOrOptions: number | { top?: number; left?: number; behavior?: ScrollBehavior },
      y?: number
    ): void => {
      if (typeof window === 'undefined') return;

      // Handle two number arguments: scrollTo(x, y)
      if (typeof xOrOptions === 'number' && typeof y === 'number') {
        window.scrollTo(xOrOptions, y);
      }
      // Handle options object: scrollTo({ top, left, behavior })
      else if (typeof xOrOptions === 'object' && xOrOptions !== null && y === undefined) {
        const { top, left, behavior } = xOrOptions;
        if (
          (top !== undefined && typeof top !== 'number') ||
          (left !== undefined && typeof left !== 'number') ||
          (behavior !== undefined && typeof behavior !== 'string')
        ) {
          throw new Error('Invalid scrollTo options object');
        }
        window.scrollTo({ top, left, behavior });
      } else {
        throw new Error('scrollTo must be called with (x, y) or an options object');
      }
    },
    []
  ) as ScrollToFunction;

  return [scroll, scrollTo] as const;
}

export default useWindowScroll;
