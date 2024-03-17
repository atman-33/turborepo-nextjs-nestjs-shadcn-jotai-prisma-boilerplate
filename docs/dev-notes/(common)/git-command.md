# git コマンドメモ

## tag を remote にプッシュ

```bash
git push origin --tags
```

## git commit 実行取り消し（soft reset）

最新のコミットの内容をちょっとだけ修正したい時に「 git reset --soft HEAD^」とすると、インデックスには最新の変更をのこしたまま、HEAD だけを一つ前に巻き戻します。これによって、直前のgit commit 実行を取り消して、それがまだコミットされていない状態に戻れます。

```bash
git reset --soft HEAD~
```