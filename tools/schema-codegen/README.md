# 自動コード作成ツール

`schema.prisma`のモデルをベースに、apiで利用する各種ファイルを生成する。

## フォルダ構成

```sh
schema-codegen
|
+-- @generated    # 自動生成されたソースファイル  
|
+-- lib           # ロジックファイル
|
+-- templates     # 自動生成の元となるテンプレートファイル
|
+-- index.ts      # 実行ファイル
```

## 利用ステップ

### 1. prisma のスキーマファイル参照先を設定

`tools/schema-codegen/index.ts`

```ts
// ---- Constants ---- //
const FOLDER_PATH = 'packages/api/data-access-db/src/lib';
const FILE_NAME = 'schema.prisma';
// ------------------- //
```

### 2. 自動生成先のフォルダをignoreに追加

`.gitignore`

```gitignore
# schema-codegen generated files
/tools/schema-codegen/@generated
```

`.eslintignore`

```eslintignore
# schema-codegen generated files
/tools/schema-codegen/@generated
```

### 3. 自動コード生成を実行

```bash
npx ts-node tools/schema-codegen/index.ts
```

## その他

### 変換文字について

- `__model__`               => e.g. SampleDummy 
- `__model_plural__`        => e.g. SampleDummies
- `__model_kebab__`         => e.g. sample-dummy
- `__model_plural_kebab__`  => e.g. sample-dummies
- `__model_camel__`         => e.g. sampleDummy
- `__model_plural_camel__`  => e.g. sampleDummies
- `__columns__`             
  => e.g.  
     id  
     name  
     message  
     ...etc   