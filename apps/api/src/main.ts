import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { apiEnv } from './config';

async function bootstrap() {
  console.log(`api process.cwd: ${process.cwd()}`);

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const port = apiEnv.API_PORT || 3000;
  app.enableCors({
    origin: [
      apiEnv.WEB_ORIGIN || 'http://localhost:4200',
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
