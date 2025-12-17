import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { DBConfig } from 'src/config/db.config';
import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly dbConfig: DBConfig) {
    const adapter = new PrismaPg({
      connectionString: dbConfig.DATABASE_URL,
    });
    super({ adapter });
  }
  async onModuleInit() {
    await this.$connect();
    Logger.log(
      '[PrismaService] initialized, connecting to the database...' +
        this.dbConfig.DATABASE_URL,
    );
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
