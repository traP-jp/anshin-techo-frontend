import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import { dummyTickets } from '@/dummy'
import { TicketStatusList } from '@/types'

export const useTicketStore = defineStore('ticket', () => {
  // データ
  const tickets = ref<Ticket[]>(dummyTickets)
  // フィルター条件がfiltersに入る
  const filters = ref<Partial<Ticket>>({})

  const filteredTickets = computed(() => {
    // filetersに保存されたフィルター条件の項目を配列にする（["status","assignee"]みたいに）
    const keys = Object.keys(filters.value) as (keyof Ticket)[]

    // .filterでフィルターする
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
      filters.value[key] = value as Ticket[K]
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
