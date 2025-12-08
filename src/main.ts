import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function gateway_main() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('wise');

  app.enableCors({
    origin: envs.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('ECIWISE Gateway API')
    .setDescription('API Gateway para el sistema ECIWISE - Gestión de tutorías, usuarios y notificaciones')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Endpoints de autenticación')
    .addTag('gestion-usuarios', 'Endpoints de gestión de usuarios')
    .addTag('notificaciones', 'Endpoints de notificaciones')
    .addTag('tutorias', 'Endpoints de tutorías')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(envs.port);

  logger.log(`Gateway running on port ${envs.port}`);
  logger.log(`Swagger documentation available at http://localhost:${envs.port}/api/docs`);
}
gateway_main();
