<script setup lang="ts">
import { api } from '@/api'
import { onMounted } from 'vue'
import ThemeToggle from './components/shared/ThemeToggle.vue'

onMounted(async () => {
  console.log(await api.getUsers())

  console.log(
    await api.putUsers([
      {
        traq_id: 'kitsne',
        role: 'manager',
      },
    ])
  )

  console.log(
    await api.postTicket({
      title: '初回セットアップ用チケット',
      description: 'このチケットはアプリケーションの初回セットアップのために自動生成されました。',
      status: 'sent',
      assignee: 'kitsne',
      sub_assignees: [],
      stakeholders: [],
      due: '2025-12-31',
      tags: ['setup'],
    })
  )
})
</script>

<template>
  <v-app>
    <router-view />
    <theme-toggle />
  </v-app>
</template>
