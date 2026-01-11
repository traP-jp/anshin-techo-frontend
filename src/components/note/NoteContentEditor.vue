<script setup lang="ts">
import { ref, computed } from 'vue'
import { NOTE_TYPES } from '@/lib/constants'
import { NoteTypeMap, NoteStatusMap } from '@/lib/maps'
import type { CreateNoteBody, UpdateNoteBody } from '@/lib/schema'
import SpoilerEditorWrapper from '@/components/shared/SpoilerEditorWrapper.vue'
const props = defineProps<{ note?: Note }>()
const emit = defineEmits<{
  post: [body: CreateNoteBody]
  edit: [noteId: number, body: UpdateNoteBody]
}>()

const content = ref(props.note?.content ?? '')
const noteType = ref<Note['type']>(props.note?.type ?? 'outgoing')
const noteStatus = ref<Note['status']>(props.note?.status ?? 'draft')

// 一旦既存ノートの削除・ノートタイプ変更ボタンは用意しない

const isNoteChanged = computed(() => {
  if (!props.note) return true
  return content.value !== props.note.content || noteStatus.value !== props.note.status
})

const handleCancel = () => {
  content.value = props.note?.content ?? ''
  noteStatus.value = props.note?.status ?? 'draft'
}

const handleConfirm = () => {
  if (props.note) {
    emit('edit', props.note.id, {
      status: noteStatus.value,
      content: content.value,
      reset_reviews: true,
    })
  } else {
    emit('post', {
      type: noteType.value,
      content: content.value,
      mention_notification: true,
    })
  }
}
</script>

<template>
  <div class="d-flex flex-column ga-3">
    <spoiler-editor-wrapper v-model="content" :class="$style.editor" />
    <div class="d-flex flex-row ga-2 align-center flex-shrink-0">
      <div class="flex-grow-1 d-flex ga-2">
        <v-select
          v-if="!note"
          v-model="noteType"
          label="ノートタイプ"
          :items="NOTE_TYPES"
          variant="outlined"
          density="compact"
          hide-details
          :class="$style.select"
        >
          <template #selection="{ item }">{{ NoteTypeMap[item.raw] }}</template>
          <template #item="{ item, props: itemProps }">
            <v-list-item v-bind="itemProps" :class="$style.listItem">
              <template #title>{{ NoteTypeMap[item.raw] }}</template>
            </v-list-item>
          </template>
        </v-select>
        <v-select
          v-if="note"
          v-model="noteStatus"
          label="ノートステータス"
          :items="['draft', 'waiting_review'] as Note['status'][]"
          variant="outlined"
          density="compact"
          hide-details
          :class="$style.select"
        >
          <template #selection="{ item }">{{ NoteStatusMap[item.raw]!.label }}</template>
          <template #item="{ item, props: itemProps }">
            <v-list-item v-bind="itemProps" :class="$style.listItem">
              <template #title>{{ NoteStatusMap[item.raw]!.label }}</template>
            </v-list-item>
          </template>
        </v-select>
      </div>
      <v-btn v-if="note" text="キャンセル" variant="outlined" height="40" @click="handleCancel" />
      <v-btn
        variant="flat"
        color="input"
        height="40"
        :disabled="!isNoteChanged"
        @click="handleConfirm"
      >
        <div class="font-weight-medium">{{ note ? '保存' : '投稿' }}</div>
      </v-btn>
      <!-- <v-btn v-if="note" variant="flat" color="red" height="40">
        <div class="font-weight-medium">削除</div>
      </v-btn> -->
    </div>
  </div>
</template>

<style module>
.editor {
  flex-grow: 1;
  overflow-y: auto;
}

.listItem {
  min-height: 0px !important;
  height: 40px !important;
}

.select {
  width: 50%;
}
</style>
