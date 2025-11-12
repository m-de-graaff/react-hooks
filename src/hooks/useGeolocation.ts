'use client';
import { useEffect, useState } from 'react';

interface GeolocationState {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | Error | null;
}

/**
 * Hook to track device geolocation using the Geolocation API
 * @param options - Optional GeolocationPositionOptions (enableHighAccuracy, timeout, maximumAge)
 * @returns An object containing geolocation state (loading, coordinates, error, etc.)
 * @example
 * const { latitude, longitude, loading, error } = useGeolocation();
 * if (loading) return <div>Getting location...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * return <div>Lat: {latitude}, Lng: {longitude}</div>;
 */
function useGeolocation(options?: PositionOptions): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: new Error('Geolocation is not supported by this browser'),
      }));
      return;
    }

    let watchId: number | undefined;

    const onSuccess = (position: GeolocationPosition): void => {
      const { accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed } =
        position.coords;

      setState({
        loading: false,
        accuracy: accuracy ?? null,
        altitude: altitude ?? null,
        altitudeAccuracy: altitudeAccuracy ?? null,
        heading: heading ?? null,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        speed: speed ?? null,
        timestamp: position.timestamp,
        error: null,
      });
    };

    const onError = (error: GeolocationPositionError): void => {
      setState((prev) => ({
        ...prev,
        loading: false,
        error,
      }));
    };

    // Get initial position once
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    // Watch for changes in position
    watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);

    // Cleanup on unmount
    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [options]);

  return state;
}

export default useGeolocation;
