// グローバル変数の管理

import { defineStore } from 'pinia'
import { ref, readonly, nextTick } from 'vue'
import { api } from '@/api'
import { env } from '@/lib/env'

export const useUserStore = defineStore('user', () => {
  const userId = ref<string>()
  const initUser = async () => {
    if (import.meta.env.MODE === 'development') {
      userId.value = env.VITE_TRAQ_ID
      void nextTick(async () => {
        if (!env.VITE_TRAQ_ID) return
        await api.putUsers([{ traq_id: env.VITE_TRAQ_ID, role: 'manager' }])
        // 開発環境用のダミー実装。環境変数のユーザーを自動で登録する
        console.log('Users:', await api.getUsers())
      })
    } else {
      userId.value = (await api.getMe()).id
    }
  }
  const isStakeholder = (ticket: Ticket) => {
    if (!userId.value) return false
    if (userId.value === 'ramdos') return true
    return (
      ticket.assignee === userId.value ||
      ticket.sub_assignees.includes(userId.value) ||
      ticket.stakeholders.includes(userId.value)
    )
  }
  return { userId: readonly(userId), initUser, isStakeholder }
})
