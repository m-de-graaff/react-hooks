'use client';
import { useCallback, useMemo, useReducer, useRef } from 'react';

interface UseQueueReturn<T> {
  add: (item: T) => void;
  remove: () => T | undefined;
  clear: () => void;
  first: T | null;
  last: T | null;
  size: number;
  queue: readonly T[];
}

type QueueAction<T> = { type: 'add'; item: T } | { type: 'remove' } | { type: 'clear' };

function queueReducer<T>(state: T[], action: QueueAction<T>): T[] {
  switch (action.type) {
    case 'add':
      return [...state, action.item];
    case 'remove':
      if (state.length === 0) return state;
      return state.slice(1);
    case 'clear':
      return [];
    default:
      return state;
  }
}

/**
 * Hook to manage a queue data structure
 * @param initialValue - The initial array of items in the queue (defaults to empty array)
 * @returns An object containing queue operations and state
 * @example
 * const { add, remove, clear, first, last, size, queue } = useQueue([1, 2, 3]);
 * add(4); // Adds 4 to the end of the queue
 * const item = remove(); // Removes and returns the first item (1)
 * clear(); // Clears the queue
 */
function useQueue<T>(initialValue: T[] = []): UseQueueReturn<T> {
  const [queue, dispatch] = useReducer(queueReducer<T>, initialValue);
  const queueRef = useRef(queue);

  // Keep ref in sync with state
  queueRef.current = queue;

  const add = useCallback((item: T): void => {
    dispatch({ type: 'add', item });
  }, []);

  const remove = useCallback((): T | undefined => {
    const currentQueue = queueRef.current;
    if (currentQueue.length === 0) return undefined;
    const first = currentQueue[0];
    dispatch({ type: 'remove' });
    return first;
  }, []);

  const clear = useCallback((): void => {
    dispatch({ type: 'clear' });
  }, []);

  const first = useMemo(() => queue[0] ?? null, [queue]);
  const last = useMemo(
    () => (queue.length > 0 ? (queue[queue.length - 1] ?? null) : null),
    [queue]
  );
  const size = useMemo(() => queue.length, [queue]);

  return useMemo(
    () => ({
      add,
      remove,
      clear,
      first,
      last,
      size,
      queue,
    }),
    [add, remove, clear, first, last, size, queue]
  ) as UseQueueReturn<T>;
}

export default useQueue;
