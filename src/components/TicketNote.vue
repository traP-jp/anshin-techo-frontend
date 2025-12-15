<script setup lang="ts">
import UserIcon from './UserIcon.vue'
import { getDateRepresentation } from '@/utils/date'
defineProps<{ note: Note }>()
</script>

<template>
  <div class="d-flex flex-row align-start">
    <user-icon :id="note.author" :size="30" />
    <div class="d-flex flex-column ml-2">
      <div class="d-flex flex-row ga-2">
        <div class="font-weight-bold">{{ note.author }}</div>
        <div :class="$style.border"></div>
        <div>{{ getDateRepresentation(note.created_at) }}</div>
      </div>
      <div class="bg-grey-lighten-3 mt-1 px-2 py-3" :class="$style.content">{{ note.content }}</div>
    </div>
  </div>
</template>

<style module>
.content {
  border-radius: 0px 8px 8px 8px;
}
.border {
  width: 2px;
  margin: 4px 0px;
  background-color: black;
}
</style>
