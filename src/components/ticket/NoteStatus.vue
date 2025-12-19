<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ noteStatus: Note['status'] }>()

// prettier-ignore
const statusRepresentations = {
  draft:          { icon: 'mdi-pencil', color: 'blue',   text: '執筆中' },
  waiting_review: { icon: 'mdi-loupe',  color: 'green',  text: 'レビュー待ち' },
  waiting_sent:   { icon: 'mdi-send',   color: 'orange', text: '送信待ち' },
  canceled:       { icon: 'mdi-close',  color: 'red',    text: 'キャンセル済み' },
  sent:           { icon: '',           color: '',       text: '' },
}

const repr = computed(() => statusRepresentations[props.noteStatus])
</script>

<template>
  <div v-if="props.noteStatus !== 'sent'" class="d-flex flex-row align-center">
    <v-icon size="18" :color="repr.color" :icon="repr.icon" />
    <div :class="[`text-${repr.color}`, $style.text]">{{ repr.text }}</div>
  </div>
</template>

<style module>
.text {
  font-size: 11px;
  font-weight: bold;
  margin-left: 2px;
}
</style>
