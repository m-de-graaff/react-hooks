'use client';

import { useCallback, useEffect, useRef } from 'react';

export interface WarmupEndpoint {
  url: string;
  tags: string | string[];
  method?: 'GET' | 'POST' | 'HEAD' | 'OPTIONS';
  body?: unknown;
  headers?: Record<string, string>;
}

export interface UseCacheWarmupOptions {
  once?: boolean;
}

export type UseCacheWarmupReturn = () => Promise<void>;

/**
 * Warm up Next.js data cache tags by issuing fetch requests for specified endpoints.
 * @param endpoints - List of endpoints and associated cache tags to warm.
 * @param options - Optional configuration for warmup behavior.
 * @returns A manual trigger to execute the warmup on demand.
 * @example
 * const warm = useCacheWarmup([
 *   { url: '/api/posts', tags: 'posts' },
 *   { url: '/api/profile', tags: ['user', 'profile'] },
 * ]);
 * await warm();
 */
export function useCacheWarmup(
  endpoints: WarmupEndpoint[],
  options: UseCacheWarmupOptions = {},
): UseCacheWarmupReturn {
  const { once = true } = options;
  const hasRunRef = useRef(false);

  const warmup = useCallback(async (): Promise<void> => {
    if (!endpoints || endpoints.length === 0) return;

    const tasks = endpoints.map(
      async ({ url, tags, method = 'GET', body, headers }) => {
        const tagList = Array.isArray(tags) ? tags : [tags];
        const payload = body === undefined ? undefined : JSON.stringify(body);

        const init: RequestInit & { next?: { tags: string[] } } = { method };

        if (typeof window !== 'undefined') {
          init.next = { tags: tagList };
        }

        if (payload) {
          init.body = payload;
          init.headers = {
            'Content-Type': 'application/json',
            ...headers,
          };
        } else if (headers) {
          init.headers = headers;
        }

        try {
          await fetch(url, init);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn('[useCacheWarmup] Failed to warm', url, error);
        }
      },
    );

    await Promise.all(tasks);
  }, [endpoints]);

  useEffect(() => {
    if (once && hasRunRef.current) {
      return;
    }

    hasRunRef.current = true;
    void warmup();
  }, [once, warmup]);

  return warmup;
}

export default useCacheWarmup;

