'use client';
import { useCallback, useEffect, useState } from 'react';

interface UseDefaultOptions<T> {
  initialValue: T | null | undefined;
  defaultValue: T;
}

type UseDefaultReturn<T> = readonly [T, (value: T) => void];

/**
 * Hook to set a default value for a component
 * @param {UseDefaultOptions<T>} options - The options for the hook
 * @returns {UseDefaultReturn<T>} - The value and the update function
 * @example
 * const [value, updateValue] = useDefault({ initialValue: null, defaultValue: "Default Value" });
 * updateValue("New Value");
 * return () => {
 *     updateValue(null);
 * };
 */
function useDefault<T>({ initialValue, defaultValue }: UseDefaultOptions<T>): UseDefaultReturn<T> {
  const [value, setValue] = useState<T>(() => {
    return initialValue ?? defaultValue;
  });

  useEffect(() => {
    if (value === undefined || value === null) {
      setValue(defaultValue);
    }
  }, [value, defaultValue]);

  const updateValue = useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  return [value, updateValue] as const;
}

export default useDefault;
