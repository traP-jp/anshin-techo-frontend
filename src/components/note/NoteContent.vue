<script setup lang="ts">
import { ref } from 'vue'
import SpoilerViewer from '@/components/shared/SpoilerViewer.vue'
import SpeechSheet from '@/components/shared/SpeechSheet.vue'

defineProps<{ note: Note; isFocused?: boolean }>()
const emit = defineEmits<{ edit: [] }>()
const isHovered = ref(false)
</script>

<template>
  <speech-sheet
    v-if="note.type !== 'other'"
    :note="note"
    class="mt-1 position-relative pa-3"
    :class="{ [$style.focused]: isFocused }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <spoiler-viewer class="text-pre-wrap" :text="note.content" />
    <v-btn
      v-if="isHovered"
      :class="$style.editInSpeech"
      class="text-grey"
      size="32px"
      icon="mdi-pencil"
      variant="text"
      @click="emit('edit')"
    />
  </speech-sheet>
  <div
    v-else
    class="position-relative d-flex"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <spoiler-viewer class="text-pre-wrap" :text="note.content" />
    <v-btn
      v-if="isHovered"
      :class="$style.editOtherNote"
      class="text-grey"
      size="32px"
      icon="mdi-pencil"
      variant="text"
      @click="emit('edit')"
    />
  </div>
</template>

<style module>
.focused {
  outline: 1.5px solid #ff5500; /* いったんハードコード */
}

.editInSpeech {
  position: absolute;
  top: 0px;
  right: 0px;
}

.editOtherNote {
  position: absolute;
  top: -16px;
  right: -16px;
}
</style>
