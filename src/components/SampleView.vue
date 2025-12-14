<template>
  <div :class="$style.container">
    <div>Sample View</div>
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
  font-size: 24px;
  font-weight: bold;
}
</style>
