declare module 'next/cache' {
  export type RevalidateTagType = unknown;

  export function cacheLife(profile: unknown): void;

  export function cacheTag(...tags: string[]): void;

  export function revalidateTag(
    tag: string,
    revalidateType?: RevalidateTagType,
  ): Promise<void>;

  export function updateTag(tag: string): Promise<void>;
}

