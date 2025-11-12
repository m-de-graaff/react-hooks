'use client';
import { useCallback, useState } from 'react';

interface UseCounterOptions {
  min?: number;
  max?: number;
}

interface UseCounterControls {
  increment: () => void;
  decrement: () => void;
  set: (value: number) => void;
  reset: () => void;
}

type UseCounterReturn = readonly [number, UseCounterControls];

/**
 * Hook to manage a counter with optional min/max bounds
 * @param startingValue - The initial value of the counter (defaults to 0)
 * @param options - Optional configuration object with min and/or max bounds
 * @returns A tuple containing the current count and control functions
 * @example
 * const [count, { increment, decrement, set, reset }] = useCounter(0, { min: 0, max: 10 });
 * increment(); // Increases count by 1 (respects max)
 * decrement(); // Decreases count by 1 (respects min)
 * set(5); // Sets count to 5 (respects min/max bounds)
 * reset(); // Resets count to startingValue
 */
function useCounter(
  startingValue: number = 0,
  options: UseCounterOptions = {}
): UseCounterReturn {
  const { min, max } = options;

  if (typeof min === 'number' && startingValue < min) {
    throw new Error(
      `Your starting value of ${startingValue} is less than your min of ${min}.`
    );
  }

  if (typeof max === 'number' && startingValue > max) {
    throw new Error(
      `Your starting value of ${startingValue} is greater than your max of ${max}.`
    );
  }

  const [count, setCount] = useState<number>(startingValue);

  const increment = useCallback((): void => {
    setCount((prev) => {
      if (typeof max === 'number' && prev >= max) return prev;
      return prev + 1;
    });
  }, [max]);

  const decrement = useCallback((): void => {
    setCount((prev) => {
      if (typeof min === 'number' && prev <= min) return prev;
      return prev - 1;
    });
  }, [min]);

  const set = useCallback((nextState: number): void => {
    setCount((prev) => {
      if (
        (typeof min === 'number' && nextState < min) ||
        (typeof max === 'number' && nextState > max)
      ) {
        return prev;
      }
      return nextState;
    });
  }, [min, max]);

  const reset = useCallback((): void => {
    setCount(startingValue);
  }, [startingValue]);

  return [
    count,
    {
      increment,
      decrement,
      set,
      reset,
    },
  ] as const;
}

export default useCounter;
