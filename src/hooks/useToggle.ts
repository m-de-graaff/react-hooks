"use client"
import { useCallback, useState } from "react";

type UseToggleReturn = readonly [
    boolean,
    (value?: boolean) => void
];

/**
 * Hook to toggle a boolean value
 * @param initialValue - The initial value of the toggle (defaults to false)
 * @returns A tuple containing the current boolean value and a toggle function
 * @example
 * const [isToggled, toggle] = useToggle(false);
 * toggle(); // Toggles the value
 * toggle(true); // Sets to true
 * toggle(false); // Sets to false
 * toggle("test") // Sets to true
 */
function useToggle(initialValue: boolean = false): UseToggleReturn {
    const [isToggled, setIsToggled] = useState<boolean>(initialValue);

    const toggle = useCallback((value?: boolean): void => {
        if (value === undefined) {
            setIsToggled((prev) => !prev);
        } else {
            setIsToggled(value);
        }
    }, []);

    return [isToggled, toggle] as const;
}

export default useToggle;