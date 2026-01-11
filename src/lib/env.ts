// 環境変数の型定義とバリデーション

import { z } from 'zod'

const envSchema = z.object({
  // Vite が自動で注入する変数
  MODE: z.enum(['development', 'production', 'staging']).default('development'),
  BASE_URL: z.string(),
  PROD: z.boolean(),
  DEV: z.boolean(),
  SSR: z.boolean().default(false),

  // .env などで定義する環境変数
  VITE_TRAQ_ID: z.string().optional(),
})

const safeEnv = envSchema.safeParse(import.meta.env)

if (!safeEnv.success) {
  console.error(z.treeifyError(safeEnv.error))
  throw new Error('Invalid environment variables')
}

export const env = safeEnv.data
