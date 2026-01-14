<script setup lang="ts">
import type { Review } from '@/lib/schema'
import UserIcon from '@/components/shared/UserIcon.vue'
import SpoilerViewer from '@/components/shared/SpoilerViewer.vue'
import { getDateRepresentation } from '@/utils/date'
defineProps<{ review: Review; visible: boolean }>()
</script>

<template>
  <!-- 無言 review については表示をのちほど検討する -->
  <div v-if="review.comment" class="position-relative flex-grow-1 d-flex flex-row ga-4 align-start">
    <user-icon :id="review.reviewer" :size="36" />
    <v-card variant="outlined" color="border" class="flex-grow-1 text-body-1">
      <v-card-title class="pa-0 bg-border text-white d-flex flex-row align-center">
        <div class="text-body-2 ml-1 pa-2 font-weight-medium">{{ review.reviewer }}</div>
        <div :class="$style.date">
          {{ getDateRepresentation(review.created_at) }}
        </div>
      </v-card-title>
      <v-card-text class="text-pre-wrap pa-3 text-high-emphasis">
        <spoiler-viewer :text="review.comment" :visible="visible" />
      </v-card-text>
    </v-card>
    <svg class="text-border" :class="$style.speech" width="20" height="30" viewBox="0 0 20 30">
      <path
        d="M20 6 L8 15 L20 24 Z"
        stroke="currentColor"
        fill="currentColor"
        stroke-width="4"
        stroke-linejoin="round"
      />
    </svg>
  </div>
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
