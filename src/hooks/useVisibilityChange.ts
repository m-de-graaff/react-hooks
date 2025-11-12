'use client';
import { useSyncExternalStore } from 'react';

function snapshot(): boolean {
  if (typeof document === 'undefined') {
    return true;
  }
  return document.visibilityState === 'visible';
}

function subscribe(callback: () => void): () => void {
  if (typeof document === 'undefined') {
    return () => {};
  }
  document.addEventListener('visibilitychange', callback);

  return () => {
    document.removeEventListener('visibilitychange', callback);
  };
}

/**
 * Hook to track document visibility state
 * @returns true if the document is visible, false if hidden
 * @example
 * const isVisible = useVisibilityChange();
 * // Returns true when tab/window is visible, false when hidden
 */
function useVisibilityChange(): boolean {
  return useSyncExternalStore(subscribe, snapshot);
}

export default useVisibilityChange;
