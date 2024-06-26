import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DummiesModule } from './api/dummies/dummies.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/api/graphql',
      autoSchemaFile: join(__dirname, './autogenerated-schema.gql'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'web/out'),
      exclude: ['/api/*', '/api/graphql'],
    }),
    // ---- GraphQL ---- //
    DummiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
