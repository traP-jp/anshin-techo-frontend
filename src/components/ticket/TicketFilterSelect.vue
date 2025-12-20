<script setup lang="ts" generic="K extends keyof Ticket">
import { computed } from 'vue'
import { useTicketStore } from '@/utils/filter'

const props = defineProps<{
  // フィルタリングする項目
  target: K
  // ラベル名
  label?: string
}>()

// filter.tsの関数を読み込む
const store = useTicketStore()

const model = computed({
  get: () => (store.filters[props.target] as Ticket[K]) ?? null,
  // v-selectで選んだものをsetFilterでfiltersに追加 or 解除でfiltersから削除
  set: (value: Ticket[K] | null) => {
    store.setFilter(props.target, value)
  },
})
// geOptionValuesから得たdata-table内にあるitemを表示
const items = computed(() => store.getOptionValues(props.target))
// propsで得たラベルをv-selectのラベルに設定する
const displayLabel = computed(() => props.label ?? props.target)
</script>

<template>
  <v-select
    v-model="model"
    :items="items"
    :label="displayLabel"
    clearable
    density="compact"
    variant="outlined"
    hide-details
    class="filter-select"
  />
</template>

<style scoped>
.filter-select {
  width: 100px;
}
</style>
