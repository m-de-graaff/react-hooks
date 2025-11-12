'use client';
import { useSyncExternalStore } from 'react';

function snapshot(): string {
  return navigator.language;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('languagechange', callback);

  return () => {
    window.removeEventListener('languagechange', callback);
  };
}

/**
 * Hook to get the user's preferred language
 * @returns The user's preferred language string (e.g., "en-US", "fr-FR")
 * @example
 * const language = usePreferredLanguage();
 * // Returns the browser's preferred language
 */
function usePreferredLanguage(): string {
  return useSyncExternalStore(subscribe, snapshot);
}

export default usePreferredLanguage;
