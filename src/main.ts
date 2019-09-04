import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app/app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await new ConfigService();

  return await app
    .setGlobalPrefix(config.get('API_PREFFIX'))
    .useGlobalPipes(new ValidationPipe())
    .enableCors()
    .listen(config.get('API_PORT'));
}
bootstrap();
