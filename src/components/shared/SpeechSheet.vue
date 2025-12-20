<!-- 吹き出し型のシートのためだけのコンポーネント -->

<template>
  <v-sheet :class="$style.container">
    <slot />
  </v-sheet>
</template>

<style module>
.container {
  width: 100%;
  height: 100%;
  padding: 12px;
  min-height: 0;
  overflow-y: auto;
  border-radius: 0px 8px 8px 8px !important;
}
</style>
