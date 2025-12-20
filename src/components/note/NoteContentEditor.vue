<script setup lang="ts">
import { ref } from 'vue'
import { NoteTypeList } from '@/types'
import SpoilerEditorWrapper from '@/components/shared/SpoilerEditorWrapper.vue'
const props = defineProps<{ note?: Note }>()
const emit = defineEmits<{ cancel: [] }>()

const content = ref(props.note?.content)
const noteType = ref<NoteType>(props.note?.type ?? 'outgoing')
</script>

<template>
  <div class="d-flex flex-column ga-3">
    <spoiler-editor-wrapper v-model="content" :class="$style.editor" />
    <div class="d-flex flex-row ga-2 align-center flex-shrink-0">
      <v-btn variant="flat" color="input" height="40">
        <div class="font-weight-medium">{{ note ? '保存' : '投稿' }}</div>
      </v-btn>
      <v-btn v-if="note" variant="outlined" color="border" height="40" @click="emit('cancel')">
        <div class="font-weight-medium">キャンセル</div>
      </v-btn>
      <v-select
        v-model="noteType"
        label="ノートタイプ"
        :items="NoteTypeList"
        variant="outlined"
        density="compact"
        hide-details
      />
      <v-btn v-if="note" variant="flat" color="red" height="40">
        <div class="font-weight-medium">削除</div>
      </v-btn>
    </div>
  </div>
</template>

<style module>
.editor {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
