<script setup lang="ts">
import { ref } from 'vue'
import { NoteTypeList } from '@/types'
import SpoilerEditorWrapper from '@/components/shared/SpoilerEditorWrapper.vue'
const props = defineProps<{ note?: Note }>()

const isEditing = ref(false)
const content = ref(props.note?.content)
const noteType = ref<NoteType>(props.note?.type ?? 'outgoing')
</script>

<template>
  <v-sheet class="pa-3 d-flex flex-column ga-2" :class="$style.container">
    <spoiler-editor-wrapper
      v-model="content"
      :class="$style.editor"
      @focus="isEditing = true"
      @blur="isEditing = false"
    />
    <div class="d-flex flex-row ga-2 align-center flex-shrink-0">
      <v-btn variant="flat" color="input" height="40">
        <div class="font-weight-medium">保存</div>
      </v-btn>
      <v-btn variant="outlined" color="border" height="40" @click="isEditing = false">
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
      <v-btn variant="flat" color="red" height="40">
        <div class="font-weight-medium">削除</div>
      </v-btn>
    </div>
  </v-sheet>
</template>

<style module>
.container {
  height: fit-content;
  border-radius: 0px 8px 8px 8px !important;
  outline: 1px solid rgb(var(--v-theme-surface));
}

.editor {
  flex-shrink: 1;
  overflow-y: auto;
}
</style>
