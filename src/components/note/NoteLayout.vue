<script setup lang="ts">
import type { Note } from '@/lib/schema'
import UserIcon from '@/components/shared/UserIcon.vue'
import { getDateRepresentation } from '@/utils/date'
defineProps<{ note: Note; fullWidth?: boolean }>()
</script>

<template>
  <div class="d-flex flex-row align-start">
    <user-icon :id="note.author" :size="36" :external="note.type === 'incoming'" />
    <div class="d-flex flex-column ml-2" :class="{ 'w-100': fullWidth }">
      <div class="d-flex flex-row align-center ga-2">
        <div class="font-weight-bold text-high-emphasis">{{ note.author }}</div>
        <div class="bg-grey" :class="$style.border"></div>
        <div class="text-body-2 text-medium-emphasis" :class="$style.date">
          {{ getDateRepresentation(note.created_at) }}
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<style module>
.border {
  width: 1.5px;
  height: 14px;
  margin-top: 2px;
}

.date {
  font-family: 'Inter Variable';
  margin-top: 4px;
  font-size: 14px;
  font-weight: 500;
}
</style>
