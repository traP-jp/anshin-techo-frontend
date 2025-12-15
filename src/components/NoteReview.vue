<script setup lang="ts">
defineProps<{ review: { id: number } }>()
</script>

<template>
  <div :class="$style.container">NoteReview {{ review.id }}</div>
</template>

<style module>
.container {
  border: 1px solid red;
}
</style>
