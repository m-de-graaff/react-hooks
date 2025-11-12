'use client';
import {
  type ReactEventHandler,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
  useMemo,
  useRef,
} from 'react';

interface UseLongPressOptions {
  threshold?: number;
  onStart?: (event: ReactMouseEvent | ReactTouchEvent) => void;
  onFinish?: (event: ReactMouseEvent | ReactTouchEvent) => void;
  onCancel?: (event: ReactMouseEvent | ReactTouchEvent) => void;
}

interface LongPressHandlers {
  onMouseDown: ReactEventHandler;
  onMouseUp: ReactEventHandler;
  onMouseLeave: ReactEventHandler;
  onTouchStart: ReactEventHandler;
  onTouchEnd: ReactEventHandler;
}

export function isTouchEvent(event: { nativeEvent: Event }): boolean {
  if (typeof window === 'undefined') return false;
  return window.TouchEvent
    ? event.nativeEvent instanceof TouchEvent
    : 'touches' in event.nativeEvent;
}

export function isMouseEvent(event: { nativeEvent: Event }): boolean {
  return event.nativeEvent instanceof MouseEvent;
}

/**
 * Hook to detect long press gestures on mouse and touch events
 * @param callback - The callback function to execute when long press is detected
 * @param options - Optional configuration object with threshold (ms), onStart, onFinish, and onCancel callbacks
 * @returns An object containing event handlers to attach to DOM elements
 * @example
 * const handlers = useLongPress(() => {
 *   console.log('Long press detected!');
 * }, { threshold: 500 });
 * return <button {...handlers}>Press and hold</button>;
 */
function useLongPress(
  callback: (event: ReactMouseEvent | ReactTouchEvent) => void,
  options: UseLongPressOptions = {}
): LongPressHandlers {
  const { threshold = 400, onStart, onFinish, onCancel } = options;
  const isLongPressActive = useRef<boolean>(false);
  const isPressed = useRef<boolean>(false);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  return useMemo(() => {
    if (typeof callback !== 'function') {
      return {
        onMouseDown: () => {},
        onMouseUp: () => {},
        onMouseLeave: () => {},
        onTouchStart: () => {},
        onTouchEnd: () => {},
      };
    }

    const start = (event: ReactMouseEvent | ReactTouchEvent): void => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return;

      onStart?.(event);

      isPressed.current = true;
      timerId.current = setTimeout(() => {
        callback(event);
        isLongPressActive.current = true;
      }, threshold);
    };

    const cancel = (event: ReactMouseEvent | ReactTouchEvent): void => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return;

      if (isLongPressActive.current) {
        onFinish?.(event);
      } else if (isPressed.current) {
        onCancel?.(event);
      }

      isLongPressActive.current = false;
      isPressed.current = false;

      if (timerId.current !== null) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
    };

    const mouseHandlers: Pick<LongPressHandlers, 'onMouseDown' | 'onMouseUp' | 'onMouseLeave'> = {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
    };

    const touchHandlers: Pick<LongPressHandlers, 'onTouchStart' | 'onTouchEnd'> = {
      onTouchStart: start,
      onTouchEnd: cancel,
    };

    return {
      ...mouseHandlers,
      ...touchHandlers,
    };
  }, [callback, threshold, onCancel, onFinish, onStart]);
}

export default useLongPress;
