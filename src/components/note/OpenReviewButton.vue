<script setup lang="ts">
import type { Review } from '@/lib/schema'
import UserIcon from '@/components/shared/UserIcon.vue'
defineProps<{ reviews: Review[] }>()
</script>

<template>
  <div class="d-flex flex-row align-center" :class="$style.container">
    <div :class="$style.reviews" class="mx-2 text-medium-emphasis">
      {{ reviews.length }} 件のレビュー
    </div>
    <div :class="$style.icons">
      <user-icon
        v-for="(review, index) in reviews.slice(0, 3)"
        :id="review.reviewer"
        :key="index"
        :size="18"
        :class="$style.icon"
      />
    </div>
    <v-icon class="text-medium-emphasis" icon="mdi-chevron-right" size="20" />
  </div>
</template>

<style module>
.container {
  cursor: pointer;
  transition: opacity 0.2s;
}

.container:hover {
  opacity: 0.7;
}

.reviews {
  font-size: 11px;
  font-weight: bold;
}

.icons {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 4px;
}

.icon {
  outline: 2px solid rgb(var(--v-theme-background));
  margin-left: -2px;
}
</style>
