import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { apiEnv } from '@repo/shared-env-handler';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  const port = apiEnv.API_PORT || 3000;
  app.enableCors({
    origin: [
      apiEnv.PRODUCTION_ORIGIN || 'http://localhost:4200',
      `http://localhost:${port}`,
    ],
    credentials: true,
  });

  await app.listen(port);
  Logger.log(
    `🚀 Application playground is running on: http://localhost:${port}/api/graphql`,
  );
}

bootstrap();
