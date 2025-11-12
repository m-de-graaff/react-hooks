'use client';
import { useEffect, useRef } from 'react';

/**
 * Hook to get the previous value of a variable
 * @param item - The current value to track
 * @returns The previous value of the item
 * @example
 * const [count, setCount] = useState(0);
 * const previousCount = usePrevious(count);
 * // previousCount will be the value of count from the previous render
 */
function usePrevious<T>(item: T): T | undefined {
  const previous = useRef<T | undefined>(undefined);

  useEffect(() => {
    previous.current = item;
  }, [item]);

  return previous.current;
}

export default usePrevious;
