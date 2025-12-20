<script setup lang="ts">
import { ref, watch } from 'vue'
import SpoilerEditor from '@/components/shared/SpoilerEditor.vue'
defineProps<{ prohibitBreaks?: boolean }>()

const isFocused = ref(false)
const content = defineModel<string>() // 親からは v-model で受け取る
type SpoilerEditorExposed = {
  setContent: (content: string) => void
  getContent: () => string | undefined
  focus: () => void
}

// SpoilerEditor の公開メソッドへ型安全にアクセスするためインスタンス型を持つ
const editorRef = ref<SpoilerEditorExposed | null>(null)

const onFocusChange = (focused: boolean) => {
  isFocused.value = focused
}

const onEdit = (newContent: string) => {
  content.value = newContent
}

// 親からの値更新をエディタ本体へ反映させる（キャンセルなどのリセット用）
watch(
  () => content.value,
  (newContent) => {
    editorRef.value?.setContent?.(newContent ?? '')
  }
)

// setContent
defineExpose({
  setContent: (newContent: string) => {
    content.value = newContent
    // エディタ本体にも反映させる
    editorRef.value?.setContent?.(newContent)
  },
})
</script>

<template>
  <div :class="[$style.input, { [$style.focused]: isFocused }]">
    <div class="cursor-text h-100 w-100 flex-grow-1" @click="editorRef?.focus()">
      <spoiler-editor
        ref="editorRef"
        :prohibit-breaks="prohibitBreaks"
        :initial-content="content"
        @focus="onFocusChange"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<style module>
.input {
  padding: 4px;
  border-radius: 3px;
  outline: 1px solid rgb(var(--v-theme-border));
  transition: outline-color 0.1s;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.focused {
  outline: 1.5px solid rgb(var(--v-theme-input));
}
</style>
