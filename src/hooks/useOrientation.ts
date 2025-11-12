'use client';
import { useSyncExternalStore } from 'react';

interface Orientation {
  angle: number;
  type: string;
}

function snapshot(): Orientation {
  if (typeof window === 'undefined') {
    return { angle: 0, type: 'UNKNOWN' };
  }

  const screenOrientation = window.screen?.orientation;

  if (screenOrientation) {
    return {
      angle: screenOrientation.angle ?? 0,
      type: screenOrientation.type ?? 'UNKNOWN',
    };
  }

  // Fallback for older browsers (window.orientation)
  const angle = typeof window.orientation === 'number' ? window.orientation : 0;
  return { angle, type: 'UNKNOWN' };
}

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const screenOrientation = window.screen?.orientation;

  if (screenOrientation?.addEventListener) {
    screenOrientation.addEventListener('change', callback);

    return () => {
      screenOrientation.removeEventListener('change', callback);
    };
  }

  // Fallback for older browsers
  window.addEventListener('orientationchange', callback);

  return () => {
    window.removeEventListener('orientationchange', callback);
  };
}

/**
 * Hook to track device screen orientation
 * @returns An object containing the current orientation angle and type
 * @example
 * const { angle, type } = useOrientation();
 * // Returns { angle: 0, type: "portrait-primary" } (current device orientation)
 */
function useOrientation(): Orientation {
  return useSyncExternalStore(subscribe, snapshot);
}

export default useOrientation;
