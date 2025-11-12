'use client';
import { type RefObject, useEffect, useEffectEvent, useRef } from 'react';

/**
 * Hook to detect clicks outside of an element
 * @param callback - The callback function to execute when a click occurs outside the element
 * @returns A ref to attach to the element you want to detect clicks outside of
 * @example
 * const ref = useClickAway((event) => {
 *   console.log('Clicked outside!', event);
 * });
 * return <div ref={ref}>Click outside me</div>;
 */
function useClickAway(
  callback: (event: MouseEvent | TouchEvent) => void
): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement>(null);
  const onClick = useEffectEvent(callback);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent): void => {
      const el = ref.current;
      if (!el) return;

      // Call callback only if the click is outside the element
      if (event.target instanceof Node && !el.contains(event.target)) {
        onClick(event);
      }
    };

    // Use mousedown for better test and UX reliability
    document.addEventListener('mousedown', handlePointerDown, true);
    document.addEventListener('touchstart', handlePointerDown, true);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown, true);
      document.removeEventListener('touchstart', handlePointerDown, true);
    };
  }, []);

  return ref;
}

export default useClickAway;
