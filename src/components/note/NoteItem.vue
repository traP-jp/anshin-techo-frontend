<script setup lang="ts">
import { ref } from 'vue'
import UserIcon from '@/components/shared/UserIcon.vue'
import NoteStatus from '@/components/note/NoteStatus.vue'
import NoteEditor from '@/components/note/NoteEditor.vue'
import NoteContent from '@/components/note/NoteContent.vue'
import OpenReviewButton from '@/components/note/OpenReviewButton.vue'
import { getDateRepresentation } from '@/utils/date'
defineProps<{ note: Note; isFocused: boolean; forReview: boolean }>()
const emit = defineEmits<{ showReviews: [] }>()
const isEditing = ref(false)
</script>

<template>
  <div class="d-flex flex-row align-start">
    <user-icon :id="note.author" :size="36" :external="note.type === 'incoming'" />
    <div class="d-flex flex-column ml-2" :class="{ [$style.forReview]: forReview }">
      <!-- 名前と時刻 -->
      <div class="d-flex flex-row align-center ga-2">
        <div class="font-weight-bold text-high-emphasis">{{ note.author }}</div>
        <div class="bg-grey" :class="$style.border"></div>
        <div class="text-body-2 text-medium-emphasis" :class="$style.date">
          {{ getDateRepresentation(note.created_at) }}
        </div>
      </div>
      <!-- ノートの内容 -->
      <note-content
        v-if="!isEditing"
        :note="note"
        :is-focused="isFocused"
        :for-review="forReview"
        @edit="isEditing = true"
      />
      <note-editor v-else :note="note" @cancel="isEditing = false" />
      <!-- 発信ノートの場合のみ、レビュー状況 -->
      <div v-if="note.type === 'outgoing' && !forReview" class="d-flex flex-row align-center mt-1">
        <note-status :note-status="note.status" />
        <open-review-button :reviews="note.reviews" @click="() => emit('showReviews')" />
      </div>
    </div>
  </div>
</template>

<style module>
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

.forReview {
  width: 100%;
  max-height: 240px;
}
</style>
