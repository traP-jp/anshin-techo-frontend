<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/store'
import type { Note } from '@/lib/schema'
import ReviewByUser from '@/components/review/ReviewByUser.vue'
import ReviewLog from '@/components/review/ReviewLog.vue'
import NewReview from '@/components/review/NewReview.vue'
const emit = defineEmits<{ refresh: [] }>()
const userStore = useUserStore()

const props = defineProps<{ note: Note; visible: boolean; sendable: boolean }>()
const alreadyReviewed = computed(() =>
  props.note.reviews.some((review) => review.reviewer === userStore.userId)
)
</script>

<template>
  <div class="d-flex flex-column">
    <v-container fluid class="overflow-y-auto pa-4">
      <template v-for="review in note.reviews" :key="review.id">
        <review-by-user :review="review" :visible="visible" />
        <div :class="$style.connector" class="bg-border"></div>
        <template v-if="review.type !== 'comment'">
          <review-log
            v-if="review.type === 'approve'"
            icon="mdi-check"
            :text="`承認 : レベル ${review.weight}`"
          />
          <review-log
            v-else
            icon="mdi-close"
            :text="'修正が依頼されたため、自動でノートが下書きに戻りました'"
          />
        </template>
        <div :class="$style.connector" class="bg-border"></div>
      </template>
      <review-log v-if="sendable" icon="mdi-send" text="メッセージが送信可能になりました" />
      <new-review
        v-if="!alreadyReviewed"
        :ticket-id="note.ticket_id"
        :note-id="note.id"
        @refresh="emit('refresh')"
      />
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
