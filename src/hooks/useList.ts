'use client';
import { useCallback, useMemo, useReducer } from 'react';

interface UseListControls<T> {
  set: (newList: T[] | T) => void;
  push: (...items: T[]) => void;
  removeAt: (index: number) => void;
  insertAt: (index: number, item: T) => void;
  updateAt: (index: number, item: T) => void;
  clear: () => void;
}

type UseListReturn<T> = readonly [readonly T[], UseListControls<T>];

type ListAction<T> =
  | { type: 'set'; payload: T[] }
  | { type: 'push'; payload: T[] }
  | { type: 'removeAt'; payload: number }
  | { type: 'insertAt'; payload: { index: number; item: T } }
  | { type: 'updateAt'; payload: { index: number; item: T } }
  | { type: 'clear' };

function listReducer<T>(state: T[], action: ListAction<T>): T[] {
  switch (action.type) {
    case 'set':
      return action.payload;
    case 'push':
      return [...state, ...action.payload];
    case 'removeAt':
      return state.filter((_, i) => i !== action.payload);
    case 'insertAt': {
      const next = [...state];
      next.splice(action.payload.index, 0, action.payload.item);
      return next;
    }
    case 'updateAt': {
      if (action.payload.index < 0 || action.payload.index >= state.length) {
        return state;
      }
      const next = [...state];
      next[action.payload.index] = action.payload.item;
      return next;
    }
    case 'clear':
      return [];
    default:
      return state;
  }
}

/**
 * Hook to manage a list/array with various operations
 * @param defaultList - The initial array of items (defaults to empty array)
 * @returns A tuple containing the current list and control functions
 * @example
 * const [list, { set, push, removeAt, insertAt, updateAt, clear }] = useList([1, 2, 3]);
 * push(4, 5); // Adds 4 and 5 to the end
 * removeAt(0); // Removes item at index 0
 * insertAt(1, 99); // Inserts 99 at index 1
 * updateAt(0, 100); // Updates item at index 0 to 100
 * clear(); // Clears the list
 */
function useList<T>(defaultList: T[] = []): UseListReturn<T> {
  const [list, dispatch] = useReducer(listReducer<T>, defaultList);

  const set = useCallback((newList: T[] | T): void => {
    dispatch({
      type: 'set',
      payload: Array.isArray(newList) ? newList : [newList],
    });
  }, []);

  const push = useCallback((...items: T[]): void => {
    dispatch({ type: 'push', payload: items });
  }, []);

  const removeAt = useCallback((index: number): void => {
    dispatch({ type: 'removeAt', payload: index });
  }, []);

  const insertAt = useCallback((index: number, item: T): void => {
    dispatch({ type: 'insertAt', payload: { index, item } });
  }, []);

  const updateAt = useCallback((index: number, item: T): void => {
    dispatch({ type: 'updateAt', payload: { index, item } });
  }, []);

  const clear = useCallback((): void => {
    dispatch({ type: 'clear' });
  }, []);

  const controls = useMemo<UseListControls<T>>(
    () => ({
      set,
      push,
      removeAt,
      insertAt,
      updateAt,
      clear,
    }),
    [set, push, removeAt, insertAt, updateAt, clear]
  );

  return [list, controls] as const;
}

export default useList;
