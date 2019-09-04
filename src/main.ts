import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await new ConfigService();
  const options = await new DocumentBuilder()
    .setDescription(config.get('npm_package_description'))
    .setVersion(config.get('npm_package_version'))
    .setTitle(config.get('npm_package_name'))
    .setBasePath(config.get('API_PREFFIX'))
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  return await app
    .setGlobalPrefix(config.get('API_PREFFIX'))
    .useGlobalPipes(new ValidationPipe())
    .enableCors()
    .listen(config.get('API_PORT'));
}
bootstrap();
