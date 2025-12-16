import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaPg({
      connectionString:
        'postgresql://admin:123456@localhost:5432/authdb?schema=public',
    });
    super({ adapter });
  }
  async onModuleInit() {
    await this.$connect();
    Logger.log('[PrismaService] initialized, connecting to the database...');
  }
}
