<script setup lang="ts">
defineProps<{ icon: string; text: string }>()
</script>

<template>
  <div class="mx-3 my-4 pl-13 d-flex align-center text-grey-lighten-1">
    <div class="d-flex align-center justify-center bg-grey-lighten-1" :class="$style.icon">
      <v-icon class="text-white" :icon="icon" size="16" />
    </div>
    <div class="ml-2 text-black text-body-2">{{ text }}</div>
  </div>
</template>

<style module>
.icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0; /* ないと縮んでしまう */
}
</style>
