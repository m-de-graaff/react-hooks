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

function mapNextCacheHeader(header: string | null): CacheStatus | null {
  if (!header) return null;

  const normalized = header.trim().toUpperCase();

  switch (normalized) {
    case 'HIT':
      return 'fresh';
    case 'STALE':
      return 'stale';
    case 'MISS':
    case 'REVALIDATED':
      return 'expired';
    case 'BYPASS':
      return 'unknown';
    default:
      return null;
  }
}

function mapFromStaleTime(staleHeader: string | null): CacheStatus | null {
  if (!staleHeader) return null;

  const staleTime = new Date(staleHeader).getTime();
  if (Number.isNaN(staleTime)) {
    return null;
  }

  const elapsed = Date.now() - staleTime;

  if (elapsed < 0) {
    return 'fresh';
  }

  if (elapsed < 60_000) {
    return 'stale';
  }

  return 'expired';
}

function mapFromCacheControl(
  cacheControl: string | null,
  ageHeader: string | null,
): CacheStatus | null {
  if (!cacheControl) return null;

  const maxAgeMatch = cacheControl.match(/max-age=(\d+)/i);
  if (!maxAgeMatch) return null;

  const maxAge = Number.parseInt(maxAgeMatch[1] ?? '', 10);
  if (!Number.isFinite(maxAge)) return null;

  const age = Number.parseInt(ageHeader ?? '', 10);
  if (!Number.isFinite(age)) {
    return maxAge > 0 ? 'fresh' : 'expired';
  }

  if (age < maxAge) {
    return 'fresh';
  }

  if (age - maxAge < 60) {
    return 'stale';
  }

  return 'expired';
}

/**
 * Hook to check and monitor a URL's cache freshness.
 * Requires same-origin URLs (or a proxied endpoint) so that cache headers are visible.
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

    if (typeof window !== 'undefined') {
      try {
        const target = new URL(url, window.location.href);
        if (target.origin !== window.location.origin) {
          // CORS will hide cache headers; prefer server proxy.
          setStatus('unknown');
          setLastChecked(new Date());
          return;
        }
      } catch {
        setStatus('unknown');
        setLastChecked(new Date());
        return;
      }
    }

    try {
      const response = await fetch(url, { method: 'GET', cache: 'no-store' });

      const { body } = response;
      if (body) {
        try {
          await body.cancel();
        } catch {
          // Ignored: best effort cancellation.
        }
      }

      const nextCacheStatus = mapNextCacheHeader(
        response.headers.get('x-nextjs-cache'),
      );
      if (nextCacheStatus) {
        setStatus(nextCacheStatus);
        return;
      }

      const staleStatus = mapFromStaleTime(
        response.headers.get('x-nextjs-stale-time'),
      );
      if (staleStatus) {
        setStatus(staleStatus);
        return;
      }

      const cacheControlStatus = mapFromCacheControl(
        response.headers.get('cache-control'),
        response.headers.get('age'),
      );
      if (cacheControlStatus) {
        setStatus(cacheControlStatus);
        return;
      }

      setStatus('unknown');
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

