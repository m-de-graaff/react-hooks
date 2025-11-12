'use client';
import { useCallback, useEffect, useEffectEvent, useRef } from 'react';

interface UseRandomIntervalOptions {
  minDelay: number;
  maxDelay: number;
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Hook to run a callback function at random intervals between minDelay and maxDelay
 * @param cb - The callback function to execute on each interval
 * @param options - Configuration object with minDelay and maxDelay in milliseconds
 * @returns A function to manually clear the interval
 * @example
 * const clearInterval = useRandomInterval(() => {
 *   console.log("Random tick");
 * }, { minDelay: 1000, maxDelay: 5000 });
 * // Clear the interval manually if needed
 * clearInterval();
 */
function useRandomInterval(
  cb: () => void,
  options: UseRandomIntervalOptions
): () => void {
  const { minDelay, maxDelay } = options;
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const onInterval = useEffectEvent(cb);

  const handleClearTimeout = useCallback((): void => {
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    const tick = (): void => {
      const interval = getRandomNumber(minDelay, maxDelay);
      timeoutIdRef.current = setTimeout(() => {
        onInterval();
        tick();
      }, interval);
    };

    tick();

    return handleClearTimeout;
  }, [minDelay, maxDelay, handleClearTimeout]);

  return handleClearTimeout;
}

export default useRandomInterval;