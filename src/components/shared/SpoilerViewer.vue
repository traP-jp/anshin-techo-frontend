<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ text: string; visible?: boolean }>()
// text には初めから伏字を考慮したテキストが入っている
// 関係者が見ている場合、text は機密事項込みであり、visible が true であるとする

const parts = computed(() =>
  props.text
    .split(/(!!.*?!!)/gs)
    .filter((part) => part !== '')
    .map((part, index) => ({
      index: index,
      content: part,
      isHidden: part.startsWith('!!') && part.endsWith('!!'),
    }))
)
</script>

<template>
  <div :class="$style.container">
    <template v-if="visible">
      <span v-for="part in parts" :key="part.index" :class="{ [$style.visible]: part.isHidden }">
        {{ part.isHidden ? part.content.slice(2, -2) : part.content }}
      </span>
    </template>
    <template v-else>
      <span v-for="part in parts" :key="part.index" :class="{ [$style.hidden]: part.isHidden }">
        {{ part.isHidden ? '[' + part.content.slice(2, -2) + ']' : part.content }}
      </span>
    </template>
  </div>
</template>

<style module>
.container {
  white-space: pre-wrap;
}

.hidden {
  background-color: rgba(255, 60, 0, 0.05);
  color: rgb(255, 60, 0);
  font-weight: 500;
  margin: 0 2px;
}

.visible {
  background-color: rgba(0, 149, 255, 0.1);
  color: rgb(0, 102, 255);
  font-weight: 500;
  margin: 0 2px;
}
</style>
