'use client';
import { useEffect, useEffectEvent, useRef, useState } from 'react';

interface UseContinuousRetryOptions {
  maxRetries?: number;
}

/**
 * Hook to continuously retry a callback function at a specified interval until it succeeds or max retries is reached
 * @param callback - The callback function to execute on each interval (should return true when successful)
 * @param interval - The interval duration in milliseconds (defaults to 100)
 * @param options - Optional configuration object with maxRetries (defaults to Infinity)
 * @returns true if the callback succeeded, false otherwise
 * @example
 * const hasResolved = useContinuousRetry(() => {
 *   return document.getElementById('my-element') !== null;
 * }, 100, { maxRetries: 50 });
 * // Retries every 100ms until element exists or 50 retries reached
 */
function useContinuousRetry(
  callback: () => boolean,
  interval: number = 100,
  options: UseContinuousRetryOptions = {}
): boolean {
  const { maxRetries = Infinity } = options;
  const [hasResolved, setHasResolved] = useState<boolean>(false);
  const onInterval = useEffectEvent(callback);
  const idRef = useRef<NodeJS.Timeout | null>(null);
  const retriesRef = useRef<number>(0);

  useEffect(() => {
    retriesRef.current = 0;

    idRef.current = setInterval(() => {
      if (onInterval()) {
        setHasResolved(true);
        if (idRef.current !== null) {
          clearInterval(idRef.current);
        }
      } else if (retriesRef.current >= maxRetries) {
        if (idRef.current !== null) {
          clearInterval(idRef.current);
        }
      } else {
        retriesRef.current += 1;
      }
    }, interval);

    return () => {
      if (idRef.current !== null) {
        clearInterval(idRef.current);
      }
    };
  }, [interval, maxRetries]);

  return hasResolved;
}

export default useContinuousRetry;