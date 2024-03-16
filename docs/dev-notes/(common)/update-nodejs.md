# Node.js の ver. アップデート方法

## 参考URL

<https://qiita.com/cointoss1973/items/c000c4f84ae4b0c166b5>

## ステップ

## 1. nコマンド導入

```bash
sudo apt install nodejs npm
sudo npm install n -g
```

## 2. 推奨版(lts) のインストール
```bash
sudo n lts
```

## 3. 古い nodejs npm の削除
```bash
sudo apt purge nodejs npm
```