'use client';
import { useCallback, useMemo, useReducer } from 'react';

interface HistoryState<T> {
  past: T[];
  present: T | null;
  future: T[];
}

type HistoryAction<T> =
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET'; newPresent: T }
  | { type: 'CLEAR'; initialPresent: T | null };

interface UseHistoryStateReturn<T> {
  state: T | null;
  canUndo: boolean;
  canRedo: boolean;
  set: (newPresent: T) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
}

function historyReducer<T>(
  state: HistoryState<T>,
  action: HistoryAction<T>
): HistoryState<T> {
  const { past, present, future } = state;

  switch (action.type) {
    case 'UNDO': {
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: present !== null ? [present, ...future] : future,
      };
    }

    case 'REDO': {
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: present !== null ? [...past, present] : past,
        present: next,
        future: newFuture,
      };
    }

    case 'SET': {
      const { newPresent } = action;
      if (newPresent === present) return state;
      return {
        past: present !== null ? [...past, present] : [],
        present: newPresent,
        future: [],
      };
    }

    case 'CLEAR': {
      return {
        past: [],
        present: action.initialPresent,
        future: [],
      };
    }

    default:
      throw new Error('Unsupported action type');
  }
}

/**
 * Hook to manage state with undo/redo history
 * @param initialPresent - The initial state value (defaults to null)
 * @returns An object containing the current state, undo/redo capabilities, and control functions
 * @example
 * const { state, canUndo, canRedo, set, undo, redo, clear } = useHistoryState(0);
 * set(1); // Sets state to 1
 * set(2); // Sets state to 2
 * undo(); // Reverts to 1
 * redo(); // Goes forward to 2
 * clear(); // Resets to initial value (0)
 */
function useHistoryState<T>(
  initialPresent: T | null = null
): UseHistoryStateReturn<T> {
  const [state, dispatch] = useReducer(historyReducer<T>, {
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = useMemo(() => state.past.length > 0, [state.past.length]);
  const canRedo = useMemo(() => state.future.length > 0, [state.future.length]);

  const set = useCallback(
    (newPresent: T): void => {
      dispatch({ type: 'SET', newPresent });
    },
    []
  );

  const undo = useCallback((): void => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback((): void => {
    dispatch({ type: 'REDO' });
  }, []);

  const clear = useCallback((): void => {
    dispatch({ type: 'CLEAR', initialPresent });
  }, [initialPresent]);

  return useMemo<UseHistoryStateReturn<T>>(
    () => ({
      state: state.present,
      canUndo,
      canRedo,
      set,
      undo,
      redo,
      clear,
    }),
    [state.present, canUndo, canRedo, set, undo, redo, clear]
  );
}

export default useHistoryState;
