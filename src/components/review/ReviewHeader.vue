<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/store'
import NoteLayout from '@/components/note/NoteLayout.vue'
import NoteContentEditor from '@/components/note/NoteContentEditor.vue'
import SpeechSheet from '@/components/shared/SpeechSheet.vue'
import SpoilerViewer from '@/components/shared/SpoilerViewer.vue'

const userStore = useUserStore()
const props = defineProps<{ note: Note; visible: boolean }>()
const emit = defineEmits<{ close: [] }>()

const approvedCount = computed(() => {
  return props.note.reviews.filter((r) => r.type === 'approval').length
})
const requiredCount = 5

const progress = computed(() => {
  return Math.min((approvedCount.value / requiredCount) * 100, 100)
})

const isMyNote = computed(() => userStore.userId === props.note.author)
</script>

<template>
  <div class="d-flex flex-column bg-background pa-4">
    <div class="d-flex flex-row align-center mb-4">
      <v-btn icon="mdi-close" variant="text" density="comfortable" @click="emit('close')" />
      <div class="ml-2">このノートに対するレビュー</div>
    </div>
    <note-layout :note="note" full-width>
      <speech-sheet class="mt-1">
        <note-content-editor v-if="isMyNote" :note="note" :is-readonly="true" />
        <spoiler-viewer v-else :text="note.content" :visible="visible" />
      </speech-sheet>
    </note-layout>
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
  </div>
</template>

<style module>
.border {
  width: 1.5px;
  height: 14px;
  margin-top: 2px;
}
</style>
