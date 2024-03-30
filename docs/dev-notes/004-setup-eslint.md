# eslint をセットアップ

## web 

`apps/web/.eslintrc.js`

- features は `index.ts` ファイルからエクスポートするルールを追加

```js
  overrides: [
    {
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: ['@/features/*/*'],
          },
        ],
      }
    }
  ]
```