<script setup lang="ts">
import UserIcon from './UserIcon.vue'
import { getDateRepresentation } from '@/utils/date'
defineProps<{ note: Note }>()
</script>

<template>
  <div class="d-flex flex-row align-start">
    <user-icon id="Yomi" :size="30" />
    <div class="d-flex flex-column ml-2">
      <div class="d-flex flex-row ga-2">
        <div>{{ note.author }}</div>
        <div>{{ getDateRepresentation(note.created_at) }}</div>
      </div>
      <div class="bg-grey-lighten-3 mt-1 px-2 py-3">{{ note.content }}</div>
    </div>
  </div>
</template>
