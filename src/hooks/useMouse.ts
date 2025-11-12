'use client';
import { type RefObject, useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
  elementX: number;
  elementY: number;
  elementPositionX: number;
  elementPositionY: number;
}

type UseMouseReturn = readonly [MousePosition, RefObject<HTMLElement | null>];

/**
 * Hook to track mouse position relative to the document and optionally an element
 * @returns A tuple containing the mouse position state and a ref to attach to an element
 * @example
 * const [mouse, ref] = useMouse();
 * // mouse.x, mouse.y - mouse position relative to document
 * // mouse.elementX, mouse.elementY - mouse position relative to element (when ref is attached)
 * // mouse.elementPositionX, mouse.elementPositionY - element position relative to document
 * return <div ref={ref}>Mouse at: {mouse.elementX}, {mouse.elementY}</div>;
 */
function useMouse(): UseMouseReturn {
  const [state, setState] = useState<MousePosition>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  });

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      const { clientX, clientY } = event;

      // Default values (document-relative only)
      let newState: MousePosition = {
        x: clientX,
        y: clientY,
        elementX: 0,
        elementY: 0,
        elementPositionX: 0,
        elementPositionY: 0,
      };

      const element = ref.current;
      if (element) {
        const rect = element.getBoundingClientRect();

        newState = {
          x: clientX,
          y: clientY,
          elementX: clientX - rect.left,
          elementY: clientY - rect.top,
          elementPositionX: rect.left + window.scrollX,
          elementPositionY: rect.top + window.scrollY,
        };
      }

      setState(newState);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return [state, ref] as const;
}

export default useMouse;
