'use client';
import { useEffect, useEffectEvent } from 'react';

type KeyPressTarget =
  | HTMLElement
  | Window
  | Document
  | { current: HTMLElement | Window | Document | null }
  | null;

interface UseKeyPressOptions {
  event?: 'keydown' | 'keyup' | 'keypress';
  target?: KeyPressTarget;
  eventOptions?: boolean | AddEventListenerOptions;
}

/**
 * Hook to detect when a specific key is pressed
 * @param key - The key to listen for (e.g., "Enter", "Escape", "a")
 * @param callback - The callback function to execute when the key is pressed
 * @param options - Optional configuration object with event type, target element, and event listener options
 * @returns void
 * @example
 * useKeyPress('Enter', (event) => {
 *   console.log('Enter key pressed!', event);
 * });
 *
 * useKeyPress('Escape', (event) => {
 *   console.log('Escape key pressed!', event);
 * }, { event: 'keyup', target: document });
 */
function useKeyPress(
  key: string,
  callback: (event: KeyboardEvent) => void,
  options: UseKeyPressOptions = {}
): void {
  const {
    event = 'keydown',
    target = typeof window !== 'undefined' ? window : null,
    eventOptions,
  } = options;

  const onKey = useEffectEvent(callback);

  useEffect(() => {
    if (!target) return;

    // Determine the actual element (handle refs and direct elements)
    const rawElement = 'current' in target && target.current !== null ? target.current : target;

    if (!rawElement) return;

    // Type guard to ensure element has addEventListener
    const element = rawElement as HTMLElement | Window | Document;

    if (typeof element.addEventListener !== 'function') return;

    const handle = (e: KeyboardEvent): void => {
      if (e.key === key) {
        onKey(e);
      }
    };

    element.addEventListener(event, handle as EventListener, eventOptions);

    return () => {
      element.removeEventListener(event, handle as EventListener, eventOptions);
    };
  }, [key, event, target, eventOptions]);
}

export default useKeyPress;
