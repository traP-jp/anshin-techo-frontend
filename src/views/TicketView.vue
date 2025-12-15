<!-- あるチケットを開いているページ -->

<script setup lang="ts">
import { ref } from 'vue'
import TicketSideBar from '@/components/TicketSideBar.vue'
import NoteReview from '@/components/NoteReview.vue'
import TicketNote from '@/components/TicketNote.vue'
const reviews = ref([{ id: 1 }, { id: 2 }, { id: 3 }])
const notes = ref([{ id: 1 }, { id: 2 }, { id: 3 }])
</script>

<template>
  <v-layout>
    <ticket-side-bar />
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <v-row no-gutters class="fill-height">
          <v-col cols="6" class="border-e d-flex flex-column">
            <note-review v-for="review in reviews" :key="review.id" :review="review" />
          </v-col>
          <v-col cols="6">
            <ticket-note v-for="note in notes" :key="note.id" :note="note" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
