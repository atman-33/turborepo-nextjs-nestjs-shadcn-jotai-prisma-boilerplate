# Prisma セットアップ

## 参考URL

[Turborepoを利用したmonorepo構成のNestJS+Prismaプロジェクトの構築](https://tech-blog.s-yoshiki.com/entry/296)

## ステップ

### 1. data-access-db パッケージを追加

```bash
npm init -y -w packages/data-access-db
npm -w packages/data-access-db install @prisma/client @nestjs/graphql graphql-type-json @nestjs/common
npm -w packages/data-access-db install -D typescript prisma env-cmd prisma-nestjs-graphql 
echo "public-hoist-pattern[]=*prisma*" >> .npmrc
```

### 2. package.json を変更

`packages/data-access-db/package.json`

- name を変更

```json
  "name": "@repo/data-access-db",
```

- main を削除して、exports と types を修正

```json
  "exports": {
    ".": "./dist/index.js"
  },
  "types": "./dist/index.d.ts",
```

- scripts に build を追加

```json
  "scripts": {
    "build": "tsc --build --force tsconfig.json"
  },
```

- devDependencies を追加

```json
  "devDependencies": {
    "@repo/eslint-config": "*",
    "@repo/typescript-config": "*",
    ...
  }
```

### 3. tsconfig.json を作成

`packages/data-access-db/tsconfig.json`

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "experimentalDecorators": true,
    "outDir": "./dist",
  }
}
```

### 4. .env にDB接続パスを追加

`.env.local`

e.g.  

```env
DATABASE_URL="mongodb://monty:pass@localhost:27017/mongo_dev?authSource=admin&directConnection=true"
```

### 5. schema.prisma を作成

 `packages/data-access-db/src/lib/schema.prisma`

```prisma
generator client {
    provider = "prisma-client-js"
}

datasource db {
    // provider = "postgresql"
    provider = "mongodb"
    url      = env("DATABASE_URL")
}

generator nestgraphql {
    provider                = "node node_modules/prisma-nestjs-graphql"
    output                  = "./@generated"
    noAtomicOperations      = true
    combineScalarFilters    = true
    reExport                = Single
    emitSingle              = false
    emitCompiled            = false
    purgeOutput             = false
    // field validator
    fields_Validator_from   = "class-validator"
    fields_Validator_input  = true
    fields_Validator_output = true
    fields_Validator_model  = true
    // Args where|data nested validator
    decorate_1_type         = "*Args"
    decorate_1_field        = "@(data|where)"
    decorate_1_name         = ValidateNested
    decorate_1_from         = "class-validator"
    decorate_1_arguments    = "[]"
}
...
```

### 6. prisma サービスとモジュールファイル作成

- `packages/data-access-db/src/lib/prisma.service.ts`
- `packages/data-access-db/src/lib/prisma.module.ts`

> コードは、ファイルの中身を参照のこと。

### 7. index.ts を作成

`packages/data-access-db/src/index.ts`

```ts
export * from './lib/@generated';
export { PrismaModule } from './lib/prisma.module';
export { PrismaService } from './lib/prisma.service';
```

### 8. api（NestJS）に、data-access-dbを追加

- node_modules に、`data-access-db`を追加
  
```bash
# ルートディレクトリで実行
npm i
```

- package.json に`data-access-db`を追加

`apps/api/package.json`

```json
  "dependencies": {
    "@repo/data-access-db": "*",
    ...
```

### 9. ルートディレクトリの package.json を変更

`/package.json`

- prisma の schema を追加

```json
  ...
  },
  "prisma": {
    "schema": "packages/data-access-db/src/lib/schema.prisma"
  }
}
```

- DB操作コマンドを追加

```json
  "scripts": {
    "----DB SECTION----": "-------------------------",
    "db:migrate:dev": "npx env-cmd -f .env.local npx prisma migrate dev",
    "db:push:dev": "npx env-cmd -f .env.local npx prisma db push",
    "db:generate": "npx env-cmd -f .env.local npx prisma generate",
    "db:studio": "npx env-cmd -f .env.local npx prisma studio",
  },
```

### 10. ルートディレクトリの turbo.json を変更

- pipeline に下記を追加

```json
  "pipeline": {
    ...,
    "db:migrate:dev": {
      "cache": false
    },
    "db:push:dev": {
      "cache": false
    },
    "db:generate": {
      "cache": false
    }
```

### 11. prisma マイグレーション

マイグレーション実行で、DBテーブルを生成する。

> ただし、mongo db の場合は、マイグレーションは必要無し。

```bash
npm run db:migrate:dev
```

> もしデータをリセットする場合、先にマイグレーションフォルダを削除してから、マイグレーションコマンドを実行すること。

### 12. prisma generate

`prisma generate` コマンド実行で、スキーマに定義したモデルのTypeファイル等を生成する。

```bash
npm run db:generate
```

## その他

### prisma studio を起動

```bash
npm run db:studio
```
