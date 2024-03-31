# Shadcn セットアップ（turborepo 向け）

## 参考URL

[https://ui.shadcn.com/](https://ui.shadcn.com/docs/installation/manual)

[component.json needs to load tsconfig.json](https://github.com/shadcn-ui/ui/issues/718)  

[Radix × Tailwindなshadcn/uiがいい感じ](https://qiita.com/hajimism/items/e7bbe3711b43a8579224)  

[shadcn/uiライブラリを使いこなすための基礎](https://reffect.co.jp/react/shadcn-react/)  

[turborepo-shadcn-ui](https://github.com/dan5py/turborepo-shadcn-ui/tree/main)

## ステップ

### 1. 必要なパッケージをインストール

- `packages/ui`に必要なパッケージをインストール

```bash
npm -w packages/ui install --save-dev @types/node @types/react autoprefixer postcss tailwindcss typescript
npm -w packages/ui install @radix-ui/react-slot class-variance-authority clsx lucide-react tailwind-merge tailwindcss-animate
```

### 2. tsconfig.json に @ui/* の path を追加

`packages/ui/tsconfig.json`

```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@repo/ui/*": [
        "./src/*"
      ]
    }
  },
  ...
}
```

### 3. postcss.config.js を作成

`packages/ui/postcss.config.js`

```js
// eslint-disable-next-line no-undef
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 4. tailwind.config.js を作成  

`packages/ui/tailwind.config.ts`    

```js: tailwind.config.ts
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
```

### 5. globals.css を作成

`packages/ui/src/globals.css`

```css: globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;

    --ring: 215 20.2% 65.1%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;

    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;

    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;

    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;

    --border: 216 34% 17%;
    --input: 216 34% 17%;

    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;

    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --ring: 216 34% 17%;

    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

### 6. utils.ts を作成

`packages/ui-shadcn/src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 7. components.json を作成

`packages/ui/components.json`

```json:components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@repo/ui/components",
    "utils": "@repo/ui"
  }
}
```

### 8. index.ts を作成

`packages/ui/src/index.ts`

```ts
export * from "./lib/utils";
```

> shadcn コンポーネント追加時は、このファイルにexportを追加していく。

e.g.  

```ts
export * from "./components/ui/button";
export * from "./lib/utils";
```

### 9. package.json に exports を追加

`packages/ui/package.json`

```json
  ...,
  "exports": {
    "./globals.css": "./src/globals.css",
    "./postcss.config": "./postcss.config.js",
    "./tailwind.config": "./tailwind.config.ts",
    ".": "./src/index.ts"
  }
```

### 10. web に、tailwind と shadcn を利用するための設定

`apps/web/package.json`

```json
  "dependencies": {
    "@repo/ui": "*",
    ...
```

`apps/web/next.config.js`

```js
/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
};
```

`apps/web/tailwind.config.ts`

```ts
export * from "@repo/ui/tailwind.config";
```

`apps/web/postcss.config.js`

```js
module.exports = require('@repo/ui/postcss.config');
```

### 11. web に、globals.css をインポート

最上位の layout に、 shadcn の globals.css を追加 

`apps/web/app/layout.tsx`

```tsx
import '@repo/ui/globals.css';

```

## 利用方法

他のワークスペースでパッケージを利用するため、package.json の dependencies を変更した場合は、ルートディレクトリで npm インストールしておく。

```bash
# currently under root directory
npm i
```

### 1. Button をインストール

```bash
# currently under root directory
cd packages/ui
npx shadcn-ui@latest add button
```

### 2. index.tsにButtonのExportを追加

`packages/ui/src/index.ts`

```ts
export * from './components/ui/button';
```

### 3. 利用例

e.g.  

```tsx
import { Button } from '@repo/ui';

const Page = () => {
  return (
    <>
      <Button>ボタン</Button>
    </>
  );
}

export default Page
```