<!-- あるチケットを開いているページ -->

<script setup lang="ts">
import { api } from '@/api'
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'
import TicketSideBar from '@/components/ticket/TicketSideBar.vue'
import NoteItem from '@/components/note/NoteItem.vue'
import ReviewList from '@/components/review/ReviewList.vue'
import NewNote from '@/components/note/NewNote.vue'
import ReviewHeader from '@/components/review/ReviewHeader.vue'
import { useUserStore } from '@/store'

// 現在の/ticket/idのidを取得して、そのticket
const route = useRoute()
const userStore = useUserStore()

const notes = ref<Note[]>([])
const ticket = ref<Ticket>()

const isReviewDrawerOpen = ref(false)
const focusedNoteId = ref<number>()
const notesContainerRef = ref<HTMLElement>()

// 最後に選んだノート。レビュー一覧を閉じても残る
const lastFocusedNote = computed(() => notes.value.find((n) => n.id === focusedNoteId.value))

const handleShowReviews = (note: Note) => {
  focusedNoteId.value = note.id
  isReviewDrawerOpen.value = true
}

const visible = computed(() => (ticket.value ? userStore.isStakeholder(ticket.value) : false))

const refresh = async () => {
  const ticketDetails = await api.getTicket(Number(route.params.id))
  ticket.value = ticketDetails // 属性ちょっと多いけど！
  notes.value = ticketDetails.notes
}

onMounted(async () => {
  await refresh()
  await nextTick()
  if (notesContainerRef.value) {
    notesContainerRef.value.scrollTop = notesContainerRef.value.scrollHeight
  }
})

const totalWeights = computed(() => {
  return notes.value
    .flatMap((note) => note.reviews)
    .reduce((sum, review) => sum + (review.weight ?? 0), 0)
})
</script>

<template>
  <v-layout>
    <ticket-side-bar :key="ticket?.id" :ticket="ticket" @refresh="refresh" />
    <v-main>
      <div class="position-relative w-100">
        <div ref="notesContainerRef" class="h-screen overflow-y-auto pt-13">
          <div class="d-flex flex-column pa-4 ga-3">
            <note-item
              v-for="note in notes"
              :key="note.id"
              :note="note"
              :is-focused="focusedNoteId === note.id && isReviewDrawerOpen"
              :visible="visible"
              @show-reviews="() => handleShowReviews(note)"
            />
            <new-note v-if="visible" :ticket-id="ticket!.id" class="mt-4" @refresh="refresh" />
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
          style="z-index: 2"
        >
          <review-header
            :note="lastFocusedNote"
            :weights="totalWeights"
            :visible="visible"
            @close="isReviewDrawerOpen = false"
            @refresh="refresh"
          />
          <review-list
            v-if="focusedNoteId != null"
            :note="lastFocusedNote"
            :visible="visible"
            :sendable="totalWeights >= 5"
            @refresh="refresh"
          />
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
