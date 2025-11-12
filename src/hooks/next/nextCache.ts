import { cacheLife, cacheTag, revalidateTag, updateTag } from 'next/cache';

export type CachePreset =
  | 'default'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'max'
  | (string & {});

export interface CacheProfileConfig {
  stale?: number;
  revalidate?: number;
  expire?: number;
}

export interface NextCacheOptions {
  tag?: string | string[];
  profile?: CachePreset | CacheProfileConfig;
}

export interface NextCacheHelpers {
  revalidate: () => Promise<void>;
  update: () => Promise<void>;
}

/**
 * Declares cache semantics in one place for a server component or function.
 * Use this at the top of an async function (with `'use cache'` if desired),
 * not inside a React component or hook.
 *
 * @example
 * export async function getPosts() {
 *   'use cache';
 *   const { revalidate, update } = nextCache({ tag: 'posts', profile: 'minutes' });
 *   // ...fetch logic...
 *   return posts;
 * }
 */
export function nextCache(options: NextCacheOptions = {}): NextCacheHelpers {
  const { tag, profile } = options;
  const tags = Array.isArray(tag) ? [...tag] : tag ? [tag] : [];

  if (profile) {
    if (typeof profile === 'object' && profile !== null) {
      cacheLife(profile);
    } else {
      cacheLife(profile);
    }
  }

  if (tags.length > 0) {
    cacheTag(...tags);
  }

  async function revalidate(): Promise<void> {
    'use server';
    if (tags.length === 0) return;
    await Promise.all(tags.map((currentTag) => revalidateTag(currentTag, 'max')));
  }

  async function update(): Promise<void> {
    'use server';
    if (tags.length === 0) return;
    await Promise.all(tags.map((currentTag) => updateTag(currentTag)));
  }

  return { revalidate, update };
}

export default nextCache;
