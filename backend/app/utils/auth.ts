import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prismaClient } from '../db/prismaClient.ts';
import { config } from '../config/index.ts';

export const auth = betterAuth({
  database: prismaAdapter(prismaClient, {
    provider: config.auth.database.provider,
  }),
  ...config.auth.options,
});

export type Auth = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
