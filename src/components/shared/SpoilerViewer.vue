<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ text: string }>()
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
  <div>
    <span v-for="part in parts" :key="part.index" :class="{ [$style.hidden]: part.isHidden }">
      {{ part.isHidden ? '[' + part.content.slice(2, -2) + ']' : part.content }}
    </span>
  </div>
</template>

<style module>
.hidden {
  background-color: rgba(255, 60, 0, 0.05);
  color: rgb(255, 60, 0);
  font-weight: 500;
  margin: 0 2px;
}
</style>
