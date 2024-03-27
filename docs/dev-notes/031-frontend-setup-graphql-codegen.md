# graphql-codegen をセットアップ

## 参考URL

<https://zenn.dev/layerx/articles/028cb518cffd61> 
<https://nhost.io/blog/how-to-use-graphql-code-generator-with-react-and-apollo>
<https://zenn.dev/optimisuke/articles/8de632308cebeb>
<https://zenn.dev/sky/articles/47b86d3387389d>
<https://zenn.dev/buyselltech/articles/b64935ea7d6fee>

## ステップ

### 1. data-access-graphql パッケージを生成

```bash
npm init -y -w packages/data-access-graphql
```

`packages/data-access-graphql/package.json`

- name を変更

```json
  "name": "@repo/data-access-graphql",
```

- eslint, typeconfig の依存関係を追加

```json
  "dependencies": {
    "@repo/eslint-config": "*",
    "@repo/typescript-config": "*",
```

### 2. tsconfig を追加

`packages/data-access-graphql/tsconfig.json`

```json
{
    "extends": "@repo/typescript-config/base.json",
    "compilerOptions": {
        "esModuleInterop": true,
        "moduleResolution": "Node",
        "module": "commonjs",
    }
}
```

### 3. パッケージをインストール

デフォルトで必要  

```bash
npm -w packages/data-access-graphql i -D typescript ts-node 
npm -w packages/data-access-graphql i graphql-request
```

graphql-codegen/graphql-request用に必要  

```bash
npm i @graphql-codegen/cli @graphql-codegen/client-preset
npm i -D @graphql-codegen/typescript @graphql-codegen/typescript-graphql-request @graphql-codegen/typescript-operations
```

### 4. codegen.yml を作成

`tools/graphql-codegen/codegen.ts`

```ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const codegenConfig: CodegenConfig = {
  overwrite: true,
  schema: 'apps/api/dist/autogenerated-schema.gql',
  documents: ['apps/web/**/*.graphql', 'packages/**/*.graphql'],
  generates: {
    'packages/data-access-graphql/src/lib/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        gqlImport: 'graphql-request#gql',
        pureMagicComment: true,
        optimizeDocumentNode: true,
        omitOperationSuffix: true
      }
    }
  }
};

export default codegenConfig;
```

### 5. graphqlコードを準備

e.g. `packages/data-access-graphql/src/lib/sample.graphql`

```graphql
query getDummies {
  dummies {
    id
    text
    createdAt
    updatedAt
  }
}
```

> config 設定により、web or packages内の`.graphql`ファイルからコードを自動生成する。

### 6. コード生成用のスクリプトを追加

`package.json`

```json
"scripts": {
    ...,
    "----START----": "-------------------------",
    "start:gql": "graphql-codegen --config tools/graphql-codegen/codegen.ts",
    ...,
```

スクリプト実行により、コードを自動生成する。

```bash
npm run start:gql
```

### 7. getGraphqlClient を作成

`packages/data-access-graphql/src/lib/get-graphql-client.ts`

```ts
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders, MaybeLazy } from 'graphql-request/build/esm/types';
import { getSdk } from './types';

export const getGraphqlClient = (
  url: string,
  headers?: MaybeLazy<GraphQLClientRequestHeaders> | undefined
) => {
  const client = new GraphQLClient(url, {
    headers
  });

  return getSdk(client);
};
```

### 8. data-access-graphql に index.ts を作成

`packages/data-access-graphql/src/index.ts`

```ts
export * from './lib/get-graphql-client';
export * from './lib/types';
```

### 9. web に data-access-graphql 参照を追加

- package.json に依存関係を追加

`apps/web/package.json`

```json
  "dependencies": {
    ...,
    "@repo/data-access-graphql": "*",
```

- next.config.js のトランスパイルパッケージに追加

`apps/web/next.config.js`

```json
  transpilePackages: ["@repo/ui", "@repo/data-access-graphql" ,  ...],
```

### 10. graphql-client を作成

`apps/web/src/lib/graphql-client.ts`

```ts
import { webEnv } from '@/config';
import { getGraphqlClient } from '@repo/data-access-graphql';

if (!webEnv.api.gqlUrl) {
  throw new Error('env: NEXT_PUBLIC_API_GQL_URL is not defined');
}

export const gql: ReturnType<typeof getGraphqlClient> = getGraphqlClient(webEnv.api.gqlUrl);
```

## 利用例

e.g. Nextjs. page コンポーネント

```ts
'use client';

import { gql } from '@/lib/graphql-client';
import { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    const fetch = async () => {
      const dummies = await gql.queryExample();
      console.log(dummies);
    };

    fetch();
  });
  ...
```