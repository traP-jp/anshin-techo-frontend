<script setup lang="ts">
import { ref } from 'vue'
import UserIcon from '@/components/shared/UserIcon.vue'
import NoteStatus from '@/components/ticket/NoteStatus.vue'
import NoteEditor from '@/components/ticket/NoteEditor.vue'
import SpeechSheet from '@/components/shared/SpeechSheet.vue'
import SpoilerViewer from '@/components/shared/SpoilerViewer.vue'
import OpenReviewButton from '@/components/ticket/OpenReviewButton.vue'
import { getDateRepresentation } from '@/utils/date'
defineProps<{ note: Note; isFocused: boolean }>()
const emit = defineEmits<{ showReviews: [] }>()
const isEditing = ref(false)
const isHovered = ref(false)
</script>

<template>
  <div class="d-flex flex-row align-start">
    <user-icon :id="note.author" :size="36" :external="note.type === 'incoming'" />
    <div class="d-flex flex-column ml-2">
      <!-- 名前と時刻 -->
      <div class="d-flex flex-row align-center ga-2">
        <div class="font-weight-bold text-high-emphasis">{{ note.author }}</div>
        <div class="bg-grey" :class="$style.border"></div>
        <div class="text-body-2 text-medium-emphasis" :class="$style.date">
          {{ getDateRepresentation(note.created_at) }}
        </div>
      </div>
      <!-- ノートの内容 -->
      <speech-sheet
        v-if="!isEditing"
        :note="note"
        class="mt-1 position-relative pa-3"
        :class="{ [$style.focused]: isFocused }"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <spoiler-viewer class="text-pre-wrap" :text="note.content" />
        <v-btn
          v-if="isHovered"
          :class="$style.edit"
          class="text-grey"
          size="32px"
          icon="mdi-pencil"
          variant="text"
          @click="isEditing = true"
        />
      </speech-sheet>
      <note-editor v-else :note="note" @cancel="isEditing = false" />
      <!-- 発信ノートの場合のみ、レビュー状況 -->
      <div v-if="note.type === 'outgoing'" class="d-flex flex-row align-center mt-1">
        <note-status :note-status="note.status" />
        <open-review-button :reviews="note.reviews" @click="() => emit('showReviews')" />
      </div>
    </div>
  </div>
</template>

<style module>
.focused {
  outline: 1.5px solid #ff5500; /* いったんハードコード */
}

.border {
  width: 1.5px;
  height: 14px;
  margin-top: 2px;
}

.date {
  font-family: 'Inter Variable';
  margin-top: 4px;
  font-size: 14px;
  font-weight: 500;
}

.edit {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
