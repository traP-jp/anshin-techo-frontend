// グローバル変数の管理

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<string>()
  const initUser = async () => {
    await new Promise((resolve) => setTimeout(resolve, 10))
    user.value = 'kitsne' // バックエンドの API が用意され次第リクエスト送信に置き換える
  }

  return { user, initUser }
})
