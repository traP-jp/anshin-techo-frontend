<script setup lang="ts">
import { ref } from 'vue'
import SpoilerEditorWrapper from '@/components/shared/SpoilerEditorWrapper.vue'
const content = ref('あ!!い!!う')
</script>

<template>
  <spoiler-editor-wrapper v-model="content" class="ma-4" />
</template>
