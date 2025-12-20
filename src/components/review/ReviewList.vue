<script setup lang="ts">
import ReviewHeader from '@/components/review/ReviewHeader.vue'
import ReviewByUser from '@/components/review/ReviewByUser.vue'
import ReviewLog from '@/components/review/ReviewLog.vue'

defineProps<{
  reviews: Review[]
  note: Note
}>()
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <div class="d-flex flex-column h-100">
    <review-header :note="note" />
    <v-container fluid class="overflow-y-auto pa-4">
      <div class="d-flex flex-row align-center mb-4">
        <v-btn icon="mdi-close" variant="text" density="comfortable" @click="emit('close')" />
        <div class="ml-2">このノートに対するレビュー</div>
      </div>
      <template v-for="review in reviews" :key="review.id">
        <review-by-user :review="review" />
        <div :class="$style.connector" class="bg-border"></div>
        <review-log icon="mdi-check" :text="`承認 : レベル ${review.weight}`" />
        <div :class="$style.connector" class="bg-border"></div>
      </template>
      <review-log icon="mdi-send" text="メッセージが送信可能になりました" />
    </v-container>
  </div>
</template>

<style module>
.connector {
  width: 1px;
  height: 12px;
  margin-left: 63.5px;
}
</style>
