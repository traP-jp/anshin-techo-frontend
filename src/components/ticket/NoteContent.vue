<script setup lang="ts">
import { ref } from 'vue'
import { NoteTypeList } from '@/types'
import SpoilerViewer from '@/components/shared/SpoilerViewer.vue'
import SpoilerEditorWrapper from '@/components/shared/SpoilerEditorWrapper.vue'
const props = defineProps<{ note: Note }>()

const isEditing = ref(false)
const isHovered = ref(false)
const content = ref(props.note.content)
const noteType = ref<NoteType>('other')
</script>

<template>
  <div
    class="position-relative bg-surface pa-3 d-flex flex-column ga-2"
    :class="$style.container"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <template v-if="!isEditing">
      <!-- 通常表示 -->
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
    </template>
    <template v-else>
      <!-- 編集中 -->
      <spoiler-editor-wrapper
        v-model="content"
        @focus="isEditing = true"
        @blur="isEditing = false"
      />
      <div class="d-flex flex-row ga-2 align-center">
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
    </template>
  </div>
</template>

<style module>
.edit {
  position: absolute;
  top: 0px;
  right: 0px;
}

.container {
  border-radius: 0px 8px 8px 8px;
  outline: 1px solid rgb(var(--v-theme-surface));
}
</style>
