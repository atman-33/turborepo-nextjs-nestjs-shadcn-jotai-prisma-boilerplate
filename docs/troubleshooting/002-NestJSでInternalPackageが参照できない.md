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

- ビルド時に、distフォルダにjsファイルを出力するように変更

`tsconfig.json`

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "experimentalDecorators": true,
    "outDir": "./dist",
  }
}
```

- distに出力したindex.jsファイルをexportするように変更

`package.json`

```json
  "exports": {
    ".": "./dist/index.js"
  },
  "types": "./dist/index.d.ts",
```

NestJSプロジェクトから上記を設定したパッケージを読み込む際は、事前に参照するパッケージをビルドしておく。