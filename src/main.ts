// src/main.ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // Required for Better Auth
  });

  const config = new DocumentBuilder()
    .setTitle('Hader API Documentation')
    .setDescription('Complete API documentation including authentication')
    .setVersion('1.0')
    .addTag('hader', 'Your application endpoints')
    .addServer('http://localhost:5001', 'Development server')
    .build();

  // Create your NestJS API document
  const document = SwaggerModule.createDocument(app, config);

  // Single unified Scalar API Reference with multiple sources
  app.use(
    '/docs',
    apiReference({
      theme: 'purple',
      // Merge Better Auth OpenAPI spec as additional source
      sources: [
        {
          title: 'Better Auth',
          slug: 'better-auth',
          url: '/auth/open-api/generate-schema',
        },
        {
          title: 'Hader API',
          slug: 'hader-api',
          content: document,
        },
      ],
    }),
  );

  await app.listen(5001);
  console.log(`🚀 Application is running on: http://localhost:5001`);
  console.log(`📖 Complete API Reference: http://localhost:5001/docs`);
}

bootstrap();
