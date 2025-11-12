'use client';
import { useSyncExternalStore } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

function snapshot(): WindowSize {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  window.addEventListener('resize', callback);

  return () => {
    window.removeEventListener('resize', callback);
  };
}

/**
 * Hook to track the window size
 * @returns An object containing the current window width and height
 * @example
 * const { width, height } = useWindowSize();
 * // Returns { width: 1920, height: 1080 } (current window dimensions)
 */
function useWindowSize(): WindowSize {
  return useSyncExternalStore(subscribe, snapshot);
}

export default useWindowSize;
