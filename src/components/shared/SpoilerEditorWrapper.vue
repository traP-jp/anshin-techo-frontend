<script setup lang="ts">
import { ref } from 'vue'
import SpoilerEditor from '@/components/shared/SpoilerEditor.vue'
defineProps<{ prohibitBreaks?: boolean }>()

const isFocused = ref(false)
const content = defineModel<string>() // 親からは v-model で受け取る

const onFocusChange = (focused: boolean) => {
  isFocused.value = focused
}

const onEdit = (newContent: string) => {
  content.value = newContent
}
</script>

<template>
  <div :class="[$style.input, { [$style.focused]: isFocused }]">
    <spoiler-editor
      :prohibit-breaks="prohibitBreaks"
      :initial-content="decodeURI($route.path)"
      @focus="onFocusChange"
      @edit="onEdit"
    />
  </div>
</template>

<style module>
.input {
  padding: 4px;
  border-radius: 3px;
  outline: 1px solid rgb(var(--v-theme-border));
  transition: outline-color 0.1s;
}

.focused {
  outline: 1.5px solid rgb(var(--v-theme-input));
}
</style>
