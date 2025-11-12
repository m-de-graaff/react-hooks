"use client"
import { useEffect, useRef, useEffectEvent } from "react";

/**
 * Hook to run a callback function at a specified interval
 * @param cb - The callback function to execute on each interval
 * @param ms - The interval duration in milliseconds
 * @returns A function to manually clear the interval
 * @example
 * const clearInterval = useInterval(() => {
 *   console.log("Tick");
 * }, 1000);
 * // Clear the interval manually if needed
 * clearInterval();
 */
function useInterval(cb: () => void, ms: number | null): () => void {
    const onTick = useEffectEvent(cb);
    const idRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (ms === null) {
            return;
        }

        idRef.current = setInterval(() => {
            onTick();
        }, ms);

        return () => {
            if (idRef.current !== null) {
                clearInterval(idRef.current);
            }
        };
    }, [ms]);

    return () => {
        if (idRef.current !== null) {
            clearInterval(idRef.current);
        }
    };
}

export default useInterval;
