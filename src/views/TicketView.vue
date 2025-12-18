<!-- あるチケットを開いているページ -->

<script setup lang="ts">
import { ref } from 'vue'
import TicketSideBar from '@/components/ticket/TicketSideBar.vue'
import TicketNote from '@/components/ticket/TicketNote.vue'
import ReviewDrawer from '@/components/ticket/ReviewDrawer.vue'
import { dummyNotes } from '@/dummy'

const notes = ref<Note[]>(dummyNotes)
const isReviewDrawerOpen = ref(false)
const noteReviews = ref<Review[]>([])

const handleShowReviews = (note: Note) => {
  noteReviews.value = note.reviews
  isReviewDrawerOpen.value = true
}
</script>

<template>
  <v-layout>
    <ticket-side-bar />
    <v-main>
      <div class="d-flex flex-column h-screen overflow-y-auto px-3 py-4 ga-3">
        <ticket-note
          v-for="note in notes"
          :key="note.id"
          :note="note"
          @show-reviews="() => handleShowReviews(note)"
        />
      </div>
    </v-main>
    <v-navigation-drawer
      v-model="isReviewDrawerOpen"
      temporary
      location="right"
      width="600"
      :class="$style.drawer"
    >
      <review-drawer :reviews="noteReviews" @close="isReviewDrawerOpen = false" />
    </v-navigation-drawer>
  </v-layout>
</template>

<style module>
.connector {
  width: 1px;
  height: 12px;
  margin-left: 63.5px;
}

.drawer {
  max-width: calc(100% - 300px);
}
</style>
