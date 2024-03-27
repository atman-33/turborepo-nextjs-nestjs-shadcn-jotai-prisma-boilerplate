# Recoil セットアップ

## 参考URL

<https://zenn.dev/yamakenji24/articles/55d9f15b03eb7f>
<https://tech.spacely.co.jp/entry/2023/09/27/184625>

## 導入ステップ

### 1. パッケージをインストール

```bash
npm i recoil
```

```bash
npm i recoil-persist
```

> state を永続化する場合は、`recoil-persist`もインストール必要
> [recoil-persist で Recoil のステートを永続化する](https://scrapbox.io/slashnephy/recoil-persist_%E3%81%A7_Recoil_%E3%81%AE%E3%82%B9%E3%83%86%E3%83%BC%E3%83%88%E3%82%92%E6%B0%B8%E7%B6%9A%E5%8C%96%E3%81%99%E3%82%8B)

### 2. RecoilProviderを準備

`apps/web/src/providers/RecoilProvider.tsx`

```tsx
'use client';

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

const RecoilProvider = ({ children }: { children: ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
```

### 3. RecoilProviderを適用

`apps/web/src/app/layout.tsx`

```tsx
...
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <RecoilProvider>
          <div>{children}</div>
        </RecoilProvider>
      </body>
    </html>
  );
}
```

### 4. useRecoilCallback の依存配列をチェック

eslint に、useRecoilCallback の依存配列をチェックするルールを追加

`.eslintrc.json`

```json
{
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn", {
        "additionalHooks": "useRecoilCallback"
      }
    ]
  }
}
```