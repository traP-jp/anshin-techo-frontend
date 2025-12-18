<script setup lang="ts">
import SpoilerEditor from '@/components/shared/SpoilerEditor.vue'
</script>

<template>
  <div class="ma-4 border rounded-lg">
    <spoiler-editor :initial-content="decodeURI($route.path)" />
  </div>
</template>

<style module>
.path {
  padding: 0px 20px;
  font-size: 24px;
  font-family: monospace;
  border-radius: 6px;
  border: 1px solid black;
}
</style>

<!--

- mt-n, mb-n, ml-n, mr-n がそれぞれ上下左右の margin (4n)px を指定。p も同じ
- mx-n, my-n, ma-n はそれぞれ左右、上下、全方向（All）の margin
- n には 16 までの数字を使える。それ以上の Spacing は CSS を書いて対応する

- align-center, align-start, align-end
- justify-center, justify-start, justify-end

-->
