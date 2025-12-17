import { Module } from '@nestjs/common';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { PrismaService } from '../prisma/prisma.service';
import { AuthConfig } from './../../config/auth.config';

@Module({
  imports: [
    BetterAuthModule.forRootAsync({
      useFactory: (prismaService: PrismaService, authConfig: AuthConfig) => ({
        auth: betterAuth({
          // Configuration options here
          url: authConfig.BETTER_AUTH_URL,
          secret: authConfig.BETTER_AUTH_SECRET,
          database: prismaService,
          emailAndPassword: { enabled: true },
        }),
      }),
      inject: [PrismaService, AuthConfig],
    }),
  ],
})
export class AuthModule {}
