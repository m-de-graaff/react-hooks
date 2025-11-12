"use client"
import { useEffect } from "react";

/**
 * Hook to set the document title
 * @param title - The title to set
 * @returns void
 * @example
 * useDocumentTitle("New Title");
 * return () => {
 *     useDocumentTitle("Old Title");
 * };
 */
function useDocumentTitle(title: string): void {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = title;

        return () => {
            document.title = previousTitle;
        };
    }, [title]);
}

export default useDocumentTitle;