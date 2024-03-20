# web/api 共に利用可能な config モジュールを追加

confing モジュール経由で、`env`の情報を取得する。

## ステップ

## 1. パッケージ生成

```bash
npm init -y -w packages/shared/env-handler
```

## 2. package.json を修正

- name を変更
- main を exports に変更
- typescript-config 参照を追加
- private: true を追加

`packages/shared/env-handler/package.json`

```json
  "name": "@repo/shared-env-handler",
  ...,
  "exports": {
    ".": "./src/index.ts"
  },
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