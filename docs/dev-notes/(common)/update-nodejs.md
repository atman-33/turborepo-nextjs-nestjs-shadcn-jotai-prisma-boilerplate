# Node.js の ver. アップデート方法

## 参考URL

[UbuntuへのNode.jsのインストール](https://zenn.dev/toyonobu/articles/20230121-node-install-for-ubuntu)

## ステップ

## 1. アップデート & 旧バージョン削除

```bash
sudo apt update
sudo apt install nodejs npm
sudo npm -g install n
sudo n stable
sudo apt purge nodejs npm
sudo apt autoremove
```

## 2. ver. 確認
```bash
node --version
npm --version
```