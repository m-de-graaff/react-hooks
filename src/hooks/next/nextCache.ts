import { cacheLife, cacheTag } from 'next/cache';

import {
  revalidateTags,
  updateTags,
  type RevalidateType,
} from './cacheActions';

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
  revalidateType?: RevalidateType;
}

export interface NextCacheHelpers {
  revalidate: () => Promise<void>;
  update: () => Promise<void>;
}

function normalizeTags(tag?: string | string[]): string[] {
  if (!tag) {
    return [];
  }

  const tags = Array.isArray(tag) ? tag : [tag];

  return Array.from(
    new Set(
      tags
        .map((value) => value.trim())
        .filter((value) => value.length > 0),
    ),
  );
}

/**
 * Declares cache semantics in one place for a server component or function.
 * Use this at the top of an async function (with `'use cache'` if desired),
 * not inside a React component or hook.
 */
export function nextCache(options: NextCacheOptions = {}): NextCacheHelpers {
  const { tag, profile, revalidateType } = options;
  const tags = normalizeTags(tag);

  if (profile) {
    cacheLife(profile);
  }

  if (tags.length > 0) {
    cacheTag(...tags);
  }

  async function revalidate(): Promise<void> {
    const resolvedType =
      revalidateType ?? ('max' as unknown as RevalidateType);

    await revalidateTags(tags, resolvedType);
  }

  async function update(): Promise<void> {
    await updateTags(tags);
  }

  return { revalidate, update };
}

export default nextCache;

