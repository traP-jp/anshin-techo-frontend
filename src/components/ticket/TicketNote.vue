<script setup lang="ts">
import UserIcon from '@/components/shared/UserIcon.vue'
import NoteStatus from '@/components/ticket/NoteStatus.vue'
import SpoilerViewer from '@/components/shared/SpoilerViewer.vue'
import { getDateRepresentation } from '@/utils/date'
defineProps<{ note: Note }>()
const emit = defineEmits<{ showReviews: [] }>()
</script>

<template>
  <div class="d-flex flex-row align-start">
    <user-icon :id="note.author" :size="36" :external="note.type === 'incoming'" />
    <div class="d-flex flex-column ml-2">
      <div class="d-flex flex-row align-center ga-2">
        <div class="font-weight-bold">{{ note.author }}</div>
        <div class="bg-grey" :class="$style.border"></div>
        <div class="text-body-2 text-medium-emphasis" :class="$style.date">
          {{ getDateRepresentation(note.created_at) }}
        </div>
      </div>
      <spoiler-viewer v-if="note.type === 'other'" :text="note.content" />
      <spoiler-viewer
        v-else
        class="text-pre-wrap bg-surface mt-1 pa-3"
        :class="$style.content"
        :text="note.content"
      />
      <div
        v-if="note.type === 'outgoing'"
        class="d-flex flex-row align-center mt-1"
        :class="$style.reviewButton"
        @click="emit('showReviews')"
      >
        <note-status :note-status="note.status" />
        <div :class="$style.reviews" class="mx-2 text-medium-emphasis">
          {{ note.reviews.length }} 件のレビュー
        </div>
        <div :class="$style.icons">
          <user-icon
            v-for="(review, index) in note.reviews.slice(0, 3)"
            :id="review.reviewer"
            :key="index"
            :size="18"
            :class="$style.icon"
          />
        </div>
        <v-icon class="text-medium-emphasis" icon="mdi-chevron-right" size="20" />
      </div>
    </div>
  </div>
</template>

<style module>
.content {
  border-radius: 0px 8px 8px 8px;
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

.reviews {
  font-size: 11px;
  font-weight: bold;
}

.icons {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 4px;
}

.icon {
  outline: 2px solid rgb(var(--v-theme-background));
  margin-left: -2px;
}

.reviewButton {
  cursor: pointer;
  transition: opacity 0.2s;
}

.reviewButton:hover {
  opacity: 0.7;
}
</style>
