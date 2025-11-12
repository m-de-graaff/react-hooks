'use client';
import { useCallback, useEffect, useEffectEvent, useRef, useState } from 'react';

interface UseCountdownOptions {
  interval?: number;
  onTick?: () => void;
  onComplete?: () => void;
}

/**
 * Hook to create a countdown timer that counts down from a target time
 * @param endTime - The target end time in milliseconds (Date.now() + duration)
 * @param options - Optional configuration object with interval, onTick, and onComplete callbacks
 * @returns The current countdown value (number of intervals remaining) or null
 * @example
 * const countdown = useCountdown(Date.now() + 60000, {
 *   interval: 1000,
 *   onTick: () => console.log('Tick'),
 *   onComplete: () => console.log('Complete!')
 * });
 * // Returns the number of seconds remaining
 */
function useCountdown(endTime: number, options: UseCountdownOptions = {}): number | null {
  const { interval = 1000, onTick, onComplete } = options;
  const [count, setCount] = useState<number | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleClearInterval = useCallback((): void => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  const onTickHandler = useEffectEvent(() => {
    setCount((prev) => {
      if (prev === null) return null;
      if (prev === 0) {
        handleClearInterval();
        onComplete?.();
        return 0;
      }
      const next = prev - 1;
      onTick?.();
      return next;
    });
  });

  useEffect(() => {
    const initialCount = Math.max(0, Math.round((endTime - Date.now()) / interval));
    setCount(initialCount);
  }, [endTime, interval]);

  useEffect(() => {
    if (count === null || count <= 0) return;

    intervalIdRef.current = setInterval(onTickHandler, interval);

    return handleClearInterval;
  }, [count, interval, handleClearInterval]);

  return count;
}

export default useCountdown;
