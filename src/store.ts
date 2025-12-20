// グローバル変数の管理

import { defineStore } from 'pinia'
import { ref, readonly, computed } from 'vue'
import { dummyTickets } from '@/dummy'
import { TicketStatusList } from '@/types'

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

export const useTicketStore = defineStore('ticket', () => {
  //
  const tickets = ref<Ticket[]>(dummyTickets)
  // フィルター条件がfiltersに入る
  const filters = ref<Partial<Ticket>>({})

  const filteredTickets = computed(() => {
    // filetersに保存されたフィルター条件の項目を配列にする（["status","assignee"]みたいに）
    const keys = Object.keys(filters.value) as (keyof Ticket)[]

    // ticketをフィルターする
    return tickets.value.filter((ticket) => {
      // フィルター条件に設定された項目ごとに中の関数を実施
      return keys.every((key) => {
        // ticketのkeyの項目がフィルター条件に指定された値と等しいか確認
        return ticket[key] === filters.value[key]
      })
    })
  })

  // filtersを管理する関数
  const setFilter = <K extends keyof Ticket>(key: K, value: Ticket[K] | null) => {
    // ユーザーがフィルターを解除した時に、filtersの中からそのkeysを消す
    if (value === null || value === undefined) {
      delete filters.value[key]
    } else {
      // ユーザーがフィルターを使ったときにfiltersにkeyとvalueを追加
      filters.value[key] = value
    }
  }

  // data-tableにあるデータだけ持ってきてoptionにする。それぞれのkeyの型の配列が返されるようにジェネリクスで設定
  const getOptionValues = <K extends keyof Ticket>(key: K): Ticket[K][] => {
    // ステータスの場合はTicketStatusListの順に表示させたい。
    if (key === 'status') {
      const unSortedList = new Set(tickets.value.map((t) => t.status))
      // TicketStatusListの順に並べ替えされる
      return TicketStatusList.filter((s) => unSortedList.has(s)) as Ticket[K][]
    }

    // .mapでkeyの列だけを抜き出して、Setでユニークなものだけにして、Array.fromで配列にする
    return Array.from(new Set(tickets.value.map((ticket) => ticket[key])))
  }

  return {
    tickets: readonly(tickets),
    filters: readonly(filters),
    filteredTickets,
    setFilter,
    getOptionValues,
  }
})
