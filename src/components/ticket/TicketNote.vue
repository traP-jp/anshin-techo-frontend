<script setup lang="ts">
import UserIcon from '@/components/shared/UserIcon.vue'
import { getDateRepresentation } from '@/utils/date'
defineProps<{ note: Note }>()
</script>

<template>
  <div class="d-flex flex-row align-start ma-3">
    <user-icon :id="note.author" :size="30" />
    <div class="d-flex flex-column ml-2">
      <div class="d-flex flex-row align-center ga-2">
        <div class="font-weight-bold">{{ note.author }}</div>
        <div class="bg-grey-darken-2" :class="$style.border"></div>
        <div class="text-grey-darken-2" :class="$style.date">
          {{ getDateRepresentation(note.created_at) }}
        </div>
      </div>
      <div class="text-pre-wrap bg-grey-lighten-3 mt-1 px-2 py-3" :class="$style.content">
        {{ note.content }}
      </div>
    </div>
  </div>
</template>

<style module>
.content {
  border-radius: 0px 8px 8px 8px;
}

.border {
  width: 2px;
  height: 14px;
  margin-top: 2px;
}

.date {
  font-family: 'Inter Variable';
  margin-top: 3px;
  font-size: 14px;
  font-weight: 500;
}
</style>
