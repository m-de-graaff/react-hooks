'use client';
import { useCallback, useState } from 'react';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

type UseObjectStateReturn<T extends Record<string, unknown>> = readonly [
  T,
  (value: Partial<T> | ((prev: T) => Partial<T>)) => void
];

/**
 * Hook to manage object state with automatic merging (similar to React class component setState)
 * @param initialValue - The initial object state (defaults to empty object)
 * @returns A tuple containing the current state and an update function
 * @example
 * const [state, updateState] = useObjectState({ name: 'John', age: 30 });
 * updateState({ age: 31 }); // Merges with previous state: { name: 'John', age: 31 }
 * updateState((prev) => ({ age: prev.age + 1 })); // Functional updater form
 */
function useObjectState<T extends Record<string, unknown>>(
  initialValue: T = {} as T
): UseObjectStateReturn<T> {
  const [state, setState] = useState<T>(initialValue);

  const updateState = useCallback(
    (value: Partial<T> | ((prev: T) => Partial<T>)): void => {
      setState((prev) => {
        const nextValue = typeof value === 'function' ? value(prev) : value;

        // Ignore non-plain objects
        if (!isPlainObject(nextValue)) return prev;

        // Merge new values with previous state
        return { ...prev, ...nextValue };
      });
    },
    []
  );

  return [state, updateState] as const;
}

export default useObjectState;
