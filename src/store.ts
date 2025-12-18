// グローバル変数の管理

import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userId = ref<string>()
  const initUser = async () => {
    await new Promise((resolve) => setTimeout(resolve, 10))
    userId.value = 'kitsne' // バックエンドの API が用意され次第リクエスト送信に置き換える
  }
  const isStakeholder = (ticket: Ticket) => {
    if (!userId.value) return false
    return (
      ticket.assignee === userId.value ||
      ticket.sub_assignees.includes(userId.value) ||
      ticket.stakeholders.includes(userId.value)
    )
  }

  return { userId: readonly(userId), initUser, isStakeholder }
})
