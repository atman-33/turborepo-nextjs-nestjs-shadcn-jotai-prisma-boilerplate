# Eslint と Prettier 設定を変更

## ステップ

### 1. eslint にプロジェクト間の参照ルールを追加

`.eslintrc.json`

```json
      ...,
      "rules": {
        "@nx/enforce-module-boundaries": [
          "error",
          {
            "enforceBuildableLibDependency": true,
            "allow": [],
            "depConstraints": [
              {
                "sourceTag": "scope:shared",
                "onlyDependOnLibsWithTags": [
                  "scope:shared"
                ]
              },
              {
                "sourceTag": "scope:api",
                "onlyDependOnLibsWithTags": [
                  "scope:shared",
                  "scope:api"
                ]
              },
              {
                "sourceTag": "scope:web",
                "onlyDependOnLibsWithTags": [
                  "scope:shared",
                  "scope:web"
                ]
              }
            ]
          }
        ]
      }
      ...
```

### 2. prettier にルールを追加

 `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 100
}