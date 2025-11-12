export interface HookData {
  name: string;
  description: string;
  example: string;
  scope?: Record<string, unknown>;
}

export const hooks: HookData[] = [
  {
    name: 'useCounter',
    description: 'Manage a counter with optional min/max bounds',
    example: `function Example() {
  const [count, { increment, decrement, reset, set }] = useCounter(0, { min: 0, max: 10 });
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Count: {count}</h2>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
        <button onClick={reset}>Reset</button>
        <button onClick={() => set(5)}>Set to 5</button>
      </div>
    </div>
  );
}`,
  },
  {
    name: 'useToggle',
    description: 'Toggle a boolean value',
    example: `function Example() {
  const [isOn, toggle] = useToggle(false);
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Status: {isOn ? 'ON' : 'OFF'}</h2>
      <button onClick={toggle} style={{ padding: '0.5rem 1rem' }}>
        Toggle
      </button>
    </div>
  );
}`,
  },
  {
    name: 'useDebounce',
    description:
      "Debounce a value - returns the value only after it hasn't changed for the specified delay",
    example: `function Example() {
  const [value, setValue] = React.useState('');
  const debouncedValue = useDebounce(value, 500);
  
  return (
    <div style={{ padding: '1rem' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        style={{ padding: '0.5rem', width: '100%', maxWidth: '300px' }}
      />
      <p style={{ marginTop: '1rem' }}>
        Value: <strong>{value}</strong>
      </p>
      <p>
        Debounced: <strong>{debouncedValue}</strong>
      </p>
    </div>
  );
}`,
  },
  {
    name: 'useThrottle',
    description: 'Throttle a value - returns the value updated at most once per interval',
    example: `function Example() {
  const [value, setValue] = React.useState(0);
  const throttledValue = useThrottle(value, 500);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Counter: {value}</h2>
      <p>Throttled (500ms): <strong>{throttledValue}</strong></p>
    </div>
  );
}`,
  },
  {
    name: 'useWindowSize',
    description: 'Track the window size',
    example: `function Example() {
  const { width, height } = useWindowSize();
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Window Size</h2>
      <p>Width: <strong>{width}px</strong></p>
      <p>Height: <strong>{height}px</strong></p>
      <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
        Resize your browser window to see the values update
      </p>
    </div>
  );
}`,
  },
  {
    name: 'useWindowScroll',
    description: 'Track window scroll position and provide scroll control',
    example: `function Example() {
  const [{ x, y }, scrollTo] = useWindowScroll();
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Scroll Position</h2>
      <p>X: <strong>{x}px</strong></p>
      <p>Y: <strong>{y}px</strong></p>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button onClick={() => scrollTo(0, 0)}>Scroll to Top</button>
        <button onClick={() => scrollTo({ top: 500, behavior: 'smooth' })}>Scroll Down</button>
      </div>
      <div style={{ height: '200vh', marginTop: '2rem' }}>
        <p>Scroll down to see the values change</p>
      </div>
    </div>
  );
}`,
  },
  {
    name: 'useLocalStorage',
    description: 'Manage localStorage with React state synchronization',
    example: `function Example() {
  const [value, setValue] = useLocalStorage('demo-key', 'default value');
  
  return (
    <div style={{ padding: '1rem' }}>
      <h2>LocalStorage Demo</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', maxWidth: '300px', marginTop: '0.5rem' }}
      />
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
        Value persists across page refreshes. Check your browser's localStorage!
      </p>
    </div>
  );
}`,
  },
  {
    name: 'useSessionStorage',
    description: 'Manage sessionStorage with React state synchronization',
    example: `function Example() {
  const [value, setValue] = useSessionStorage('demo-session-key', 'session value');
  
  return (
    <div style={{ padding: '1rem' }}>
      <h2>SessionStorage Demo</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', maxWidth: '300px', marginTop: '0.5rem' }}
      />
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
        Value persists for the browser session. Close the tab and reopen to see it reset.
      </p>
    </div>
  );
}`,
  },
  {
    name: 'useCopyToClipboard',
    description: 'Copy text to clipboard with state tracking',
    example: `function Example() {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  
  const handleCopy = async () => {
    await copyToClipboard('Hello from React Hooks!');
  };
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Copy to Clipboard</h2>
      <button onClick={handleCopy} style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
        Copy Text
      </button>
      {copiedText && (
        <p style={{ marginTop: '1rem', color: '#28a745' }}>
          ✓ Copied: "{copiedText}"
        </p>
      )}
    </div>
  );
}`,
  },
  {
    name: 'useMediaQuery',
    description: 'Track a media query match state',
    example: `function Example() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Media Query Demo</h2>
      <p>Is Mobile: <strong>{isMobile ? 'Yes' : 'No'}</strong></p>
      <p>Prefers Dark Mode: <strong>{isDarkMode ? 'Yes' : 'No'}</strong></p>
      <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
        Resize your browser or change your system theme to see updates
      </p>
    </div>
  );
}`,
  },
  {
    name: 'useMouse',
    description: 'Track mouse position relative to the document and optionally an element',
    example: `function Example() {
  const [mouse, ref] = useMouse();
  
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Mouse Position</h2>
      <div
        ref={ref}
        style={{
          border: '2px dashed #007bff',
          padding: '2rem',
          marginTop: '1rem',
          textAlign: 'center',
          borderRadius: '8px',
        }}
      >
        <p>Move your mouse over this box</p>
        <p style={{ marginTop: '1rem' }}>
          Element X: <strong>{mouse.elementX}</strong>
        </p>
        <p>
          Element Y: <strong>{mouse.elementY}</strong>
        </p>
      </div>
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
        Document X: {mouse.x}, Y: {mouse.y}
      </p>
    </div>
  );
}`,
  },
  {
    name: 'useClickAway',
    description: 'Detect clicks outside of an element',
    example: `function Example() {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = useClickAway(() => {
    setIsOpen(false);
  });
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Click Away Demo</h2>
      <button onClick={() => setIsOpen(!isOpen)} style={{ padding: '0.5rem 1rem' }}>
        {isOpen ? 'Close' : 'Open'} Menu
      </button>
      {isOpen && (
        <div
          ref={ref}
          style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#f8f9fa',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            display: 'inline-block',
          }}
        >
          <p>Click outside this box to close</p>
        </div>
      )}
    </div>
  );
}`,
  },
  {
    name: 'useKeyPress',
    description: 'Detect when a specific key is pressed',
    example: `function Example() {
  const [lastKey, setLastKey] = React.useState('None');
  
  useKeyPress('Enter', (e) => {
    setLastKey('Enter');
  });
  
  useKeyPress('Escape', (e) => {
    setLastKey('Escape');
  });
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Key Press Demo</h2>
      <p>Last pressed key: <strong>{lastKey}</strong></p>
      <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
        Press Enter or Escape to see updates
      </p>
    </div>
  );
}`,
  },
  {
    name: 'useInterval',
    description: 'Run a callback function at a specified interval',
    example: `function Example() {
  const [count, setCount] = React.useState(0);
  
  useInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Interval Counter</h2>
      <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{count}</p>
      <p style={{ fontSize: '0.875rem', color: '#666' }}>
        Updates every second
      </p>
    </div>
  );
}`,
  },
  {
    name: 'useTimeout',
    description: 'Run a callback function after a specified delay',
    example: `function Example() {
  const [message, setMessage] = React.useState('Waiting...');
  
  useTimeout(() => {
    setMessage('Timeout fired after 3 seconds!');
  }, 3000);
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Timeout Demo</h2>
      <p>{message}</p>
    </div>
  );
}`,
  },
  {
    name: 'usePrevious',
    description: 'Get the previous value of a variable',
    example: `function Example() {
  const [count, setCount] = React.useState(0);
  const previousCount = usePrevious(count);
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Previous Value Demo</h2>
      <p>Current: <strong>{count}</strong></p>
      <p>Previous: <strong>{previousCount ?? 'N/A'}</strong></p>
      <button onClick={() => setCount((prev) => prev + 1)} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        Increment
      </button>
    </div>
  );
}`,
  },
  {
    name: 'useVisibilityChange',
    description: 'Track document visibility state',
    example: `function Example() {
  const isVisible = useVisibilityChange();
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Visibility Change Demo</h2>
      <p>Document is: <strong>{isVisible ? 'Visible' : 'Hidden'}</strong></p>
      <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
        Switch to another tab to see it change to "Hidden"
      </p>
    </div>
  );
}`,
  },
  {
    name: 'usePreferredLanguage',
    description: "Get the user's preferred language",
    example: `function Example() {
  const language = usePreferredLanguage();
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Preferred Language</h2>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{language}</p>
      <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
        Change your browser language settings to see updates
      </p>
    </div>
  );
}`,
  },
  {
    name: 'useIdle',
    description: 'Detect if the user is idle (no activity for a specified duration)',
    example: `function Example() {
  const isIdle = useIdle(3000);
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Idle Detection</h2>
      <p>Status: <strong style={{ color: isIdle ? '#dc3545' : '#28a745' }}>
        {isIdle ? 'Idle' : 'Active'}
      </strong></p>
      <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
        Stop moving your mouse/keyboard for 3 seconds to see "Idle"
      </p>
    </div>
  );
}`,
  },
  {
    name: 'useList',
    description: 'Manage a list/array with various operations',
    example: `function Example() {
  const [list, { push, removeAt, clear }] = useList([1, 2, 3]);
  
  return (
    <div style={{ padding: '1rem' }}>
      <h2>List Management</h2>
      <p>Items: <strong>{list.join(', ')}</strong></p>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <button onClick={() => push(Math.floor(Math.random() * 100))}>
          Add Random
        </button>
        <button onClick={() => removeAt(0)} disabled={list.length === 0}>
          Remove First
        </button>
        <button onClick={clear} disabled={list.length === 0}>
          Clear All
        </button>
      </div>
    </div>
  );
}`,
  },
  {
    name: 'useQueue',
    description: 'Manage a queue data structure',
    example: `function Example() {
  const { add, remove, clear, first, last, size, queue } = useQueue([1, 2, 3]);
  
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Queue Management</h2>
      <p>Queue: <strong>[{queue.join(', ')}]</strong></p>
      <p>Size: <strong>{size}</strong></p>
      <p>First: <strong>{first ?? 'N/A'}</strong></p>
      <p>Last: <strong>{last ?? 'N/A'}</strong></p>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <button onClick={() => add(Math.floor(Math.random() * 100))}>
          Enqueue
        </button>
        <button onClick={remove} disabled={size === 0}>
          Dequeue
        </button>
        <button onClick={clear} disabled={size === 0}>
          Clear
        </button>
      </div>
    </div>
  );
}`,
  },
  {
    name: 'useHistoryState',
    description: 'Manage state with undo/redo history',
    example: `function Example() {
  const { state, canUndo, canRedo, set, undo, redo, clear } = useHistoryState(0);
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>History State</h2>
      <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{state}</p>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
        <button onClick={() => set(state + 1)}>Increment</button>
        <button onClick={undo} disabled={!canUndo}>Undo</button>
        <button onClick={redo} disabled={!canRedo}>Redo</button>
        <button onClick={clear}>Reset</button>
      </div>
    </div>
  );
}`,
  },
  {
    name: 'useFetch',
    description: 'Fetch data from a URL with caching and error handling',
    example: `function Example() {
  const { data, error, loading } = useFetch('https://jsonplaceholder.typicode.com/posts/1');
  
  if (loading) return <div style={{ padding: '1rem' }}>Loading...</div>;
  if (error) return <div style={{ padding: '1rem', color: '#dc3545' }}>Error: {error.message}</div>;
  
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Fetch Demo</h2>
      <pre style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}`,
  },
  {
    name: 'useGeolocation',
    description: 'Track device geolocation using the Geolocation API',
    example: `function Example() {
  const { latitude, longitude, loading, error } = useGeolocation();
  
  if (loading) return <div style={{ padding: '1rem' }}>Getting location...</div>;
  if (error) return <div style={{ padding: '1rem', color: '#dc3545' }}>Error: {error.message}</div>;
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Geolocation</h2>
      <p>Latitude: <strong>{latitude}</strong></p>
      <p>Longitude: <strong>{longitude}</strong></p>
    </div>
  );
}`,
  },
  {
    name: 'useNetworkState',
    description: 'Track network connection state and information',
    example: `function Example() {
  const { online, effectiveType, downlink } = useNetworkState();
  
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Network State</h2>
      <p>Online: <strong style={{ color: online ? '#28a745' : '#dc3545' }}>
        {online ? 'Yes' : 'No'}
      </strong></p>
      <p>Effective Type: <strong>{effectiveType ?? 'Unknown'}</strong></p>
      <p>Downlink: <strong>{downlink ?? 'Unknown'} Mbps</strong></p>
    </div>
  );
}`,
  },
  {
    name: 'useBattery',
    description: 'Track device battery status using the Battery Status API',
    example: `function Example() {
  const { level, charging, supported, loading } = useBattery();
  
  if (loading) return <div style={{ padding: '1rem' }}>Loading battery info...</div>;
  if (!supported) return <div style={{ padding: '1rem' }}>Battery API not supported</div>;
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Battery Status</h2>
      <p>Level: <strong>{(level * 100).toFixed(0)}%</strong></p>
      <p>Charging: <strong>{charging ? 'Yes' : 'No'}</strong></p>
    </div>
  );
}`,
  },
  {
    name: 'useOrientation',
    description: 'Track device screen orientation',
    example: `function Example() {
  const { angle, type } = useOrientation();
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Screen Orientation</h2>
      <p>Angle: <strong>{angle}°</strong></p>
      <p>Type: <strong>{type}</strong></p>
      <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
        Rotate your device to see updates
      </p>
    </div>
  );
}`,
  },
  {
    name: 'useLongPress',
    description: 'Detect long press gestures on mouse and touch events',
    example: `function Example() {
  const handlers = useLongPress(() => {
    alert('Long press detected!');
  }, { threshold: 1000 });
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Long Press Demo</h2>
      <button
        {...handlers}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.125rem',
          cursor: 'pointer',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Press and Hold (1 second)
      </button>
      <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
        Press and hold the button for 1 second
      </p>
    </div>
  );
}`,
  },
  {
    name: 'useCountdown',
    description: 'Create a countdown timer that counts down from a target time',
    example: `function Example() {
  const countdown = useCountdown(Date.now() + 10000, {
    interval: 1000,
    onComplete: () => {
      alert('Countdown complete!');
    },
  });
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Countdown Timer</h2>
      <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>
        {countdown ?? 0}
      </p>
      <p style={{ fontSize: '0.875rem', color: '#666' }}>
        Counting down from 10 seconds
      </p>
    </div>
  );
}`,
  },
  {
    name: 'useIsClient',
    description: 'Detect if the code is running on the client side vs server side',
    example: `function Example() {
  const isClient = useIsClient();
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Client Detection</h2>
      <p>Running on: <strong>{isClient ? 'Client' : 'Server'}</strong></p>
      <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
        This hook helps with SSR (Server-Side Rendering) compatibility
      </p>
    </div>
  );
}`,
  },
];
