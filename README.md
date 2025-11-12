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

For the Next.js preview release you can pin the `next` dist-tag:

```bash
npm install @m-de-graaff/react-hooks@next
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

### Next.js Entry Point

Starting with `1.0.0-next`, the package includes dedicated Next.js cache helpers under the `/next` subpath. These utilities are compiled for both Node/Edge runtimes and ship full type definitions.

```typescript
import { nextCache, useCacheStatus, useCachePrefetch, useCacheWarmup } from "@m-de-graaff/react-hooks/next";

export async function getPosts() {
  "use cache";
  const { revalidate } = nextCache({ tag: "posts", profile: "minutes" });
  // ...load data...
  await revalidate();
}
```

Use these hooks and helpers in App Router projects running Next.js 16 or newer.

## Available Hooks

### Baseline Collection

All browser-friendly hooks (from `useBattery` through `useWindowSize`) are identical to the `main` branch. For full API docs and examples, see the [Available Hooks section on main](https://github.com/m-de-graaff/react-hooks/tree/main#available-hooks).

### Next.js Cache Utilities

Each helper below lives under the `@m-de-graaff/react-hooks/next` subpath and targets Next.js 16+ Cache Components.

#### `useCacheStatus`

Inspect cache freshness for a URL by reading `x-nextjs-stale-time` and optionally polling on an interval.

```typescript
import { useCacheStatus } from "@m-de-graaff/react-hooks/next";

function CacheStatusBadge() {
  const { status, lastChecked, refresh } = useCacheStatus("/api/posts", { interval: 60_000 });

  return (
    <button onClick={() => refresh()}>
      Cache is {status} (checked {lastChecked?.toLocaleTimeString() ?? "—"})
    </button>
  );
}
```

#### `useCachePrefetch`

Prefetch a route when an element enters the viewport or receives pointer/focus interactions.

```typescript
import { useCachePrefetch } from "@m-de-graaff/react-hooks/next";

function PostLink() {
  const ref = useCachePrefetch("/blog/posts", { onVisible: true, onHover: true });

  return (
    <a ref={ref} href="/blog/posts">
      Browse posts
    </a>
  );
}
```

#### `useCacheWarmup`

Fire one-off or manual warmup requests (with cache tags) to ensure stale data is refreshed before user navigation.

```typescript
import { useCacheWarmup } from "@m-de-graaff/react-hooks/next";

function WarmupPosts() {
  const warm = useCacheWarmup(
    [
      { url: "/api/posts", tags: "posts" },
      { url: "/api/profile", tags: ["user", "profile"] },
    ],
    { once: true }
  );

  return <button onClick={() => warm()}>Warm cache</button>;
}
```

#### `nextCache`

Declare cache semantics for server functions and tap into helper methods for tag revalidation or mutation.

```typescript
import { nextCache } from "@m-de-graaff/react-hooks/next";

export async function getPosts() {
  "use cache";

  const { revalidate, update } = nextCache({
    tag: "posts",
    profile: "minutes",
  });

  const response = await fetch("https://example.com/api/posts");
  const posts = await response.json();

  await revalidate();
  await update();

  return posts;
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
├── hooks/            # Browser/runtime-agnostic hooks
│   └── index.ts      # Export all baseline hooks
├── next/             # Re-export Next.js-specific helpers
└── index.ts          # Package entry point

playground/           # Interactive playground app
├── src/
│   ├── components/   # React components
│   └── hooksData.ts  # Hook examples and metadata
└── package.json      # Playground dependencies
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
