'use client';
import { useCallback, useEffect, useState } from 'react';

interface NetworkInformation extends EventTarget {
  readonly downlink?: number;
  readonly downlinkMax?: number;
  readonly effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
  readonly rtt?: number;
  readonly saveData?: boolean;
  readonly type?:
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'none'
    | 'wifi'
    | 'wimax'
    | 'other'
    | 'unknown';
  addEventListener(type: 'change', listener: () => void): void;
  removeEventListener(type: 'change', listener: () => void): void;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

interface NetworkState {
  online: boolean;
  downlink: number | null;
  downlinkMax: number | null;
  effectiveType: '2g' | '3g' | '4g' | 'slow-2g' | null;
  rtt: number | null;
  saveData: boolean | null;
  type:
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'none'
    | 'wifi'
    | 'wimax'
    | 'other'
    | 'unknown'
    | null;
}

function isShallowEqual(object1: NetworkState, object2: NetworkState): boolean {
  const keys1 = Object.keys(object1) as Array<keyof NetworkState>;
  const keys2 = Object.keys(object2) as Array<keyof NetworkState>;

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (object1[key] !== object2[key]) return false;
  }

  return true;
}

function getConnection(): NetworkInformation | undefined {
  if (typeof navigator === 'undefined') return undefined;
  const nav = navigator as NavigatorWithConnection;
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
}

/**
 * Hook to track network connection state and information
 * @returns An object containing network state (online, downlink, effectiveType, rtt, saveData, type)
 * @example
 * const { online, effectiveType, downlink } = useNetworkState();
 * if (!online) return <div>You are offline</div>;
 * return <div>Connection: {effectiveType} ({downlink} Mbps)</div>;
 */
function useNetworkState(): NetworkState {
  const getNetworkState = useCallback((): NetworkState => {
    if (typeof navigator === 'undefined') {
      return {
        online: false,
        downlink: null,
        downlinkMax: null,
        effectiveType: null,
        rtt: null,
        saveData: null,
        type: null,
      };
    }

    const connection = getConnection();
    return {
      online: navigator.onLine,
      downlink: connection?.downlink ?? null,
      downlinkMax: connection?.downlinkMax ?? null,
      effectiveType: connection?.effectiveType ?? null,
      rtt: connection?.rtt ?? null,
      saveData: connection?.saveData ?? null,
      type: connection?.type ?? null,
    };
  }, []);

  const [state, setState] = useState<NetworkState>(getNetworkState);

  useEffect(() => {
    const updateNetworkState = (): void => {
      setState((prev) => {
        const next = getNetworkState();
        return isShallowEqual(prev, next) ? prev : next;
      });
    };

    // Add window online/offline listeners
    window.addEventListener('online', updateNetworkState);
    window.addEventListener('offline', updateNetworkState);

    // Add connection change listener if supported
    const connection = getConnection();
    if (connection?.addEventListener) {
      connection.addEventListener('change', updateNetworkState);
    }

    // Initial state sync
    updateNetworkState();

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('online', updateNetworkState);
      window.removeEventListener('offline', updateNetworkState);
      if (connection?.removeEventListener) {
        connection.removeEventListener('change', updateNetworkState);
      }
    };
  }, [getNetworkState]);

  return state;
}

export default useNetworkState;
