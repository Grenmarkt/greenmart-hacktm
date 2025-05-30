import { auth } from '@/lib/auth/client';
import { queryOptions } from '@tanstack/react-query';

export const sessionQueryOptions = queryOptions({
  queryKey: ['auth', 'session'] as const,
  queryFn: async ({ signal }) => {
    try {
      return await auth.getSession({ fetchOptions: { signal } });
    } catch (_error) {
      return null;
    }
  },
  staleTime: 1000 * 60 * 5,
});
