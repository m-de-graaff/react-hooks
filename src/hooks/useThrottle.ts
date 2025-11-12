'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Hook to throttle a value - returns the value updated at most once per interval
 * @param value - The value to throttle
 * @param interval - The throttle interval in milliseconds (defaults to 500)
 * @returns The throttled value
 * @example
 * const [scrollY, setScrollY] = useState(0);
 * const throttledScrollY = useThrottle(scrollY, 100);
 * // throttledScrollY will update at most once every 100ms
 */
function useThrottle<T>(value: T, interval: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdatedRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const now = Date.now();

    if (lastUpdatedRef.current === null) {
      // First update - set immediately
      lastUpdatedRef.current = now;
      setThrottledValue(value);
      return;
    }

    const timeSinceLastUpdate = now - lastUpdatedRef.current;

    if (timeSinceLastUpdate >= interval) {
      // Enough time has passed - update immediately
      lastUpdatedRef.current = now;
      setThrottledValue(value);
      return;
    } else {
      // Not enough time has passed - schedule update
      const remainingTime = interval - timeSinceLastUpdate;

      // Clear any existing timeout
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        lastUpdatedRef.current = Date.now();
        setThrottledValue(value);
        timeoutRef.current = null;
      }, remainingTime);

      return () => {
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }
  }, [value, interval]);

  return throttledValue;
}

export default useThrottle;
