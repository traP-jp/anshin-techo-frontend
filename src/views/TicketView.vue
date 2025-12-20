<!-- あるチケットを開いているページ -->

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'
import TicketSideBar from '@/components/ticket/TicketSideBar.vue'
import NoteItem from '@/components/note/NoteItem.vue'
import ReviewList from '@/components/review/ReviewList.vue'
import NewNote from '@/components/note/NewNote.vue'
import { dummyNotes, dummyTickets } from '@/dummy'
import ReviewHeader from '@/components/review/ReviewHeader.vue'
import { useUserStore } from '@/store'

// 現在の/ticket/idのidを取得して、そのticket
const route = useRoute()
const ticket = computed(() => {
  const ticketId = Number(route.params.id)
  return dummyTickets.find((t) => t.id === ticketId)
})

const userStore = useUserStore()

const notes = ref<Note[]>(dummyNotes)

const isReviewDrawerOpen = ref(false)
const focusedNoteId = ref<number>()
const notesContainerRef = ref<HTMLElement>()

// 最後に選んだノート。レビュー一覧を閉じても残る
const lastFocusedNote = computed(() => notes.value.find((n) => n.id === focusedNoteId.value))

const handleShowReviews = (note: Note) => {
  focusedNoteId.value = note.id
  isReviewDrawerOpen.value = true
}

onMounted(async () => {
  await nextTick()
  if (notesContainerRef.value) {
    notesContainerRef.value.scrollTop = notesContainerRef.value.scrollHeight
  }
})

const visible = computed(() => userStore.isStakeholder(ticket.value!))
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
              :visible="visible"
              @show-reviews="() => handleShowReviews(note)"
            />
            <new-note class="mt-4" />
          </div>
        </div>
        <v-navigation-drawer
          v-if="lastFocusedNote"
          v-model="isReviewDrawerOpen"
          temporary
          location="right"
          width="800"
          :scrim="false"
          :class="$style.drawer"
        >
          <review-header
            :note="lastFocusedNote"
            :visible="visible"
            @close="isReviewDrawerOpen = false"
          />
          <review-list v-if="focusedNoteId != null" :note="lastFocusedNote" :visible="visible" />
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
  max-width: calc(100% + 1px); /* ボーダーを重ねる */
}
</style>
