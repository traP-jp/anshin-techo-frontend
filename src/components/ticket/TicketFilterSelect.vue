<script setup lang="ts" generic="K extends keyof Ticket">
import { computed } from 'vue'
import { useTicketStore } from '@/utils/filter'

const props = defineProps<{
  target: K
  label?: string
}>()

const store = useTicketStore()

const model = computed({
  get: () => (store.filters[props.target] as Ticket[K]) ?? null,
  set: (value: Ticket[K] | null) => {
    store.setFilter(props.target, value)
  },
})

const items = computed(() => store.getOptionValues(props.target))
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
