'use client';
import { useEffect } from 'react';

/**
 * Hook to set the favicon of the document
 * @param url - The URL of the favicon to set
 * @returns void
 * @example
 * useFavicon("/favicon.ico");
 * return () => {
 *     useFavicon("/old-favicon.ico");
 * };
 */
function useFavicon(url: string): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const link =
      (window.document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
      (window.document.createElement('link') as HTMLLinkElement);
    link.rel = 'shortcut icon';
    link.href = url;

    window.document.getElementsByTagName('head')[0].appendChild(link);
  }, [url]);
}

export default useFavicon;
