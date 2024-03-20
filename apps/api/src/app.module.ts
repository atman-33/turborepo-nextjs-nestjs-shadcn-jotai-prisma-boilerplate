import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DummiesModule } from './api/dummies/dummies.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'web/out'),
      exclude: ['/api/*', '/api/graphql'],
    }),
    DummiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
