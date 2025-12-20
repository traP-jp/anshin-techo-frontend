<!-- 吹き出し型のシートのためだけのコンポーネント -->

<template>
  <v-sheet :class="$style.container">
    <slot />
  </v-sheet>
</template>

<style module>
.container {
  border-radius: 0px 8px 8px 8px !important;
  outline: 1px solid rgb(var(--v-theme-surface));
}
</style>
