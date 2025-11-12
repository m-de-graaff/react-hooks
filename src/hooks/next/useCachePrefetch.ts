'use client';

import type { RefObject } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export interface UseCachePrefetchOptions {
  onVisible?: boolean;
  onHover?: boolean;
  threshold?: number;
  onPrefetch?: (href: string) => void;
}

export type UseCachePrefetchReturn = RefObject<HTMLElement | null>;

/**
 * Hook to prefetch a URL when it becomes visible or hovered over.
 * @param href - The URL to prefetch.
 * @param options - Optional configuration options.
 * @returns A ref to attach to the DOM element.
 * @example
 * const elementRef = useCachePrefetch('https://example.com');
 * return <div ref={elementRef}>Hover over me to prefetch!</div>;
 */
function useCachePrefetch(
  href: string,
  {
    onVisible = false,
    onHover = false,
    threshold = 0.2,
    onPrefetch,
  }: UseCachePrefetchOptions = {}
): UseCachePrefetchReturn {
  const router = useRouter();
  const prefetched = useRef(false);
  const elementRef = useRef<HTMLElement | null>(null);

  const prefetch = useCallback(async (): Promise<void> => {
    if (prefetched.current) return;

    try {
      await router.prefetch(href);
      prefetched.current = true;
      onPrefetch?.(href);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('[useCachePrefetch] Failed to prefetch', href, error);
    }
  }, [href, onPrefetch, router]);

  useEffect(() => {
    const element = elementRef.current;
    if (!onHover || !element) return;

    const handleEnter = () => {
      void prefetch();
    };

    element.addEventListener('mouseenter', handleEnter);
    element.addEventListener('focus', handleEnter);

    return () => {
      element.removeEventListener('mouseenter', handleEnter);
      element.removeEventListener('focus', handleEnter);
    };
  }, [onHover, prefetch]);

  useEffect(() => {
    const element = elementRef.current;
    if (!onVisible || !element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void prefetch();
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [onVisible, threshold, prefetch]);

  return elementRef;
}

export default useCachePrefetch;
