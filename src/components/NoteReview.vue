<script setup lang="ts">
import UserIcon from './UserIcon.vue'
import { getDateRepresentation } from '@/utils/date'
defineProps<{ review: Review }>()
</script>

<template>
  <div class="flex-grow-1 d-flex flex-row ga-2 align-start ma-3">
    <user-icon :id="review.reviewer" :size="40" />

    <v-card variant="outlined" color="grey-lighten-1" class="flex-grow-1 text-body-1 text-black">
      <v-card-title class="pa-0 bg-grey-lighten-1 text-white d-flex flex-row align-center">
        <div class="text-body-2 ml-1 pa-2 font-weight-medium">{{ review.reviewer }}</div>
        <div :class="$style.date">
          {{ getDateRepresentation(review.created_at) }}
        </div>
      </v-card-title>
      <v-card-text class="text-black pa-3">{{ review.comment }}</v-card-text>
    </v-card>
  </div>
</template>

<style module>
.container {
  border: 1px solid rgb(var(--v-theme-grey-lighten-2));
  border-radius: 8px;
}

.date {
  font-family: 'Inter Variable';
  margin-top: 2px;
  font-size: 12px;
  font-weight: 500;
}
</style>
