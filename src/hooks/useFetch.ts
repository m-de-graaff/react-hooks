'use client';
import { useEffect, useEffectEvent, useReducer, useRef } from 'react';

interface FetchState<T> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
}

type FetchAction<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

function fetchReducer<T>(state: FetchState<T>, action: FetchAction<T>): FetchState<T> {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true, error: undefined };
    case 'fetched':
      return { ...state, loading: false, data: action.payload, error: undefined };
    case 'error':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

/**
 * Hook to fetch data from a URL with caching and error handling
 * @param url - The URL to fetch from (string or null/undefined to skip)
 * @param options - Optional fetch options (RequestInit)
 * @returns An object containing data, error, and loading state
 * @example
 * const { data, error, loading } = useFetch('https://api.example.com/data');
 * if (loading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * return <div>{JSON.stringify(data)}</div>;
 */
function useFetch<T = unknown>(
  url: string | null | undefined,
  options?: RequestInit
): FetchState<T> {
  const cacheRef = useRef<Record<string, T>>({});

  const [state, dispatch] = useReducer(fetchReducer<T>, {
    data: undefined,
    error: undefined,
    loading: false,
  });

  const onFetch = useEffectEvent((fetchUrl: string): Promise<Response> => {
    return fetch(fetchUrl, options);
  });

  useEffect(() => {
    if (typeof url !== 'string' || !url) return;

    let ignore = false;

    const fetchData = async (): Promise<void> => {
      const cachedResponse = cacheRef.current[url];

      if (cachedResponse) {
        dispatch({ type: 'fetched', payload: cachedResponse });
        return;
      }

      dispatch({ type: 'loading' });

      try {
        const res = await onFetch(url);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const json = (await res.json()) as T;
        cacheRef.current[url] = json;

        if (ignore === false) {
          dispatch({ type: 'fetched', payload: json });
        }
      } catch (e) {
        if (ignore === false) {
          const error = e instanceof Error ? e : new Error(String(e));
          dispatch({ type: 'error', payload: error });
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return state;
}

export default useFetch;
