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

// TODO: ここから作成

___
___
___
___
___
___


## 1. パッケージ生成

```bash
npm init -y -w packages/shared/env-handler
```

## 2. package.json を修正

- name を変更
- main と types を修正
- typescript-config 参照を追加
- private: true を追加

`packages/shared/env-handler/package.json`

```json
  "name": "@repo/shared-env-handler",
  ...,
  "main:": "./src/index.ts",
  "types": "./src/index.ts",
  ...,
  "devDependencies": {
    "@repo/typescript-config": "*"
  },
  ...,
  "private":"true",
```

## 3. tsconfig.json を作成

`packages/shared/env-handler/tsconfig.json`

```json
{
  "extends": "@repo/typescript-config/base.json",
}
```

### 4. env.ts を作成

 `libs/shared/config/src/lib/env.ts`

e.g. 
```ts
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const webEnv = {
  NEXT_PUBLIC_API_ENDPOINT: process.env['NEXT_PUBLIC_API_ENDPOINT'] as string | undefined,
  NEXT_PUBLIC_API_GQL_URL: process.env['NEXT_PUBLIC_API_GQL_URL'] as string | undefined
};

export const apiEnv = {
  API_PORT: Number(process.env['API_PORT']) as number | undefined,
  PRODUCTION_ORIGIN: process.env['PRODUCTION_ORIGIN'] as string | undefined,
  DATABASE_URL: process.env['DATABASE_URL'] as string | undefined
};
```

 > .env に値が追加される度に更新していく。

### 5. index.ts を作成

`packages/shared/env-handler/src/index.ts`

```ts
export { apiEnv, webEnv } from './lib/env';
```