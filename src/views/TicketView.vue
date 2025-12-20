<!-- あるチケットを開いているページ -->

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'
import TicketSideBar from '@/components/ticket/TicketSideBar.vue'
import NoteItem from '@/components/note/NoteItem.vue'
import ReviewList from '@/components/review/ReviewList.vue'
import NewNote from '@/components/note/NewNote.vue'
import { dummyNotes, dummyTickets } from '@/dummy'

const route = useRoute()
const ticket = computed(() => {
  const ticketId = Number(route.params.id)
  return dummyTickets.find((t) => t.id === ticketId)
})

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
    <ticket-side-bar v-if="ticket" :key="ticket.id" :ticket="ticket" />
    <v-main>
      <div class="position-relative w-100">
        <div ref="notesContainerRef" class="h-screen overflow-y-auto">
          <div class="d-flex flex-column pa-4 ga-3">
            <note-item
              v-for="note in notes"
              :key="note.id"
              :note="note"
              :is-focused="focusedNoteId === note.id && isReviewDrawerOpen"
              @show-reviews="() => handleShowReviews(note)"
            />
            <new-note class="mt-4" />
          </div>
        </div>
        <v-navigation-drawer
          v-model="isReviewDrawerOpen"
          temporary
          location="right"
          width="600"
          :scrim="false"
          :class="$style.drawer"
        >
          <review-list :reviews="noteReviews" @close="isReviewDrawerOpen = false" />
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
