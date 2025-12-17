import { ConfigifyModule } from '@itgorillaz/configify';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { PrismaModule } from './core/prisma/prisma.module';

@Module({
  imports: [ConfigifyModule.forRootAsync(), PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
