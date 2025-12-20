import { ref, computed, readonly } from 'vue'
import { defineStore } from 'pinia'
import { dummyTickets } from '@/dummy'
import { TicketStatusList } from '@/types'

/**
 * 汎用的なフィルタリングロジックを提供するコンポーザブル
 * @param data フィルタリング対象のデータ配列（Ref）
 * @param masterLists 特定のキーに対するマスタデータ（順序指定用）
 */
export function useFilter<T extends Record<string, any>>(
  data: { value: T[] },
  masterLists: Partial<Record<keyof T, readonly any[]>> = {}
) {
  // フィルター条件がfiltersに入る
  const filters = ref<Partial<T>>({})

  const filteredData = computed(() => {
    // filetersに保存されたフィルター条件の項目を配列にする（["status","assignee"]みたいに）
    const keys = Object.keys(filters.value) as (keyof T)[]

    // ticketをフィルターする
    return data.value.filter((item) => {
      // フィルター条件に設定された項目ごとに中の関数を実施
      return keys.every((key) => {
        const filterValue = filters.value[key]
        // フィルタ値が設定されていない場合はスキップ（念のため）
        if (filterValue === undefined || filterValue === null) return true
        // ticketのkeyの項目がフィルター条件に指定された値と等しいか確認
        return item[key] === filterValue
      })
    })
  })

  // filtersを管理する関数
  const setFilter = <K extends keyof T>(key: K, value: T[K] | null) => {
    // ユーザーがフィルターを解除した時に、filtersの中からそのkeysを消す
    if (value === null || value === undefined) {
      delete filters.value[key]
    } else {
      // ユーザーがフィルターを使ったときにfiltersにkeyとvalueを追加
      filters.value[key] = value
    }
  }

  // data-tableにあるデータだけ持ってきてoptionにする。それぞれのkeyの型の配列が返されるようにジェネリクスで設定
  const getOptionValues = <K extends keyof T>(key: K): T[K][] => {
    // ステータスの場合はTicketStatusListの順に表示させたい。
    if (masterLists[key]) {
      const existingValues = new Set(data.value.map((item) => item[key]))
      // TicketStatusListの順に並べ替えされる
      return masterLists[key]!.filter((v) => existingValues.has(v)) as T[K][]
    }

    // .mapでkeyの列だけを抜き出して、Setでユニークなものだけにして、Array.fromで配列にする
    return Array.from(new Set(data.value.map((item) => item[key])))
  }

  return {
    filters: readonly(filters),
    filteredData,
    setFilter,
    getOptionValues,
  }
}

export const useTicketStore = defineStore('ticket', () => {
  const tickets = ref<Ticket[]>(dummyTickets)

  // 汎用フィルタロジックを使用
  // ステータスだけはマスタデータの順序を守るように指定
  const {
    filters,
    filteredData: filteredTickets,
    setFilter,
    getOptionValues,
  } = useFilter(tickets, {
    status: TicketStatusList,
  })

  return {
    tickets: readonly(tickets),
    filters,
    filteredTickets,
    setFilter,
    getOptionValues,
  }
})
