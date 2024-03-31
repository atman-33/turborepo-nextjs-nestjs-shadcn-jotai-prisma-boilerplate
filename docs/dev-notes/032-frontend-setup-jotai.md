# Recoil セットアップ

## 参考URL

[jotai](https://jotai.org/)

## 導入ステップ

### 1. パッケージをインストール

```bash
npm i jotai
```
### 2. JotaiProvider を準備

`apps/web/src/providers/JotaiProvider.tsx`

```tsx
'use client'

import { Provider } from 'jotai';
import React from 'react';

const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider>
        {children}
      </Provider>
    )
}

export default JotaiProvider
```

### 3. JotaiProvider を適用

`apps/web/src/app/layout.tsx`

```tsx
...
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JotaiProvider>{children}</JotaiProvider>
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