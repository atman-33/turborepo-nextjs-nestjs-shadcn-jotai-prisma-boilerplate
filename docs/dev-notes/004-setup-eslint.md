# eslint をセットアップ

## web 

`apps/web/.eslintrc.js`

- features は `index.ts` ファイルからエクスポートするルールを追加

```js
  overrides: [
    {
      files: [
        "*.ts",
        "*.tsx",
        "*.js",
        "*.jsx"
      ],
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