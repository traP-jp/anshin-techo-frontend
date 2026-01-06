<script setup lang="ts">
import { computed } from 'vue'
import { TicketStatusMap } from '@/types/maps'
const props = defineProps<{ ticketStatus: Ticket['status'] }>()
const repr = computed(() => TicketStatusMap[props.ticketStatus])
</script>

<template>
  <div class="d-flex align-center">
    <v-icon :color="repr.color" size="large" class="mr-1">
      {{ repr.icon }}
    </v-icon>
    <span :class="`text-${repr.color} font-weight-medium`">
      {{ repr.label ?? ticketStatus }}
    </span>
  </div>
</template>
