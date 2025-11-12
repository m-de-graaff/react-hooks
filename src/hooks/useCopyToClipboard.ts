'use client';
import { useCallback, useState } from 'react';

type UseCopyToClipboardReturn = readonly [string | null, (text: string) => Promise<void>];

function oldSchoolCopy(text: string): void {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
}

async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    oldSchoolCopy(text);
  }
}

/**
 * Hook to copy text to clipboard
 * @returns A tuple containing the copied text (or null) and a function to copy text
 * @example
 * const [copiedText, copyToClipboard] = useCopyToClipboard();
 * await copyToClipboard("Hello World");
 * // copiedText will be "Hello World" after successful copy
 */
function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string): Promise<void> => {
    try {
      await copyText(text);
      setCopiedText(text);
    } catch {
      setCopiedText(null);
    }
  }, []);

  return [copiedText, copyToClipboard] as const;
}

export default useCopyToClipboard;
