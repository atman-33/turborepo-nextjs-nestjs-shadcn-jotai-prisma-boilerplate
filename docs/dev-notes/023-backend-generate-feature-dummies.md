# Dummy テーブル操作用のAPI生成（サンプル）

## ステップ

### 1. schema.prisma にモデル追加

Dummy モデルを追加

`packages/api/data-access-db/src/lib/schema.prisma`

e.g. mongo db 向け

```prisma
model Dummy {
    //   id       String    @id
    id     String  @id @default(auto()) @map("_id") @db.ObjectId
    text   String?
    int    Int?
    float  Float?

    createdAt DateTime @default(now())
    updatedAt DateTime @default(now()) @updatedAt
}
```

### 2. feature-dummy を生成

```bash
cd apps/api
nest g resource api/dummies --no-spec

? What transport layer do you use? GraphQL (schema first)
? Would you like to generate CRUD entry points? Yes
```

下記の通りに、生成されたフォルダ/ファイルを整理する。

- entities フォルダを削除して、models フォルダを代わりに作成
- `dummies.graphql` を削除

### 3. api プロジェクトに、data-access-db パッケージを追加

`apps/api/package.json`

```json
  "dependencies": {
    "@repo/api-data-access-db": "*",
```

### 4. dummies.module.ts を修正

- PrismaModule を追加

```ts
import { PrismaModule } from '@repo/api-data-access-db';

@Module({
  providers: [DummiesResolver, DummiesService],
  imports: [PrismaModule]
})
export class DummiesModule {}
```

### 5. 他の各種ファイルを修正

修正ファイルは下記。詳細はファイルを参照のこと。

- `apps/api/src/api/dummies/dummies.service.ts`
- `apps/api/src/api/dummies/dummies.resolver.ts`


> `service`ファイルで利用している`prisma`では、別テーブルとリレーションを利用してデータ操作する場合、`include`を利用することに注意









### 6. dummies.service.ts を修正

詳細は下記ファイルを参照




### 7. AppModule に DummiesModule を追加

`apps/api/src/app/app.module.ts`

```ts
@Module({
  imports: [
    ...
    // ---- Graphql ---- //
    DummiesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
```