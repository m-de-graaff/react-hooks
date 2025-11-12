'use client';
import { useSyncExternalStore } from 'react';

function snapshot(query: string): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia(query).matches;
}

function subscribe(query: string): (callback: () => void) => () => void {
  return (callback: () => void): (() => void) => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return () => {};
    }

    const mediaQueryList = window.matchMedia(query);

    const handleChange = (): void => {
      callback();
    };

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  };
}

/**
 * Hook to track a media query match state
 * @param query - The media query string (e.g., "(min-width: 768px)")
 * @returns true if the media query matches, false otherwise
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
 * // Returns true when the media query matches
 */
function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(subscribe(query), () => snapshot(query));
}

export default useMediaQuery;
