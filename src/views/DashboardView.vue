<script setup lang="ts">
import { api } from '@/api'
import { useRouter } from 'vue-router'
import TicketList from '@/components/ticket/TicketList.vue'
const router = useRouter()

const handlePostTicket = async () => {
  const ticket = await api.postEmptyTicket()
  await router.push(`/ticket/${ticket.id}`)
}
</script>

<!-- チケット一覧のページ -->
<template>
  <div class="h-100 w-100 d-flex flex-column align-center justify-center">
    <ticket-list />
    <div class="mt-3 d-flex justify-end" style="width: 80%">
      <v-btn variant="flat" color="input" height="40" @click="handlePostTicket">
        <div class="font-weight-medium">チケットを作成</div>
      </v-btn>
    </div>
  </div>
</template>

<style module></style>
