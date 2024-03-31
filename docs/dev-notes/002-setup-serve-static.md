# Nextjsで、SSGビルド設定

## ステップ

### 1. next.config.js をSSGビルド向けに変更

`apps/web/next.config.js`

```js
const nextConfig = {
    ...,
    images: {
        unoptimized: true,
    },
    output: 'export',
    trailingSlash: true
};
```

### 2. ServeStaticModule をNestjsプロジェクトに追加

パッケージをインストール

```bash
npm -w apps/api install @nestjs/serve-static
```

Nestjsプロジェクトに`ServeStaticModule`を追加

`apps/api/src/app/app.module.ts`

```ts
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'web/out'),
      exclude: ['/api/*', '/api/graphql']
    }),
```

以上により、`api`と`web`をビルド後に`api`を起動すると、Nextjs アプリにアクセス可能となる。
