# 渉外安心手帳

## 準備

- [Web エンジニアになろう講習会](https://traptitech.github.io/naro-text/chapter1/) に従って環境構築
- [pnpm](https://pnpm.io/ja/installation) がない場合はインストール。 `npm install -g pnpm@10` など

## 起動

1. `.env.local.example` をもとに `.env.local` を用意
2. バックエンドをローカルで起動 `docker compose up`
3. フロントエンドの Node モジュールをインストール `pnpm i`
4. フロントエンドを起動 `pnpm dev`

## エラーの特定

```sh
pnpm exec eslint .                               # Lint エラー
pnpm exec vue-tsc --noEmit -p tsconfig.app.json  # コンパイルエラー
```
