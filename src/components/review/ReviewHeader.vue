<script setup lang="ts">
import UserIcon from '@/components/shared/UserIcon.vue'
import SpoilerViewer from '@/components/shared/SpoilerViewer.vue'
import { getDateRepresentation } from '@/utils/date'

defineProps<{ note: Note }>()
</script>

<template>
  <div class="d-flex flex-row align-start">
    <!-- 投稿者アイコン -->
    <user-icon :id="note.author" :size="36" :external="note.type === 'incoming'" />

    <div class="d-flex flex-column ml-2">
      <!-- 投稿者名・日時 -->
      <div class="d-flex align-center ga-2">
        <div class="font-weight-bold text-high-emphasis">{{ note.author }}</div>
        <div class="bg-grey" :class="$style.border"></div>
        <div class="text-medium-emphasis text-body-2">
          {{ getDateRepresentation(note.created_at) }}
        </div>
      </div>

      <!-- ノート本文 -->
      <div class="mt-1 text-body-2 ps-2 pe-3">
        <spoiler-viewer :text="note.content" />
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
</style>
