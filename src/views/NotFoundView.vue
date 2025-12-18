<script setup lang="ts">
import { ref } from 'vue'
import SpoilerEditor from '@/components/shared/SpoilerEditor.vue'
const isFocused = ref(false)

const onFocusChange = (focused: boolean) => {
  isFocused.value = focused
}
</script>

<template>
  <div class="ma-4 d-flex flex-column ga-4">
    <div class="pa-1 rounded" :class="[$style.input, { [$style.focused]: isFocused }]">
      <spoiler-editor :initial-content="decodeURI($route.path)" @focus="onFocusChange" />
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
  outline: 1.5px solid rgb(255, 132, 0);
}

.path {
  padding: 0px 20px;
  font-size: 24px;
  font-family: monospace;
  border-radius: 6px;
  border: 1px solid black;
}
</style>
