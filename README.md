# 渉外安心手帳

## 起動

1. `.env.local.example` をもとに `.env.local` を用意
2. バックエンドをローカルで起動 `docker compose up`
3. フロントエンドを起動 `npm run dev`

## エラーの特定

```sh
npx eslint .
npx vue-tsc --noEmit -p tsconfig.app.json
```
