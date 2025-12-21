// グローバル変数の管理

import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'
import { api } from '@/api'

export const useUserStore = defineStore('user', () => {
  const userId = ref<string>()
  const initUser = async () => {
    await new Promise((resolve) => setTimeout(resolve, 10))
    userId.value = (await api.getMe()).id
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
