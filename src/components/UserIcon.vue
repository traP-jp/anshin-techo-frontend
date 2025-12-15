<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ id?: string; size: number; external?: boolean }>()
// external ならアイコンを生成、そうでなければユーザーアイコンを取得
// <user-icon :id="'kitsne'" :size="40" external /> のように書ける

const imageUrl = computed(() => {
  if (props.external) {
    return `https://api.dicebear.com/9.x/thumbs/svg?seed=${props.id}`
  } else {
    return `https://q.trap.jp/api/v3/public/icon/${props.id}`
  }
})
</script>

<template>
  <img :class="$style.image" :src="imageUrl" />
</template>

<style module>
.image {
  width: calc(v-bind(size) * 1px);
  height: calc(v-bind(size) * 1px);
  object-fit: contain;
  border-radius: 50%;
}
</style>
