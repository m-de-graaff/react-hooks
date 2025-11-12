# @m-de-graaff/react-hooks

[![npm version](https://img.shields.io/npm/v/@m-de-graaff/react-hooks.svg)](https://www.npmjs.com/package/@m-de-graaff/react-hooks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE.md)

A collection of custom React hooks built from the [react.gg](https://react.gg) course and personal utilities.

## Interactive Playground

**Try all hooks live in your browser!**

Visit the [Interactive Playground](https://m-de-graaff.github.io/react-hooks/) to:
- Browse all available hooks
- See live, editable demos
- Experiment with code in real-time
- View source code and documentation
- No installation required - runs entirely in your browser

The playground is built with `react-live` and deployed on GitHub Pages - completely static, no backend required!

## Installation

```bash
npm install @m-de-graaff/react-hooks
```

Or with other package managers:

```bash
# Yarn
yarn add @m-de-graaff/react-hooks

# pnpm
pnpm add @m-de-graaff/react-hooks
```

## Usage

```typescript
import { useToggle, useDocumentTitle } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const [isOpen, toggle] = useToggle(false);
  useDocumentTitle(isOpen ? "Open" : "Closed");

  return (
    <div>
      <button onClick={toggle}>{isOpen ? "Close" : "Open"}</button>
    </div>
  );
}
```

## Available Hooks

### `useCopyToClipboard`

Copy text to the clipboard with state tracking.

```typescript
import { useCopyToClipboard } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const [copiedText, copyToClipboard] = useCopyToClipboard();

  const handleCopy = async () => {
    await copyToClipboard("Hello World");
    // copiedText will be "Hello World" after successful copy
  };

  return <button onClick={handleCopy}>{copiedText ? `Copied: ${copiedText}` : "Copy to Clipboard"}</button>;
}
```

### `useDefault`

Set a default value for a component when the initial value is null or undefined.

```typescript
import { useDefault } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const [value, updateValue] = useDefault({
    initialValue: null,
    defaultValue: "Default Value",
  });

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => updateValue("New Value")}>Update</button>
      <button onClick={() => updateValue(null)}>Reset</button>
    </div>
  );
}
```

### `useDocumentTitle`

Set the document title dynamically.

```typescript
import { useDocumentTitle } from "@m-de-graaff/react-hooks";

function MyComponent() {
  useDocumentTitle("My Page Title");

  return <div>Content</div>;
}
```

### `useFavicon`

Set the favicon of the document dynamically.

```typescript
import { useFavicon } from "@m-de-graaff/react-hooks";

function MyComponent() {
  useFavicon("/favicon.ico");

  return <div>Content</div>;
}
```

### `usePreferredLanguage`

Get the user's preferred language from the browser.

```typescript
import { usePreferredLanguage } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const language = usePreferredLanguage();
  // Returns the browser's preferred language (e.g., "en-US", "fr-FR")

  return <div>Preferred Language: {language}</div>;
}
```

### `usePrevious`

Get the previous value of a variable.

```typescript
import { useState } from "react";
import { usePrevious } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);
  // previousCount will be the value of count from the previous render

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCount ?? "N/A"}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### `useToggle`

Toggle a boolean value with optional setter.

```typescript
import { useToggle } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const [isToggled, toggle] = useToggle(false);

  return (
    <div>
      <p>Status: {isToggled ? "On" : "Off"}</p>
      <button onClick={() => toggle()}>Toggle</button>
      <button onClick={() => toggle(true)}>Set to True</button>
      <button onClick={() => toggle(false)}>Set to False</button>
    </div>
  );
}
```

### `useContinuousRetry`

Continuously retry a callback function at a specified interval until it succeeds or max retries is reached.

```typescript
import { useContinuousRetry } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const hasResolved = useContinuousRetry(() => {
    return document.getElementById('my-element') !== null;
  }, 100, { maxRetries: 50 });
  // Retries every 100ms until element exists or 50 retries reached

  return <div>{hasResolved ? "Element found!" : "Searching..."}</div>;
}
```

### `useCounter`

Manage a counter with optional min/max bounds.

```typescript
import { useCounter } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const [count, { increment, decrement, set, reset }] = useCounter(0, { min: 0, max: 10 });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={() => set(5)}>Set to 5</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### `useDebounce`

Debounce a value - returns the value only after it hasn't changed for the specified delay.

```typescript
import { useState } from "react";
import { useDebounce } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  // debouncedSearchTerm will only update 500ms after searchTerm stops changing

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### `useEventListener`

Add an event listener to a DOM element, window, or document.

```typescript
import { useRef } from "react";
import { useEventListener } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEventListener(window, 'resize', (event) => {
    console.log('Window resized', event);
  });

  useEventListener(buttonRef, 'click', (event) => {
    console.log('Button clicked', event);
  });

  return <button ref={buttonRef}>Click me</button>;
}
```

### `useHistoryState`

Manage state with undo/redo history.

```typescript
import { useHistoryState } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const { state, canUndo, canRedo, set, undo, redo, clear } = useHistoryState(0);

  return (
    <div>
      <p>Value: {state}</p>
      <button onClick={() => set((state ?? 0) + 1)}>Increment</button>
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
      <button onClick={clear}>Clear</button>
    </div>
  );
}
```

### `useInterval`

Run a callback function at a specified interval.

```typescript
import { useInterval } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const clearInterval = useInterval(() => {
    console.log("Tick");
  }, 1000);
  // Clear the interval manually if needed: clearInterval();

  return <div>Check console for ticks</div>;
}
```

### `useList`

Manage a list/array with various operations.

```typescript
import { useList } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const [list, { set, push, removeAt, insertAt, updateAt, clear }] = useList([1, 2, 3]);

  return (
    <div>
      <p>List: {list.join(', ')}</p>
      <button onClick={() => push(4, 5)}>Add 4, 5</button>
      <button onClick={() => removeAt(0)}>Remove First</button>
      <button onClick={() => insertAt(1, 99)}>Insert 99 at index 1</button>
      <button onClick={() => updateAt(0, 100)}>Update first to 100</button>
      <button onClick={clear}>Clear</button>
    </div>
  );
}
```

### `useLockBodyScroll`

Lock body scroll (prevent scrolling).

```typescript
import { useLockBodyScroll } from "@m-de-graaff/react-hooks";

