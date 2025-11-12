'use client';
import { useSyncExternalStore } from 'react';

interface BatteryState {
  supported: boolean;
  loading: boolean;
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

const BATTERY_EVENTS = [
  'levelchange',
  'chargingchange',
  'chargingtimechange',
  'dischargingtimechange',
] as const;

const DEFAULT_STATE: BatteryState = {
  supported: false,
  loading: false,
  level: 1,
  charging: false,
  chargingTime: 0,
  dischargingTime: Infinity,
};

function createBatteryStore() {
  let state: BatteryState = {
    supported: true,
    loading: true,
    level: 1,
    charging: false,
    chargingTime: 0,
    dischargingTime: Infinity,
  };

  let battery: BatteryManager | null = null;
  const listeners = new Set<() => void>();

  const notify = (): void => {
    listeners.forEach((listener) => {
      listener();
    });
  };

  const updateState = (): void => {
    if (battery) {
      state = {
        supported: true,
        loading: false,
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
      };
    }
    notify();
  };

  const handleChange = (): void => {
    updateState();
  };

  const nav = navigator as NavigatorWithBattery;

  if (typeof navigator !== 'undefined' && nav.getBattery) {
    nav.getBattery().then((bat: BatteryManager) => {
      battery = bat;
      updateState();

      // Listen for battery property changes
      BATTERY_EVENTS.forEach((event) => {
        bat.addEventListener(event, handleChange);
      });
    });
  } else {
    state = DEFAULT_STATE;
  }

  return {
    subscribe: (callback: () => void): (() => void) => {
      listeners.add(callback);
      return () => {
        listeners.delete(callback);
      };
    },
    getSnapshot: (): BatteryState => state,
    cleanup: (): void => {
      const currentBattery = battery;
      if (currentBattery) {
        BATTERY_EVENTS.forEach((event) => {
          currentBattery.removeEventListener(event, handleChange);
        });
      }
      listeners.clear();
    },
  };
}

// Create a singleton store instance
let batteryStore: ReturnType<typeof createBatteryStore> | null = null;

function getBatteryStore() {
  if (!batteryStore) {
    batteryStore = createBatteryStore();
  }
  return batteryStore;
}

function snapshot(): BatteryState {
  return getBatteryStore().getSnapshot();
}

function subscribe(callback: () => void): () => void {
  return getBatteryStore().subscribe(callback);
}

/**
 * Hook to track device battery status using the Battery Status API
 * @returns An object containing battery information (supported, loading, level, charging, chargingTime, dischargingTime)
 * @example
 * const { level, charging, supported } = useBattery();
 * // Returns battery information if supported, otherwise returns default values
 */
function useBattery(): BatteryState {
  return useSyncExternalStore(subscribe, snapshot);
}

export default useBattery;
