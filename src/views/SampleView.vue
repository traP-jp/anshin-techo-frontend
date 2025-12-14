<script setup lang="ts">
import SampleComponent from '@/components/SampleComponent.vue'
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.title">Sample View</div>
    <sample-component />
    <v-btn text="Hello!" color="blue" prepend-icon="mdi-check" />
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.title {
  font-size: 24px;
  font-weight: bold;
}
</style>
