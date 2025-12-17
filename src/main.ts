import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // bodyParser: false, // Required for Better Auth
  });

  app.useGlobalPipes(new ValidationPipe());

  // Get AuthService to access the Better Auth instance
  const authService = app.get(AuthService);

  const betterAuthSchema = await authService.api.getOpenAPISchema();

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/reference',
    apiReference({
      content: document,
    }),
  );
  await app.listen(process.env.PORT ?? 5001);

  console.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT ?? 5001}`,
  );
}
bootstrap();
