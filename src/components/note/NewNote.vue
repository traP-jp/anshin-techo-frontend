<script setup lang="ts">
import { api } from '@/api'
import UserIcon from '@/components/shared/UserIcon.vue'
import NoteContentEditor from '@/components/note/NoteContentEditor.vue'
import { useUserStore } from '@/store'
const props = defineProps<{ ticketId: number }>()
const emit = defineEmits<{ refresh: [] }>()
const userStore = useUserStore()

const handlePostNote = async (body: CreateNoteBody) => {
  await api.postNote(props.ticketId, {
    ...body,
    mention_notification: true,
  })
  emit('refresh')
}

const handleEditNote = async (noteId: number, body: UpdateNoteBody) => {
  await api.putNote(props.ticketId, noteId, {
    ...body,
  })
  emit('refresh')
}
</script>

<template>
  <div class="w-100 d-flex flex-row align-start" :class="$style.container">
    <user-icon :id="userStore.userId" :size="36" />
    <div class="d-flex flex-column ml-2 w-100">
      <div class="d-flex flex-row align-center ga-2">
        <div class="font-weight-medium text-high-emphasis mb-1">新しいノート</div>
      </div>
      <note-content-editor :class="$style.editor" @post="handlePostNote" @edit="handleEditNote" />
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
