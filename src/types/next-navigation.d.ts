declare module 'next/navigation' {
  export interface AppRouterInstance {
    prefetch(href: string): Promise<void>;
  }

  export function useRouter(): AppRouterInstance;
}

