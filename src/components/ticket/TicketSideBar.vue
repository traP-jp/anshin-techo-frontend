<script setup lang="ts">
import { api } from '@/api'
import { computed, onMounted, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { fromZonedTime } from 'date-fns-tz'
import SpoilerEditorWrapper from '@/components/shared/SpoilerEditorWrapper.vue'
import UserIcon from '@/components/shared/UserIcon.vue'
import { getDateRepresentation, getDateDayString } from '@/utils/date'
import { TicketStatusMap } from '@/types/maps'
import { TICKET_STATUSES } from '@/types/constants'

const props = defineProps<{ ticket: Ticket | undefined }>()

// 画面幅を監視
const { smAndDown } = useDisplay()
const drawer = ref(!smAndDown.value)

const toDateISOOrNull = (date: Date | null): string | null => {
  if (!date) return null
  return date.toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' }) // 'YYYY-MM-DD'形式
}

// 入力内容
const title = ref('')
const description = ref('')
const assignee = ref('')
const subAssignees = ref<string[]>([])
const stakeholders = ref<string[]>([])
const due = ref<Date | null>(null)
const ticketStatus = ref<Ticket['status'] | null>(null)
const tags = ref<string[]>([])

const setTicketData = (ticket: Ticket) => {
  title.value = ticket.title
  description.value = ticket.description
  assignee.value = ticket.assignee
  subAssignees.value = ticket.sub_assignees
  stakeholders.value = ticket.stakeholders
  due.value = ticket.due ? fromZonedTime(ticket.due, 'Asia/Tokyo') : null
  ticketStatus.value = ticket.status
  tags.value = ticket.tags
}

watch(
  () => props.ticket,
  (newTicket) => {
    if (newTicket) setTicketData(newTicket)
    // props.ticket が変わった（セットされた）ときに入力内容をセットする
  },
  { immediate: true } // 初回実行
)

const handleCancel = () => {
  if (props.ticket) setTicketData(props.ticket)
  // 全て props.ticket の値に戻す
}

const isFieldChanged = computed(() => {
  if (!props.ticket || !ticketStatus.value) return false
  return (
    title.value !== props.ticket.title ||
    description.value !== props.ticket.description ||
    assignee.value !== props.ticket.assignee ||
    JSON.stringify(subAssignees.value) !== JSON.stringify(props.ticket.sub_assignees) ||
    JSON.stringify(stakeholders.value) !== JSON.stringify(props.ticket.stakeholders) ||
    ticketStatus.value !== props.ticket.status ||
    JSON.stringify(tags.value) !== JSON.stringify(props.ticket.tags) ||
    // toDateISOOrNull(due.value) !== props.ticket.due

    // バックエンドが due を undefined で返してしまっているので、応急的に null と undefined を同一視する
    !!toDateISOOrNull(due.value) !== !!props.ticket.due
    // TODO: バックエンドが修正され次第この行を削除すること
  ) // 配列は順序まで比較
})

const emit = defineEmits<{ refresh: [] }>()

const handleSave = async () => {
  if (!props.ticket || !ticketStatus.value) return
  await api.patchTicket(props.ticket.id, {
    title: title.value,
    description: description.value,
    assignee: assignee.value,
    sub_assignees: subAssignees.value,
    stakeholders: stakeholders.value,
    status: ticketStatus.value,
    tags: tags.value,
    // due: toDateISOOrNull(due.value),

    // due を null で送ると Bad Request になってしまうので、応急的に undefined に変換する
    due: toDateISOOrNull(due.value) ?? undefined,
    // TODO: バックエンドが修正され次第この行を削除すること
  })
  emit('refresh')
}

const users = ref<User[]>([])
onMounted(async () => {
  users.value = await api.getUsers()
})
</script>

<template>
  <v-navigation-drawer v-model="drawer" :permanent="!smAndDown" :temporary="smAndDown" width="300">
    <div class="d-flex flex-column">
      <!-- ヘッダー -->
      <div class="text-h6 ml-5 mt-3">{{ ticket?.title }}</div>
      <div class="text-body-2 text-secondary ml-5 mt-1">#{{ ticket?.id }}</div>
      <div class="text-body-2 text-secondary ml-5">
        作成日時 : {{ ticket ? getDateRepresentation(ticket.created_at) : '' }}
      </div>
      <div class="d-flex flex-column ml-5 mr-4 mt-4">
        <!-- タイトル -->
        <!-- <v-text-field label="タイトル" variant="outlined" density="compact" hide-details /> -->
        <div class="d-flex flex-column ga-1 mb-2">
          <div class="text-secondary text-caption">タイトル</div>
          <spoiler-editor-wrapper v-model="title" :prohibit-breaks="true" />
        </div>
        <div class="d-flex flex-column ga-1 mb-5">
          <small class="text-secondary text-caption">概要</small>
          <spoiler-editor-wrapper v-model="description" :class="$style.description" />
        </div>

        <!-- 担当者 -->
        <v-combobox
          v-model="assignee"
          :items="users.map((u) => u.traq_id)"
          label="主担当"
          variant="underlined"
          density="compact"
          hide-details
          class="mb-3"
        >
          <template #item="{ item, props: itemProps }">
            <v-list-item v-bind="itemProps" :class="$style.listItem">
              <template #title>
                <div class="d-flex flex-row align-center justify-space-between">
                  <div>{{ item.raw }}</div>
                  <user-icon :id="item.raw" :size="24" />
                </div>
              </template>
            </v-list-item>
          </template>
        </v-combobox>

        <!-- 副担当 -->
        <v-combobox
          v-model="subAssignees"
          :items="users.map((u) => u.traq_id)"
          label="副担当"
          variant="underlined"
          multiple
          hide-details
          class="mb-3"
        >
          <template #selection="{ item }">
            <user-icon :id="item.raw" :size="24" />
          </template>
          <template #item="{ item, props: itemProps }">
            <v-list-item v-bind="itemProps" :class="$style.listItem">
              <template #title>
                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    <v-checkbox-btn
                      :model-value="subAssignees.some((a) => a === item.raw)"
                      readonly
                    />
                    <div>{{ item.raw }}</div>
                  </div>
                  <user-icon :id="item.raw" :size="24" />
                </div>
              </template>
            </v-list-item>
          </template>
        </v-combobox>

        <!-- 関係者 -->
        <v-combobox
          v-model="stakeholders"
          :items="users.map((u) => u.traq_id)"
          label="関係者"
          variant="underlined"
          multiple
          :class="$style.stakeholdersCombobox"
          hide-details
          class="mb-5"
        >
          <template #selection="{ item }">
            <user-icon :id="item.raw" :size="24" />
          </template>
          <template #item="{ item, props: itemProps }">
            <v-list-item v-bind="itemProps" :class="$style.listItem">
              <template #title>
                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    <v-checkbox-btn :model-value="stakeholders.includes(item.raw)" readonly />
                    <div>{{ item.raw }}</div>
                  </div>
                  <user-icon :id="item.raw" :size="24" />
                </div>
              </template>
            </v-list-item>
          </template>
        </v-combobox>

        <!-- 期日 -->
        <v-text-field
          :model-value="due ? getDateDayString(due) : ''"
          label="期日"
          variant="underlined"
          density="compact"
          append-icon="mdi-calendar"
          hint="次回はxx時間後にリマインドされます"
          persistent-hint
          class="mb-4"
          :class="$style.due"
          readonly
        >
          <v-menu :close-on-content-click="false" activator="parent" min-width="0">
            <div class="position-relative">
              <v-date-picker v-model="due" class="pb-2" />
              <v-btn
                variant="flat"
                color="red"
                class="position-absolute"
                :class="$style.clearDue"
                @click="due = null"
              >
                <div class="font-weight-medium">設定しない</div>
              </v-btn>
            </div>
          </v-menu>
        </v-text-field>

        <!-- ステータス -->
        <v-select
          v-model="ticketStatus"
          label="チケットステータス"
          :items="TICKET_STATUSES"
          variant="underlined"
          density="compact"
        >
          <template #selection="{ item }">{{ TicketStatusMap[item.raw].label }}</template>
          <template #item="{ item, props: itemProps }">
            <v-list-item v-bind="itemProps" :class="$style.listItem">
              <template #title>
                <div class="d-flex flex-row align-center justify-space-between">
                  <div>{{ TicketStatusMap[item.raw].label }}</div>
                  <v-icon :color="TicketStatusMap[item.raw].color" size="large" class="ml-2">
                    {{ TicketStatusMap[item.raw].icon }}
                  </v-icon>
                </div>
              </template>
            </v-list-item>
          </template></v-select
        >

        <!-- タグ -->
        <v-combobox v-model="tags" label="タグ" multiple chips closable-chips variant="outlined" />

        <!-- アクション -->
        <div class="d-flex justify-end ga-2">
          <v-btn variant="outlined" text="キャンセル" @click="handleCancel" />
          <v-btn variant="flat" color="input" :disabled="!isFieldChanged" @click="handleSave">
            <div class="font-weight-medium">保存</div>
          </v-btn>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
  <v-btn
    v-if="smAndDown && !drawer"
    icon="mdi-dock-left"
    class="position-fixed top-0 left-0 ma-2 z-10"
    variant="flat"
    @click="drawer = true"
  />
</template>

<style module>
.description {
  min-height: 100px;
  max-height: 100px;
}

.due :global(.v-field),
.due :global(input) {
  cursor: pointer !important;
}

.listItem {
  min-height: 0px !important;
  height: 40px !important;
}

.clearDue {
  bottom: 16px;
  right: 16px;
}
</style>
