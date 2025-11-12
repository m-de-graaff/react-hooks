'use client';
import { useEffect, useState } from 'react';

/**
 * Hook to detect if the code is running on the client side (browser) vs server side
 * @returns true if running on the client, false on the server
 * @example
 * const isClient = useIsClient();
 * if (!isClient) return null; // Skip rendering on server
 * return <div>Client-only content</div>;
 */
function useIsClient(): boolean {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

export default useIsClient;
