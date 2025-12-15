<script setup lang="ts">
defineProps<{ note: Note }>()
</script>

<template>
  <div :class="$style.container">TicketNote {{ note.id }}</div>
</template>

<style module>
.container {
  border: 1px solid blue;
}
</style>
