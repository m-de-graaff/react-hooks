'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

export type CacheStatus = 'fresh' | 'stale' | 'expired' | 'unknown';

export interface UseCacheStatusOptions {
  interval?: number;
}

export interface UseCacheStatusReturn {
  status: CacheStatus;
  lastChecked: Date | null;
  refresh: () => Promise<void>;
}

/**
 * Hook to check and monitor a URL's cache freshness.
 * @param url - The target URL whose cache metadata should be inspected.
 * @param options - Optional polling configuration.
 * @returns An object containing the cache status, last checked timestamp, and manual refresh helper.
 * @example
 * const { status, lastChecked, refresh } = useCacheStatus('https://api.example.com/data', { interval: 60_000 });
 * if (status === 'stale') {
 *   await refresh();
 * }
 */
function useCacheStatus(
  url: string,
  options: UseCacheStatusOptions = {},
): UseCacheStatusReturn {
  const { interval = 0 } = options;
  const [status, setStatus] = useState<CacheStatus>('unknown');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkStatus = useCallback(async (): Promise<void> => {
    if (!url) {
      setStatus('unknown');
      setLastChecked(null);
      return;
    }

    try {
      const response = await fetch(url, { method: 'HEAD' });
      const staleHeader = response.headers.get('x-nextjs-stale-time');

      if (!staleHeader) {
        setStatus('unknown');
        return;
      }

      const staleTime = new Date(staleHeader).getTime();
      const now = Date.now();

      if (Number.isNaN(staleTime)) {
        setStatus('unknown');
        return;
      }

      const elapsed = now - staleTime;

      if (elapsed < 0) {
        setStatus('fresh');
      } else if (elapsed < 60_000) {
        setStatus('stale'); // Less than a minute old.
      } else {
        setStatus('expired');
      }
    } catch {
      setStatus('unknown');
    } finally {
      setLastChecked(new Date());
    }
  }, [url]);

  useEffect(() => {
    void checkStatus();

    if (interval > 0) {
      const id = setInterval(() => {
        void checkStatus();
      }, interval);

      return () => clearInterval(id);
    }

    return undefined;
  }, [checkStatus, interval]);

  return useMemo<UseCacheStatusReturn>(
    () => ({
      status,
      lastChecked,
      refresh: checkStatus,
    }),
    [status, lastChecked, checkStatus],
  );
}

export default useCacheStatus;

