// src/lib/auth.factory.ts
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaService } from '../prisma/prisma.service';

export const createBetterAuth = (prismaService: PrismaService) => {
  return betterAuth({
    url: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
    secret: process.env.BETTER_AUTH_SECRET || 'your-secret-key-here',
    database: prismaAdapter(prismaService, {
      provider: 'postgresql',
    }),
    emailAndPassword: { enabled: true },
    trustedOrigins: ['http://localhost:3000'],
  });
};
