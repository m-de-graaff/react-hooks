'use client';
import { useLayoutEffect } from 'react';

/**
 * Hook to lock body scroll (prevent scrolling)
 * @returns void
 * @example
 * useLockBodyScroll();
 * // Body scroll is now locked
 * // Scroll is automatically restored when component unmounts
 */
function useLockBodyScroll(): void {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
}

export default useLockBodyScroll;
