<!-- NoteContent と共通化はしない -->

<script setup lang="ts">
import UserIcon from '@/components/shared/UserIcon.vue'
import NoteEditor from '@/components/note/NoteEditor.vue'
import { useUserStore } from '@/store'
const userStore = useUserStore()
</script>

<template>
  <div class="w-100 d-flex flex-row align-start" :class="$style.container">
    <user-icon :id="userStore.userId" :size="36" />
    <div class="d-flex flex-column ml-2 w-100">
      <div class="d-flex flex-row align-center ga-2">
        <div class="font-weight-bold text-high-emphasis mb-1">新しいノート</div>
      </div>
      <note-editor :class="$style.editor" />
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
