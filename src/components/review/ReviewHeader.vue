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
      <v-progress-linear
        :model-value="60"
        chunk-count="5"
        chunk-gap="8"
        color="input"
        height="4"
        class="my-2"
      />
    </note-layout>
  </div>
</template>

<style module>
.border {
  width: 1.5px;
  height: 14px;
  margin-top: 2px;
}
</style>
