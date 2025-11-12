'use client';
import { useEffect, useEffectEvent } from 'react';

type EventTarget =
  | HTMLElement
  | Window
  | Document
  | MediaQueryList
  | { current: HTMLElement | Window | Document | MediaQueryList | null }
  | (() => HTMLElement | Window | Document | MediaQueryList | null);

/**
 * Hook to add an event listener to a DOM element, window, or document
 * @param target - The target element, ref, or function that returns an element
 * @param eventName - The name of the event to listen to
 * @param handler - The event handler function
 * @param options - Optional event listener options (capture, once, passive, etc.)
 * @returns void
 * @example
 * useEventListener(window, 'resize', (event) => {
 *   console.log('Window resized', event);
 * });
 *
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * useEventListener(buttonRef, 'click', (event) => {
 *   console.log('Button clicked', event);
 * });
 */
function useEventListener<T extends EventTarget>(
  target: T | null | undefined,
  eventName: string,
  handler: (event: Event) => void,
  options?: boolean | AddEventListenerOptions
): void {
  const onEvent = useEffectEvent(handler);

  useEffect(() => {
    if (!target || !eventName) return;

    // Determine the actual element (handle refs and direct elements)
    const rawElement =
      typeof target === 'function' ? target() : 'current' in target ? target.current : target;

    if (!rawElement) return;

    // Type guard to ensure element has addEventListener
    const element = rawElement as HTMLElement | Window | Document | MediaQueryList;

    if (typeof element.addEventListener !== 'function') return;

    const listener = (event: Event): void => {
      onEvent(event);
    };

    element.addEventListener(eventName, listener, options);

    return () => {
      element.removeEventListener(eventName, listener, options);
    };
  }, [target, eventName, options]);
}

export default useEventListener;
