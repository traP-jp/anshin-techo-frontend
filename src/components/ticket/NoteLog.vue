<script setup lang="ts">
defineProps<{ icon: string; text: string }>()
</script>

<template>
  <div class="position-relative pl-13 d-flex align-center">
    <div class="d-flex align-center justify-center bg-border" :class="$style.icon">
      <v-icon class="text-white" :icon="icon" size="16" />
    </div>
    <div class="ml-2 text-body-2">{{ text }}</div>
    <div :class="$style.connector" class="bg-border"></div>
  </div>
</template>

<style module>
.icon {
  z-index: 1;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0; /* ないと縮んでしまう */
}

.connector {
  position: absolute;
  top: 0;
  left: 63.5px;
  width: 1px;
  height: 100%;
}
</style>
