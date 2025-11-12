'use client';
import { useEffect, useEffectEvent } from 'react';

/**
 * Hook to detect when the mouse leaves the page/document window
 * @param callback - The callback function to execute when the mouse leaves the page
 * @returns void
 * @example
 * usePageLeave((event) => {
 *   console.log('Mouse left the page!', event);
 * });
 */
function usePageLeave(callback: (event: MouseEvent) => void): void {
  const onLeave = useEffectEvent(callback);

  useEffect(() => {
    const handleMouseOut = (event: MouseEvent): void => {
      // Only trigger when leaving the document window entirely
      if (!event.relatedTarget && !(event as MouseEvent & { toElement?: Element }).toElement) {
        onLeave(event);
      }
    };

    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);
}

export default usePageLeave;
