<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SpoilerEditor from '@/components/shared/SpoilerEditor.vue'
import SpoilerViewer from '@/components/shared/SpoilerViewer.vue'

const route = useRoute()

const isFocused = ref(false)
const content = ref(decodeURI(route.path))

const onFocusChange = (focused: boolean) => {
  isFocused.value = focused
}

const onEdit = (newContent: string) => {
  content.value = newContent
}
</script>

<template>
  <div class="ma-4 d-flex flex-column ga-4">
    <spoiler-viewer :text="content" class="mt-4" />
    <div class="pa-1 rounded" :class="[$style.input, { [$style.focused]: isFocused }]">
      <spoiler-editor
        :initial-content="decodeURI($route.path)"
        @focus="onFocusChange"
        @edit="onEdit"
      />
    </div>
    <v-textarea variant="outlined" rows="1" auto-grow density="compact" />
  </div>
</template>

<style module>
.input {
  box-sizing: border-box;
  border-radius: 4px;
  outline: 1px solid #c0c0c0;
  transition: outline-color 0.2s;
}

.focused {
  outline: 1.5px solid rgba(76, 0, 255);
}

.path {
  padding: 0px 20px;
  font-size: 24px;
  font-family: monospace;
  border-radius: 6px;
  border: 1px solid black;
}
</style>
