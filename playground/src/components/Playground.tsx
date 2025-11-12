import * as React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
// Import hooks directly from source
import {
  useBattery,
  useClickAway,
  useContinuousRetry,
  useCopyToClipboard,
  useCountdown,
  useCounter,
  useDebounce,
  useDefault,
  useDocumentTitle,
  useEventListener,
  useFavicon,
  useFetch,
  useGeolocation,
  useHistoryState,
  useIdle,
  useInterval,
  useIntervalWhen,
  useIsClient,
  useKeyPress,
  useList,
  useLocalStorage,
  useLockBodyScroll,
  useLogger,
  useLongPress,
  useMediaQuery,
  useMouse,
  useNetworkState,
  useObjectState,
  useOrientation,
  usePageLeave,
  usePreferredLanguage,
  usePrevious,
  useQueue,
  useRandomInterval,
  useSessionStorage,
  useThrottle,
  useTimeout,
  useToggle,
  useVisibilityChange,
  useWindowScroll,
  useWindowSize,
} from '../../../src/hooks';
import './Playground.css';

interface PlaygroundProps {
  code: string;
  scope?: Record<string, unknown>;
}

export default function Playground({ code, scope = {} }: PlaygroundProps) {
  const defaultScope = {
    React,
    useBattery,
    useClickAway,
    useContinuousRetry,
    useCopyToClipboard,
    useCounter,
    useCountdown,
    useDebounce,
    useDefault,
    useDocumentTitle,
    useEventListener,
    useFavicon,
    useFetch,
    useGeolocation,
    useHistoryState,
    useIdle,
    useInterval,
    useIntervalWhen,
    useIsClient,
    useKeyPress,
    useList,
    useLocalStorage,
    useLockBodyScroll,
    useLogger,
    useLongPress,
    useMediaQuery,
    useMouse,
    useNetworkState,
    useObjectState,
    useOrientation,
    usePageLeave,
    usePreferredLanguage,
    usePrevious,
    useQueue,
    useRandomInterval,
    useSessionStorage,
    useTimeout,
    useThrottle,
    useToggle,
    useVisibilityChange,
    useWindowScroll,
    useWindowSize,
    ...scope,
  };

  return (
    <LiveProvider code={code} scope={defaultScope}>
      <div className="playground">
        <div className="playground-editor">
          <div className="playground-editor-header">
            <span>Code Editor</span>
          </div>
          <LiveEditor className="playground-editor-content" />
        </div>
        <div className="playground-preview">
          <div className="playground-preview-header">
            <span>Preview</span>
          </div>
          <div className="playground-preview-content">
            <LivePreview />
            <LiveError className="playground-error" />
          </div>
        </div>
      </div>
    </LiveProvider>
  );
}
