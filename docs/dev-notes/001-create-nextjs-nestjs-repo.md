# NextJS、NestJS、Turborepo を使用したモノレポプロジェクトをセットアップ

## 参考URL

[Turborepoを利用したmonorepo構成のNestJS+Prismaプロジェクトの構築](https://tech-blog.s-yoshiki.com/entry/296)

[How to setup a monorepo project using NextJS, NestJS, Turborepo and pnpm](https://medium.com/@chengchao60827/how-to-setup-a-monorepo-project-using-nextjs-nestjs-turborepo-and-pnpm-e0d3ade0360d#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjA5YmNmODAyOGUwNjUzN2Q0ZDNhZTRkODRmNWM1YmFiY2YyYzBmMGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc4Mzc1MDUwODI0NzA3Njk5MjEiLCJlbWFpbCI6ImdwYmprMDMwNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzEwNTczMDQyLCJuYW1lIjoiQXRtYW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTERvaXo4aDdEWmQzVG5Hbkk3U3p5VmQ4VWwxbWFfWk5GUjBxYUZBVF9wPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkF0bWFuIiwibG9jYWxlIjoiamEiLCJpYXQiOjE3MTA1NzMzNDIsImV4cCI6MTcxMDU3Njk0MiwianRpIjoiZmRkZTkzNjE4ZWU4YWM4MWM4MWMyNDgyNDFlOWQ0ZTQxZDE4MmY3NSJ9.e0eZsmJwxT9xT1hTtdxEyc7TVND82TBojUUj219XG9-_2MlUamr6w1uOGc9uiP4xQodpEFfffWwFfMoRbgvB-J5kxJMM1w5Xs3nIprZkh9LGPOMhF3VvotAB-kJRRiA8GVqGfmm8-5QlUVgmTM278VTEyk1qnoORFPjW8Xb1JN_STIInm-DNoWH7JSPbbOHmn9t4zRucVoszM_SUl-wxsJRTMjNkBURdUuKe9CSNI8XwexE5vAqWpy-WjvtDdgTKnH_OaT25caLdduV9kAKQrcprstH6DS1BSOQd7DRCc2n0q9HcjRcGt-NOujA6bobJkRkEzcf1Tn2vEnbjieUTug)

[Setup a Monorepo with Turborepo, Next.js, and Tailwind CSS](https://mrizkiaiman.medium.com/setup-a-monorepo-with-turborepo-next-js-and-tailwind-css-5cd751d34bc9)

## ステップ

### 1. パッケージをインストール

node, turbo をインストール

```bash
nvm install node
npm i -g turbo
```

nestjs cli をインストール

```bash
npm i -g @nestjs/cli
```

### 2. モノレポプロジェクトを作成

```bash
mkdir <Project name>
cd <Project name>
npx create-turbo@latest
```

e.g.  

```bash
mkdir turborepo-nextjs-nestjs-shadcn-prisma-boilerplate
cd turborepo-nextjs-nestjs-shadcn-prisma-boilerplate
npx create-turbo@latest
```

```bash
>>> TURBOREPO

>>> Welcome to Turborepo! Let's get you set up with a new codebase.

? Where would you like to create your turborepo? .
? Which package manager do you want to use? npm workspaces

Downloading files. This might take a moment.

>>> Created a new Turborepo with the following:

apps
 - apps/docs
 - apps/web
packages
 - packages/eslint-config
 - packages/typescript-config
 - packages/ui

Installing packages. This might take a couple of minutes.

>>> Success! Your new Turborepo is ready.
Inside this directory, you can run several commands:

  npm run build
     Build all apps and packages

  npm run dev
     Develop all apps and packages

  npm run lint
     Lint all apps and packages

Turborepo will cache locally by default. For an additional
speed boost, enable Remote Caching with Vercel by
entering the following command:

  npx turbo login

We suggest that you begin by typing:

  npx turbo login
```

> apps/docs は不要なため、削除してよい。

### 2. Next.js のアプリケーションコードをsrcフォルダ直下に移動

- `src`フォルダを作成

```bash
mkdir apps/web/src
```

- `app`フォルダを`src`フォルダ直下に移動

- tsconfig.json の path を変更

`apps/web/tsconfig.json`

```json
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
```

### 3. NestJS を追加

```bash
# -yオプションは、対話形式のプロンプトをスキップしてデフォルト設定
npm init -y -w apps/api

cd apps/api

# nest new コマンドを利用したいため削除
rm package.json 
npx nest new .
```

> package管理はnpmを選択

```bash
⚡  We will scaffold your app in a few seconds..

? Which package manager would you ❤️  to use? npm
CREATE .eslintrc.js (663 bytes)
CREATE .prettierrc (51 bytes)
CREATE README.md (3340 bytes)
CREATE nest-cli.json (171 bytes)
CREATE package.json (1942 bytes)
CREATE tsconfig.build.json (97 bytes)
CREATE tsconfig.json (546 bytes)
CREATE src/app.controller.ts (274 bytes)
CREATE src/app.module.ts (249 bytes)
CREATE src/app.service.ts (142 bytes)
CREATE src/main.ts (208 bytes)
CREATE test/jest-e2e.json (183 bytes)
CREATE src/app.controller.spec.ts (617 bytes)
CREATE test/app.e2e-spec.ts (630 bytes)

✔ Installation in progress... ☕

🚀  Successfully created a new project
👉  Get started with the following commands:

$ cd .
$ npm run start

                                         
                          Thanks for installing Nest 🙏
                 Please consider donating to our open collective
                        to help us maintain this package.
```  

自動生成される`api/.git`は削除しておく。

```bash
# currently under root directory
cd apps/api
rm -rf .git
```

ルートディレクトリから`npm run dev`を行った場合に、NestJSも同時に起動できるようにスクリプトを追加

`apps/api/package.json`

```json
  "scripts": {
    ...,
    "dev": "nest start --watch",
    ...,
  }
```

### 4. tsconfig.json に、エイリアスパスを追加

`apps/web/tsconfig.json`

```json
{
  ...,
  "compilerOptions": {
    ...,
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  },
}
```

`apps/api/tsconfig.json`

```json
{
  ...,
  "compilerOptions": {
    ...,
    "paths": {
      "@/*": [
        "./src/*"
      ],
    }
  },
}
```