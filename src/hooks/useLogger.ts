'use client';
import { useEffect, useEffectEvent, useRef } from 'react';

/**
 * Hook to log component lifecycle events (mounted, updated, unmounted) with optional additional values
 * @param name - The name/identifier for the component being logged
 * @param rest - Additional values to log along with the lifecycle events
 * @returns void
 * @example
 * useLogger('MyComponent', { count, name });
 * // Logs: "MyComponent mounted: [{ count: 0, name: 'John' }]"
 * // Logs: "MyComponent updated: [{ count: 1, name: 'John' }]"
 * // Logs: "MyComponent unmounted: [{ count: 1, name: 'John' }]"
 */
function useLogger(name: string, ...rest: unknown[]): void {
  const initialRenderRef = useRef<boolean>(true);

  const handleLog = useEffectEvent((event: string): void => {
    console.log(`${name} ${event}:`, rest);
  });

  useEffect(() => {
    if (initialRenderRef.current === false) {
      handleLog('updated');
    }
  });

  useEffect(() => {
    handleLog('mounted');
    initialRenderRef.current = false;

    return () => {
      handleLog('unmounted');
      initialRenderRef.current = true;
    };
  }, []);
}

export default useLogger;
