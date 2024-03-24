# web, api それぞれで env を扱えるように設定

## ステップ（web）

### 1. ルートディレクトリに .env.local を作成

`.env.local`

```env
# ---- web ---- #
# Backend URL
NEXT_PUBLIC_API_ENDPOINT=http://localhost:3333/api

# GraphQL URL
NEXT_PUBLIC_API_GQL_URL=http://localhost:3333/api/graphql
```

> .env.local は、開示したくない情報が含まれる可能性があるため、.gitignore に指定してpushできないようにしておく。
> .env.local に記載した内容を忘れないようにするため、.env.example を作成し、ダミーの値や使い方を記載しておく。

### 2. turbo.json に利用する env を記載

`turbo.json`

```json
  "globalEnv": ["NEXT_PUBLIC_API_ENDPOINT","NEXT_PUBLIC_GQL_URL"],
```

> 追加がある場合は、都度追記していく。

### 3. web で env を利用する config を作成

`apps/web/src/config/index.ts`

```ts
export const webEnv = {
  api: {
    endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT as string,
    gqlUrl: process.env.NEXT_PUBLIC_GQL_URL as string,
  },
};
```

___

## ステップ（api）

### 1. @nestjs/config をNestjsプロジェクトに追加

パッケージをインストール

```bash
npm -w apps/api install @nestjs/config
```

### 2. api に、config モジュール等を追加

```bash
cd apps/api
npx nest g module app-config
npx nest g service app-config
```

`apps/api/src/app-config/app-config.module.ts`  

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
```

`apps/api/src/app-config/app-config.service.ts`

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get service() {
    return this.configService;
  }

  get nodeEnv(): string {
    return this.configService.get('NODE_ENV');
  }

  get databaseUrl(): string {
    return this.configService.get('DATABASE_URL');
  }
}
```

> .env に値が追加される度に更新していく。
