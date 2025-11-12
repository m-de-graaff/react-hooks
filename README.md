# @m-de-graaff/react-hooks

[![npm version](https://img.shields.io/npm/v/@m-de-graaff/react-hooks.svg)](https://www.npmjs.com/package/@m-de-graaff/react-hooks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE.md)

A collection of custom React hooks built from the [react.gg](https://react.gg) course and personal utilities.

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
