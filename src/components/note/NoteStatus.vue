<script setup lang="ts">
import { computed } from 'vue'
import { NoteStatusMap } from '@/types'
const props = defineProps<{ noteStatus: Note['status'] }>()
const repr = computed(() => NoteStatusMap[props.noteStatus])
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
