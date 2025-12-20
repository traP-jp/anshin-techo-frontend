<script setup lang="ts">
import SpoilerViewer from '@/components/shared/SpoilerViewer.vue'
import SpeechSheet from '@/components/shared/SpeechSheet.vue'
import NoteStatusLabel from '@/components/note/NoteStatusLabel.vue'
import OpenReviewButton from '@/components/note/OpenReviewButton.vue'
import NoteLayout from '@/components/note/NoteLayout.vue'
defineProps<{ note: Note; isFocused: boolean }>()
const emit = defineEmits<{ showReviews: [] }>()
</script>

<template>
  <note-layout :note="note">
    <!-- ノートの内容 -->
    <speech-sheet
      v-if="note.type !== 'other'"
      class="mt-1"
      :class="{ [$style.focused]: isFocused }"
    >
      <spoiler-viewer :text="note.content" />
    </speech-sheet>
    <spoiler-viewer v-else :text="note.content" />

    <!-- 発信ノートの場合のみ、レビュー状況 -->
    <div v-if="note.type === 'outgoing'" class="d-flex flex-row align-center mt-1">
      <note-status-label :note-status="note.status" />
      <open-review-button :reviews="note.reviews" @click="() => emit('showReviews')" />
    </div>
  </note-layout>
</template>

<style module>
.focused {
  outline: 1.5px solid #ff5500; /* いったんハードコード */
}
</style>
