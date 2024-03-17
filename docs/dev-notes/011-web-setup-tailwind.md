# Tailwindcss をセットアップ

tailwind を複数のリポジトリで共有するため、Turbo に tailwind をワークスペースとして追加する。  

## ステップ

### 1. tailwind 用のフォルダとファイルを追加  

- フォルダとファイルを生成

```bash
npm init -y -w packages/config/tailwind-config

touch packages/config/tailwind-config/tailwind.config.ts
touch packages/config/tailwind-config/tsconfig.json
```

- package.json を修正

`packages/config/tailwind-config/package.json`

```json
{
  "name": "@repo/tailwind-config",
  "version": "0.0.0",
  "private": true,
  "exports": {
    ".": "./tailwind.config.ts"
  },
  "devDependencies": {
    "@repo/typescript-config": "*",
  }
}
```

- tailwind.config.ts を修正

`packages/config/tailwind-config/tailwind.config.ts`

```js
import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
    },
  },
  plugins: [],
};
export default config;
```

- tsconfig.json を修正

`packages/config/tailwind-config/tsconfig.json`

```json
{
  "extends": "@repo/typescript-config/base.json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```

### 2. tailwind-config に必要なパッケージをインストール

```bash
# currently under <Project name> directory
npm -w packages/config/tailwind-config install --save-dev tailwindcss postcss autoprefixer
npm -w packages/config/tailwind-config install tailwindcss-animate
```

### 3. web に、tailwind.config と postcss.config を追加

`apps/web/tailwind.config.ts`

```ts
// tailwind config is required for editor support

import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./app/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;
```

`apps/web/postcss.config.js`

```ts
// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Lintエラーが発生するため、Lint対象から`postcss.config.js`を除外する。

`.eslintignore`

```eslintignore
apps/web/postcss.config.js
```

### 4. globals.css に tailwind を追加

`apps/web/styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. layout.tsx に、globals.css を反映

`apps/web/app/layout.tsx`

```tsx
import '@/styles/globals.css';
```

> デフォルトで作成されている`globals.css`と`page.module.css`は不要のため削除
> - apps/web/app/globals.css
> - apps/web/app/page.module.css

### 6. パッケージを再インストール

ルートディレクトリで`npm i`を実行し、`@repo/tailwind-config`を他プロジェクトで利用できるようにする。

```bash
# currently under <Project name> directory
npm i
```