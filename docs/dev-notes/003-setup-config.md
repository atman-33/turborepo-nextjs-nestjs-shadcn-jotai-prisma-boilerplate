# web, api それぞれで env を扱えるように設定

## ステップ: evn 値取得用のパッケージを準備

### 1. biildとdevコマンドに .env.local 読み込みを追加

`package.json`

```bash
  "scripts": {
    "build": "npx env-cmd -f .env.local turbo build",
    "postbuild": "npx env-cmd -f .env.local turbo build --filter='./packages/*' & npm i",
    "----START----": "-------------------------",
    ...,
    "dev": "npm run postbuild & npx env-cmd -f .env.local turbo dev",
    "dev:web": "npx env-cmd -f .env.local turbo dev --filter=web",
    "dev:api": "npm run postbuild & npx env-cmd -f .env.local turbo dev --filter=api",
```

> postbuildは、Internal Package を利用する際に必要

- tourbo.json に cache 利用無しでコマンドを設定しておく。

`turbo.json`

```json
  "pipeline":{  
    ...,
    "dev:web": {
      "cache": false,
      "persistent": true
    },
    "dev:api": {
      "cache": false,
      "persistent": true
    },
  }
```

### 2. web に、env 読み込みを追加

`apps/web/src/config/index.ts`

```ts
export const webEnv = {
  NEXT_PUBLIC_API_ENDPOINT: process.env['NEXT_PUBLIC_API_ENDPOINT'] as string,
  NEXT_PUBLIC_API_GQL_URL: process.env['NEXT_PUBLIC_API_GQL_URL'] as string
};
```

> 取り扱うenvの値が増えた際は、都度追加していく。

### 3. api に、env 読み込みを追加

`apps/api/src/config/index.ts`

```ts
export const apiEnv = {
  API_PORT: Number(process.env['API_PORT']) as number,
  WEB_ORIGIN: process.env['WEB_ORIGIN'] as string,
  DATABASE_URL: process.env['DATABASE_URL'] as string,
};
```
