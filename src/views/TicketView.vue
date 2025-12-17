<!-- あるチケットを開いているページ -->

<script setup lang="ts">
import { ref } from 'vue'
import TicketSideBar from '@/components/ticket/TicketSideBar.vue'
import NoteReview from '@/components/ticket/NoteReview.vue'
import TicketNote from '@/components/ticket/TicketNote.vue'
import NoteLog from '@/components/ticket/NoteLog.vue'
import { dummyNotes, dummyReviews } from '@/dummy'

const reviews = ref<Review[]>(dummyReviews)
const notes = ref<Note[]>(dummyNotes)
</script>

<template>
  <v-layout>
    <ticket-side-bar />
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <v-row no-gutters class="fill-height">
          <v-col cols="6" class="d-flex flex-column h-screen overflow-y-auto px-3 py-4 ga-3">
            <ticket-note v-for="note in notes" :key="note.id" :note="note" />
          </v-col>
          <v-col cols="6" class="bg-grey-lighten-3 h-screen overflow-y-auto px-3 py-4">
            <template v-for="review in reviews" :key="review.id">
              <note-review :review="review" />
              <div :class="$style.connector" class="bg-grey-lighten-1"></div>
              <note-log icon="mdi-check" :text="`承認 : レベル ${review.weight}`" />
              <div :class="$style.connector" class="bg-grey-lighten-1"></div>
            </template>
            <note-log icon="mdi-send" text="メッセージが送信可能になりました" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<style module>
.connector {
  width: 1px;
  height: 12px;
  margin-left: 63.5px;
}
</style>
