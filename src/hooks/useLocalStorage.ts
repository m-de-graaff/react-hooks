'use client';
import { useCallback, useEffect, useSyncExternalStore } from 'react';

type SetValue<T> = T | ((prevValue: T) => T);

function dispatchStorageEvent(key: string, newValue: string | null): void {
  window.dispatchEvent(new StorageEvent('storage', { key, newValue }));
}

function setItem<T>(key: string, value: T): void {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
}

function removeItem(key: string): void {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
}

function getItem(key: string): string | null {
  return window.localStorage.getItem(key);
}

// Subscribe to "storage" events for reactivity
function subscribe(callback: () => void): () => void {
  const handle = (event: StorageEvent): void => {
    if (event.key === null || event.key === undefined) return;
    callback();
  };
  window.addEventListener('storage', handle);
  return () => {
    window.removeEventListener('storage', handle);
  };
}

function getServerSnapshot(): never {
  throw Error('useLocalStorage is a client-only hook');
}

/**
 * Hook to manage localStorage with React state synchronization
 * @param key - The localStorage key to manage
 * @param initialValue - The initial value if the key doesn't exist
 * @returns A tuple containing the current value and a setter function
 * @example
 * const [value, setValue] = useLocalStorage('myKey', 'default');
 * setValue('new value'); // Updates localStorage and state
 * setValue((prev) => prev + ' updated'); // Functional updater form
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T
): readonly [T, (value: SetValue<T>) => void] {
  // Ensure initial localStorage value exists if defined
  useEffect(() => {
    const existing = getItem(key);
    if (existing === null && initialValue !== undefined) {
      setItem(key, initialValue);
    }
  }, [key, initialValue]);

  const getSnapshot = useCallback((): string | null => {
    return getItem(key);
  }, [key]);

  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setState = useCallback(
    (value: SetValue<T>): void => {
      const prev = store ? (JSON.parse(store) as T) : initialValue;
      const newValue = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;

      if (newValue === undefined || newValue === null) {
        removeItem(key);
      } else {
        setItem(key, newValue);
      }
    },
    [key, store, initialValue]
  );

  return [store ? (JSON.parse(store) as T) : initialValue, setState] as const;
}

export default useLocalStorage;
