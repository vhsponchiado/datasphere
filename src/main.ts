import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import basicAuth = require('express-basic-auth');
import { ValidationPipe } from '@nestjs/common';
import { AppLogger } from './infrastructure/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(AppLogger));

  app.setGlobalPrefix('api/v1');

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Template')
    .setDescription('Standard API Template with NestJS, Drizzle ORM, and Scalar Documentation')
    .setVersion('1.0')
    .addTag('auth', 'Authentication and Authorization endpoints')
    .addTag('system', 'System health and status endpoints')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const docsUsername = process.env.DOCS_USERNAME || 'your-username';
  const docsPassword = process.env.DOCS_PASSWORD || 'your-password';

  app.use(
    ['/api/docs'],
    basicAuth({
      challenge: true,
      users: {
        [docsUsername]: docsPassword,
      },
    }),
  );

  app.use(
    '/api/docs',
    apiReference({
      theme: 'kepler',
      darkMode: true,
      spec: {
        content: document,
      },
    } as any),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
