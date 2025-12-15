<script setup lang="ts">
import UserIcon from './UserIcon.vue'
import { getDateRepresentation } from '@/utils/date'
defineProps<{ note: Note }>()
</script>

<template>
  <div :class="$style.container">
    <user-icon id="Yomi" :size="30" />
    <div :class="$style.right">
      <div :class="$style.info">
        <div>{{ note.author }}</div>
        <div>{{ getDateRepresentation(note.created_at) }}</div>
      </div>
      <div :class="$style.content">{{ note.content }}</div>
    </div>
  </div>
</template>

<style module>
.container {
  border: 1px solid blue;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.right {
  margin-left: 8px;
  display: flex;
  flex-direction: column;
}
.info {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
.content {
  margin-top: 4px;
  background-color: lightgray;
  padding: 12px 8px;
}
</style>
