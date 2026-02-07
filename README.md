# 渉外安心手帳

## 準備

- [Web エンジニアになろう講習会](https://traptitech.github.io/naro-text/chapter1/) に従って環境構築
- [pnpm](https://pnpm.io/ja/installation) がない場合はインストール

## 起動

1. `.env.local.example` をもとに `.env.local` を用意
2. バックエンドをローカルで起動 `docker compose up`
3. フロントエンドを起動 `pnpm dev`

## エラーの特定

```sh
npx eslint .                               # Lint エラー
npx vue-tsc --noEmit -p tsconfig.app.json  # コンパイルエラー
```
