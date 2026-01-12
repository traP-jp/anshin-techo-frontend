import { ref, computed, type Ref } from 'vue'
import { TICKET_STATUSES } from '@/lib/schema'

// コンポーザブルとして定義（defineStoreの代わりに普通の関数としてexport）
export const useTicketFilter = (originalTickets: Ref<Ticket[]>) => {
  // 複数選択に対応するため、各キーに対して「値の配列」を保存する型を定義
  type FilterState = { [K in keyof Ticket]?: Ticket[K][] }

  // フィルター条件がfiltersに入る
  const filters = ref<FilterState>({})

  const filteredTickets = computed(() => {
    // filtersに保存されたフィルター条件の項目を配列にする（["status","assignee"]みたいに）
    const keys = Object.keys(filters.value) as (keyof Ticket)[]

    // .filterでフィルターする
    return originalTickets.value.filter((ticket) => {
      // フィルター条件に設定された項目ごとに中の関数を実施
      return keys.every((key) => {
        const selectedValues = filters.value[key] as Ticket[keyof Ticket][] | undefined

        // 何も選択されていない（空配列）場合はスキップ
        if (!selectedValues || selectedValues.length === 0) {
          return true
        }

        // ticketのkeyの項目がフィルター条件（配列）に含まれているか確認
        return selectedValues.includes(ticket[key])
      })
    })
  })

  // filtersを管理する関数
  const setFilter = <K extends keyof Ticket>(key: K, values: Ticket[K][]) => {
    // ユーザーがフィルターを解除した時に（空配列）、filtersの中からそのkeysを消す
    if (values.length === 0) {
      delete filters.value[key]
    } else {
      // ユーザーがフィルターを使ったときにfiltersにkeyとvalue（配列）を追加
      filters.value[key] = values as FilterState[K]
    }
  }

  // data-tableにあるデータだけ持ってきてoptionにする。それぞれのkeyの型の配列が返されるようにジェネリクスで設定
  const getOptionValues = <K extends keyof Ticket>(key: K): Ticket[K][] => {
    // ステータスの場合はTicketStatusListの順に表示させたい。
    if (key === 'status') {
      const unSortedList = new Set(originalTickets.value.map((t) => t.status))
      // TicketStatusListの順に並べ替えされる
      return TICKET_STATUSES.filter((s) => unSortedList.has(s)) as Ticket[K][]
    }

    // .mapでkeyの列だけを抜き出して、Setでユニークなものだけにして、Array.fromで配列にする
    return Array.from(new Set(originalTickets.value.map((ticket) => ticket[key])))
  }

  // UIコンポーネント (v-select等) が必要とする value と items をセットにする関数
  // 戻り値の型定義はTypeScriptの推論に任せることで記述を省略
  const register = <K extends keyof Ticket>(key: K) => {
    return {
      // v-model用（読み書き可能）
      value: computed({
        get: () => filters.value[key] ?? [],
        set: (vals: Ticket[K][]) => setFilter(key, vals),
      }),
      // 選択肢用（読み取り専用）
      items: computed(() => getOptionValues(key)),
    }
  }

  return {
    filteredTickets,
    register,
  }
}
