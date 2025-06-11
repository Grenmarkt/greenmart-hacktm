import { logger } from '@better-fetch/logger';
import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';

export const auth = createAuthClient({
  baseURL: import.meta.env['VITE_API_URL'],
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: 'string',
          input: false,
        },
      },
    }),
  ],
  fetchOptions: {
    throw: true,
    plugins: [
      logger({
        enabled: import.meta.env.DEV,
        verbose: true,
      }),
    ],
  },
});
