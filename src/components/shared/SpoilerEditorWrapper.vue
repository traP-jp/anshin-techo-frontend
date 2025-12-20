<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import SpoilerEditor from '@/components/shared/SpoilerEditor.vue'
defineProps<{ prohibitBreaks?: boolean }>()

const isFocused = ref(false)
const content = defineModel<string>() // 親からは v-model で受け取る

const editorRef = ref<{
  getContent: () => string | undefined
  setContent: (content: string) => void
  focus: () => void
} | null>(null)

// エディタ内部からの変更かどうか
const isInternalUpdate = ref(false)

const onFocusChange = (focused: boolean) => {
  isFocused.value = focused
}

const onEdit = async (newContent: string) => {
  isInternalUpdate.value = true
  content.value = newContent
  await nextTick(() => (isInternalUpdate.value = false))
}

watch(
  () => content.value,
  (newContent) => {
    if (!editorRef.value) return
    if (isInternalUpdate.value) return
    editorRef.value.setContent(newContent ?? '')
  }
)
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
