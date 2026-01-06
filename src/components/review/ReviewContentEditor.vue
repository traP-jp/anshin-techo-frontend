<script setup lang="ts">
import { ref } from 'vue'
import { ReviewTypeMap } from '@/types/maps'
import { REVIEW_TYPES } from '@/types/constants'
import SpoilerEditorWrapper from '@/components/shared/SpoilerEditorWrapper.vue'
const emit = defineEmits<{ confirm: [review: CreateReviewBody] }>()

const content = ref('')
const reviewType = ref<Exclude<Review['type'], 'system'>>('comment')
const weight = ref(3)
</script>

<template>
  <div class="d-flex flex-column ga-3">
    <spoiler-editor-wrapper v-model="content" :class="$style.editor" />
    <div class="d-flex flex-row ga-2 align-center flex-shrink-0">
      <div class="flex-grow-1 d-flex ga-2">
        <v-select
          v-model="reviewType"
          label="レビュータイプ"
          :items="REVIEW_TYPES.filter((type) => type !== 'system')"
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
        <v-number-input
          v-model="weight"
          :disabled="reviewType !== 'approve'"
          :max="5"
          :min="1"
          :reverse="false"
          control-variant="default"
          label="ウェイト"
          :hide-input="false"
          :inset="false"
          variant="outlined"
          density="compact"
          hide-details
          :class="$style.select"
        ></v-number-input>
      </div>
      <v-btn
        variant="flat"
        color="input"
        height="40"
        @click="emit('confirm', { type: reviewType, weight: weight, comment: content })"
      >
        <div class="font-weight-medium">投稿</div>
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
