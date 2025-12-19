<!-- あるチケットを開いているページ -->

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import TicketSideBar from '@/components/ticket/TicketSideBar.vue'
import TicketNote from '@/components/ticket/TicketNote.vue'
import NoteReviewList from '@/components/ticket/NoteReviewList.vue'
import { dummyNotes } from '@/dummy'

const notes = ref<Note[]>(dummyNotes)
const isReviewDrawerOpen = ref(false)
const noteReviews = ref<Review[]>([])
const focusedNoteId = ref<number>()
const notesContainerRef = ref<HTMLElement>()

const handleShowReviews = (note: Note) => {
  focusedNoteId.value = note.id
  noteReviews.value = note.reviews
  isReviewDrawerOpen.value = true
}

onMounted(async () => {
  await nextTick()
  if (notesContainerRef.value) {
    notesContainerRef.value.scrollTop = notesContainerRef.value.scrollHeight
  }
})
</script>

<template>
  <v-layout>
    <ticket-side-bar />
    <v-main>
      <div class="position-relative w-100 h-100">
        <div ref="notesContainerRef" class="d-flex flex-column h-screen overflow-y-auto pa-4 ga-3">
          <ticket-note
            v-for="note in notes"
            :key="note.id"
            :note="note"
            :is-focused="focusedNoteId === note.id && isReviewDrawerOpen"
            @show-reviews="() => handleShowReviews(note)"
          />
        </div>
        <v-navigation-drawer
          v-model="isReviewDrawerOpen"
          temporary
          location="right"
          width="600"
          :scrim="false"
          :class="$style.drawer"
        >
          <note-review-list :reviews="noteReviews" @close="isReviewDrawerOpen = false" />
        </v-navigation-drawer>
      </div>
    </v-main>
  </v-layout>
</template>

<style module>
.connector {
  width: 1px;
  height: 12px;
  margin-left: 63.5px;
}

.drawer {
  max-width: calc(100% + 1px);
}
</style>
