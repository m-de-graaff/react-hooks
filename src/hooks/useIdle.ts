'use client';
import { useEffect, useRef, useState } from 'react';

function throttle(cb: () => void, ms: number): () => void {
  let lastTime = 0;
  return (): void => {
    const now = Date.now();
    if (now - lastTime >= ms) {
      cb();
      lastTime = now;
    }
  };
}

/**
 * Hook to detect if the user is idle (no activity for a specified duration)
 * @param ms - The idle timeout in milliseconds (defaults to 20000ms / 20 seconds)
 * @returns true if the user is idle, false if active
 * @example
 * const isIdle = useIdle(30000);
 * // Returns true when user has been inactive for 30 seconds
 * // Listens to: mousemove, mousedown, resize, keydown, touchstart, wheel, and visibilitychange events
 */
function useIdle(ms: number = 1000 * 20): boolean {
  const [idle, setIdle] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleTimeout = (): void => {
      setIdle(true);
    };

    const handleEvent = throttle(() => {
      setIdle(false);

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(handleTimeout, ms);
    }, 500);

    const handleVisibilityChange = (): void => {
      if (!document.hidden) {
        handleEvent();
      }
    };

    timeoutRef.current = setTimeout(handleTimeout, ms);

    window.addEventListener('mousemove', handleEvent);
    window.addEventListener('mousedown', handleEvent);
    window.addEventListener('resize', handleEvent);
    window.addEventListener('keydown', handleEvent);
    window.addEventListener('touchstart', handleEvent);
    window.addEventListener('wheel', handleEvent);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', handleEvent);
      window.removeEventListener('mousedown', handleEvent);
      window.removeEventListener('resize', handleEvent);
      window.removeEventListener('keydown', handleEvent);
      window.removeEventListener('touchstart', handleEvent);
      window.removeEventListener('wheel', handleEvent);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [ms]);

  return idle;
}

export default useIdle;
