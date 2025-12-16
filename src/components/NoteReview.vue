<script setup lang="ts">
import UserIcon from './UserIcon.vue'
import NoteLog from './NoteLog.vue'
import { getDateRepresentation } from '@/utils/date'
defineProps<{ review: Review }>()
</script>

<template>
  <div class="position-relative flex-grow-1 d-flex flex-row ga-4 align-start ma-3">
    <user-icon :id="review.reviewer" :size="36" />
    <v-card variant="outlined" color="grey-lighten-1" class="flex-grow-1 text-body-1 text-black">
      <v-card-title class="pa-0 bg-grey-lighten-1 text-white d-flex flex-row align-center">
        <div class="text-body-2 ml-1 pa-2 font-weight-medium">{{ review.reviewer }}</div>
        <div :class="$style.date">
          {{ getDateRepresentation(review.created_at) }}
        </div>
      </v-card-title>
      <v-card-text class="text-pre-wrap text-black pa-3">{{ review.comment }}</v-card-text>
    </v-card>
    <svg
      class="text-grey-lighten-1"
      :class="$style.speech"
      width="20"
      height="30"
      viewBox="0 0 20 30"
    >
      <path
        d="M20 6 L8 15 L20 24 Z"
        stroke="currentColor"
        fill="currentColor"
        stroke-width="4"
        stroke-linejoin="round"
      />
    </svg>
  </div>
  <note-log />
</template>

<style module>
.date {
  font-family: 'Inter Variable';
  margin-top: 2px;
  font-size: 12px;
  font-weight: 500;
}

.speech {
  position: absolute;
  top: 4px;
  left: 36px;
}
</style>
