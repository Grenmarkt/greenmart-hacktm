import { createFetch } from '@better-fetch/fetch';
import { logger } from '@better-fetch/logger';
import { router } from '../router';
import { queryClient } from '@/api/client';
import { sessionQueryOptions } from '@/api/auth/queries';
import { schema } from './schema';

export const $fetch = createFetch({
  baseURL: import.meta.env['VITE_API_URL'],
  throw: true,
  credentials: 'include',
  schema: schema,
  plugins: [
    logger({
      enabled: import.meta.env.DEV,
      verbose: true,
    }),
  ],
  onError(context) {
    if (context.error.status === 401) {
      queryClient.invalidateQueries({
        queryKey: sessionQueryOptions.queryKey,
        exact: true,
      });
      router.navigate({ to: '/signin' });
    } else if (context.error.status === 403) {
      // TODO
    }
  },
});
