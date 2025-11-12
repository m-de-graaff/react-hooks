'use server';

import { revalidateTag, updateTag } from 'next/cache';

type RevalidateTagParameters = Parameters<typeof revalidateTag>;
type MaybeSecondParameter = RevalidateTagParameters extends [
  string,
  infer Second,
  ...unknown[]
]
  ? Second
  : undefined;

export type RevalidateType = MaybeSecondParameter;

export async function revalidateTags(
  tags: readonly string[],
  type?: RevalidateType,
): Promise<void> {
  if (tags.length === 0) {
    return;
  }

  await Promise.all(tags.map((tag) => revalidateTag(tag, type)));
}

export async function updateTags(tags: readonly string[]): Promise<void> {
  if (tags.length === 0) {
    return;
  }

  await Promise.all(tags.map((tag) => updateTag(tag)));
}

