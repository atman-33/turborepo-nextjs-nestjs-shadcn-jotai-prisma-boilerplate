## 現象

Turborepoで作成したNestJSプロジェクトで、InternalPackage を呼び出すと、
`Error: Cannot find module` エラーが発生する。

以下、参考記事

<https://www.reddit.com/r/nestjs/comments/17elbwg/turborepo_internal_packages/>
<https://www.reddit.com/r/node/comments/18xs8tq/using_an_shared_prisma_client_from_turborepo_in_a/>


## 対処方法

現状は解決策が見つからない。  
JS系のモノレポであればNxを利用するか、InternalPackageを利用しない構成で回避する。

**2024/03/31 追記**

InternalPackageをJavaScriptにコンパイルしたファイルであれば、NestJSプロジェクトから参照可能となる。

- tsup をワークスペースにインストール

```bash
npm i -D tsup -w <workspace>
```

tsup では、distフォルダにファイルが出力される。

- buildコマンドで、distフォルダに出力したファイルをexportするように変更

`package.json`

```json
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "npm run build -- --watch"
  },
```

後は、NestJSプロジェクトを起動する前に、InternalPackageをビルドして、パッケージ追加しておけばOK  

```bash
npm run build -w <workspace>
npm i
```