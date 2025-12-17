import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
/**
 * * Dummy auth instance.
 * ! This instance is only used for better-auth CLI to generate prisma schema.
 */

export const auth = betterAuth({
  database: prismaAdapter(
    {},
    {
      provider: 'postgresql',
    },
  ),
});
