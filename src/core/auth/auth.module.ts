// src/core/auth/auth.module.ts
import { Logger, Module } from '@nestjs/common';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { openAPI } from 'better-auth/plugins';
import { AuthConfig } from '../../config/auth.config';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    BetterAuthModule.forRootAsync({
      useFactory: (prismaService: PrismaService, authConfig: AuthConfig) => {
        Logger.log(
          `[AuthModule] Initializing Better Auth with URL: ${authConfig.BETTER_AUTH_URL}`,
        );
        const auth = betterAuth({
          url: authConfig.BETTER_AUTH_URL,
          secret: authConfig.BETTER_AUTH_SECRET,
          database: prismaAdapter(prismaService, {
            provider: 'postgresql',
          }),
          basePath: '/auth',
          emailAndPassword: { enabled: true },
          trustedOrigins: [authConfig.BETTER_AUTH_URL],
          plugins: [openAPI()],
        });

        return {
          auth,
        };
      },
      inject: [PrismaService, AuthConfig],
    }),
  ],
})
export class AuthModule {}
