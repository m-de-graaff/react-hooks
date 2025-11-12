'use client';
import { useCallback, useEffect, useEffectEvent, useRef } from 'react';

interface UseIntervalWhenOptions {
  ms: number;
  when: boolean;
  startImmediately?: boolean;
}

/**
 * Hook to run a callback function at a specified interval when a condition is true
 * @param cb - The callback function to execute on each interval
 * @param options - Configuration object with ms (interval duration), when (condition), and optional startImmediately flag
 * @returns A function to manually clear the interval
 * @example
 * const [isActive, setIsActive] = useState(false);
 * const clearInterval = useIntervalWhen(() => {
 *   console.log("Tick");
 * }, { ms: 1000, when: isActive, startImmediately: true });
 * // Clear the interval manually if needed
 * clearInterval();
 */
function useIntervalWhen(cb: () => void, options: UseIntervalWhenOptions): () => void {
  const { ms, when, startImmediately = false } = options;
  const idRef = useRef<NodeJS.Timeout | null>(null);
  const onTick = useEffectEvent(cb);
  const immediatelyCalledRef = useRef<boolean>(false);

  const handleClearInterval = useCallback((): void => {
    if (idRef.current !== null) {
      clearInterval(idRef.current);
      idRef.current = null;
    }
    immediatelyCalledRef.current = false;
  }, []);

  useEffect(() => {
    if (when === true) {
      idRef.current = setInterval(() => {
        onTick();
      }, ms);

      if (startImmediately === true && immediatelyCalledRef.current === false) {
        onTick();
        immediatelyCalledRef.current = true;
      }

      return handleClearInterval;
    }

    return undefined;
  }, [ms, when, startImmediately, handleClearInterval]);

  return handleClearInterval;
}

export default useIntervalWhen;
