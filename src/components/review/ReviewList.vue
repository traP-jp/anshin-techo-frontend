<script setup lang="ts">
import ReviewByUser from '@/components/review/ReviewByUser.vue'
import ReviewLog from '@/components/review/ReviewLog.vue'

defineProps<{ note: Note; visible: boolean }>()
</script>

<template>
  <div class="d-flex flex-column">
    <v-container fluid class="overflow-y-auto pa-4">
      <template v-for="review in note.reviews" :key="review.id">
        <review-by-user :review="review" :visible="visible" />
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
