import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import { AppConfigService } from './app-config/app-config.service';

async function bootstrap() {
  console.log(`Current Directory: ${process.cwd()}`);

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const appConfigService = app.get(AppConfigService);

  const port = appConfigService.apiPort || 3000;
  app.enableCors({
    origin: [
      appConfigService.productionOrigin || 'http://localhost:4200',
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
