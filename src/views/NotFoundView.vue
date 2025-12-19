<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SpoilerEditorWrapper from '@/components/shared/SpoilerEditorWrapper.vue'
import SpoilerViewer from '@/components/shared/SpoilerViewer.vue'

const route = useRoute()
const content = ref(decodeURI(route.path))
</script>

<template>
  <div class="ma-4 d-flex flex-column ga-4">
    <spoiler-viewer :text="content" class="mt-4" visible />
    <spoiler-editor-wrapper v-model="content" prohibit-breaks />
    <v-textarea variant="outlined" rows="1" auto-grow density="compact" />
  </div>
</template>
