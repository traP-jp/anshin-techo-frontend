<script setup lang="ts">
import { computed } from 'vue'
import NoteItem from '@/components/note/NoteItem.vue'

const props = defineProps<{ note: Note }>()

const approvedCount = computed(() => {
  return props.note.reviews.filter((r) => r.type === 'approval').length
})
const requiredCount = 5

const progress = computed(() => {
  return Math.min((approvedCount.value / requiredCount) * 100, 100)
})
</script>

<template>
  <div class="d-flex flex-column bg-background pa-4">
    <note-item :note="note" :is-focused="false" for-review />
    <div class="d-flex flex-row w-100 ml-10 mt-3 ga-2">
      <div class="d-flex flex-column ga-1" style="width: 60%">
        <p class="text-body-2 text-grey-darken-2 mb-2">承認</p>
        <v-progress-linear
          :model-value="progress"
          :chunk-count="requiredCount"
          chunk-gap="2"
          :color="approvedCount >= requiredCount ? 'success' : 'primary'"
          height="18"
          class="flex-grow-1"
        >
          <small class="text-white">{{ approvedCount }}/{{ requiredCount }}</small>
        </v-progress-linear>
      </div>
      <v-select
        :model-value="note.status"
        label="ノートステータス"
        variant="outlined"
        density="compact"
        hide-details
        class="mr-12"
      />
    </div>
    <p class="text-body-2 text-grey-darken-2 ml-10 mt-2">Note ID: {{ note.id }}</p>
    <div class="d-flex justify-end">
      <v-btn class="text-body-2">CANCEL</v-btn>
      <v-btn class="text-body-2">OK</v-btn>
    </div>
  </div>
</template>

<style module>
.border {
  width: 1.5px;
  height: 14px;
  margin-top: 2px;
}
</style>
