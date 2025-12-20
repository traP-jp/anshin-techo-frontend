<script setup lang="ts">
import { ref } from 'vue'
import { ReviewTypeList, ReviewTypeMap } from '@/types'
import SpoilerEditorWrapper from '@/components/shared/SpoilerEditorWrapper.vue'

const content = ref('')
const reviewType = ref<Review['type']>('comment')
</script>

<template>
  <div class="d-flex flex-column ga-3">
    <spoiler-editor-wrapper v-model="content" :class="$style.editor" />
    <div class="d-flex flex-row ga-2 align-center flex-shrink-0">
      <div class="flex-grow-1 d-flex ga-2">
        <v-select
          v-if="!note"
          v-model="reviewType"
          label="レビュータイプ"
          :items="ReviewTypeList"
          variant="outlined"
          density="compact"
          hide-details
          :class="$style.select"
        >
          <template #selection="{ item }">{{ ReviewTypeMap[item.raw] }}</template>
          <template #item="{ item, props: itemProps }">
            <v-list-item v-bind="itemProps" :class="$style.listItem">
              <template #title>{{ ReviewTypeMap[item.raw] }}</template>
            </v-list-item>
          </template>
        </v-select>
      </div>
      <v-btn variant="flat" color="input" height="40">
        <div class="font-weight-medium">{{ note ? '保存' : '投稿' }}</div>
      </v-btn>
    </div>
  </div>
</template>

<style module>
.editor {
  flex-grow: 1;
  overflow-y: auto;
}

.listItem {
  min-height: 0px !important;
  height: 40px !important;
}

.select {
  width: 50%;
}
</style>