function Modal({ isOpen }: { isOpen: boolean }) {
  if (isOpen) {
    useLockBodyScroll();
  }
  // Scroll is automatically restored when component unmounts

  return isOpen ? <div>Modal content</div> : null;
}
```

### `useMediaQuery`

Track a media query match state.

```typescript
import { useMediaQuery } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div>
      <p>Device: {isMobile ? "Mobile" : "Desktop"}</p>
      <p>Theme: {isDarkMode ? "Dark" : "Light"}</p>
    </div>
  );
}
```

### `useObjectState`

Manage object state with automatic merging (similar to React class component setState).

```typescript
import { useObjectState } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const [state, updateState] = useObjectState({ name: 'John', age: 30 });

  return (
    <div>
      <p>Name: {state.name}, Age: {state.age}</p>
      <button onClick={() => updateState({ age: 31 })}>
        Update Age
      </button>
      <button onClick={() => updateState((prev) => ({ age: (prev.age ?? 0) + 1 }))}>
        Increment Age
      </button>
    </div>
  );
}
```

### `useQueue`

Manage a queue data structure.

```typescript
import { useQueue } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const { add, remove, clear, first, last, size, queue } = useQueue([1, 2, 3]);

  return (
    <div>
      <p>Queue: {queue.join(', ')}</p>
      <p>First: {first ?? 'N/A'}, Last: {last ?? 'N/A'}, Size: {size}</p>
      <button onClick={() => add(4)}>Add 4</button>
      <button onClick={() => remove()}>Remove First</button>
      <button onClick={clear}>Clear</button>
    </div>
  );
}
```

### `useRandomInterval`

Run a callback function at random intervals between minDelay and maxDelay.

```typescript
import { useRandomInterval } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const clearInterval = useRandomInterval(() => {
    console.log("Random tick");
  }, { minDelay: 1000, maxDelay: 5000 });
  // Clear the interval manually if needed: clearInterval();

  return <div>Check console for random ticks</div>;
}
```

### `useTimeout`

Run a callback function after a specified delay.

```typescript
import { useTimeout } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const clearTimeout = useTimeout(() => {
    console.log("Timeout fired!");
  }, 1000);
  // Clear the timeout manually if needed: clearTimeout();

  return <div>Check console after 1 second</div>;
}
```

### `useVisibilityChange`

Track document visibility state.

```typescript
import { useVisibilityChange } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const isVisible = useVisibilityChange();
  // Returns true when tab/window is visible, false when hidden

  return <div>Tab is {isVisible ? "visible" : "hidden"}</div>;
}
```

### `useWindowSize`

Track the window size.

```typescript
import { useWindowSize } from "@m-de-graaff/react-hooks";

function MyComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window size: {width} x {height}</p>
    </div>
  );
}
```

## Development

### Prerequisites

- Node.js >= 18.0.0
- npm, yarn, or pnpm

### Setup

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Format code
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Project Structure

```
src/
├── hooks/          # Custom hooks implementations
│   └── index.ts    # Export all hooks
└── index.ts        # Main entry point

playground/         # Interactive playground app
├── src/
│   ├── components/ # React components
│   └── hooksData.ts # Hook examples and metadata
└── package.json    # Playground dependencies
```

### Running the Playground Locally

To run the interactive playground locally:

```bash
cd playground
pnpm install
pnpm dev
```

The playground will be available at `http://localhost:5173`

To build and deploy the playground:

```bash
cd playground
pnpm build
pnpm deploy
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to:

- Follow the existing code style (enforced by Biome)
- Add tests for new features
- Update documentation as needed

## License

MIT © m-de-graaff - see the [LICENSE.md](LICENSE.md) file for details.

## Security

For security concerns, please see [SECURITY.md](SECURITY.md).

## Changelog

See [Releases](https://github.com/m-de-graaff/react-hooks/releases) for a list of changes.
