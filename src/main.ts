import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  return await app
    .useGlobalPipes(new ValidationPipe())
    .enableCors()
    .listen(3000);
}
bootstrap();
