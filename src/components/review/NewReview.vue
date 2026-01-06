<script setup lang="ts">
import UserIcon from '@/components/shared/UserIcon.vue'
import ReviewContentEditor from '@/components/review/ReviewContentEditor.vue'
import { useUserStore } from '@/store'
import { api } from '@/api'
const userStore = useUserStore()
const emit = defineEmits<{ refresh: [] }>()
const props = defineProps<{ ticketId: number; noteId: number }>()

const handlePostReview = async (body: CreateReviewBody) => {
  await api.postReview(props.ticketId, props.noteId, { ...body })
  emit('refresh')
}
</script>

<template>
  <div class="w-100 d-flex flex-row align-start" :class="$style.container">
    <user-icon :id="userStore.userId" :size="36" />
    <div class="d-flex flex-column ml-2 w-100">
      <div class="d-flex flex-row align-center ga-2">
        <div class="font-weight-medium text-high-emphasis mb-1">新しいレビュー</div>
      </div>
      <review-content-editor :class="$style.editor" @confirm="handlePostReview" />
    </div>
  </div>
</template>

<style module>
.container {
  margin-top: 16px;
  border-top: 1px dashed rgb(var(--v-theme-border));
  padding-top: 24px;
  padding-bottom: 16px;
}

.editor {
  min-height: 160px;
  max-height: 320px;
}
</style>
