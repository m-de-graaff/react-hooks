'use client';
import { useEffect, useEffectEvent, useRef } from 'react';

/**
 * Hook to run a callback function after a specified delay
 * @param cb - The callback function to execute after the timeout
 * @param ms - The delay in milliseconds (null to disable/cancel)
 * @returns A function to manually clear the timeout
 * @example
 * const clearTimeout = useTimeout(() => {
 *   console.log("Timeout fired!");
 * }, 1000);
 * // Clear the timeout manually if needed
 * clearTimeout();
 */
function useTimeout(cb: () => void, ms: number | null): () => void {
  const onTimeout = useEffectEvent(cb);
  const idRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (ms === null) {
      return;
    }

    idRef.current = setTimeout(() => {
      onTimeout();
    }, ms);

    return () => {
      if (idRef.current !== null) {
        clearTimeout(idRef.current);
      }
    };
  }, [ms]);

  return () => {
    if (idRef.current !== null) {
      clearTimeout(idRef.current);
    }
  };
}

export default useTimeout;
