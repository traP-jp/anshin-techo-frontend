<script setup lang="ts">
import { api } from '@/api'
import { computed, onMounted, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { fromZonedTime } from 'date-fns-tz'
import SpoilerEditorWrapper from '@/components/shared/SpoilerEditorWrapper.vue'
import UserIcon from '@/components/shared/UserIcon.vue'
import { getDateRepresentation, getDateDayString } from '@/utils/date'
import { TicketStatusList, TicketStatusMap } from '@/types'

const props = defineProps<{ ticket: Ticket }>()

// 画面幅を監視
const { width } = useDisplay()
// 770px以下でTicketSideBarが閉じる
const isSmallScreen = computed(() => width.value <= 770)
const drawer = ref(!isSmallScreen.value)

watch(isSmallScreen, (val) => {
  if (!val) {
    drawer.value = true
  } else {
    drawer.value = false
  }
})

// 入力内容
const title = ref(props.ticket.title)
const description = ref(props.ticket.description)
// traQ のユーザーリストから選択できるようにする？ そのためにはバックエンドに対応をお願いしなきゃ
const assignee = ref(props.ticket.assignee)
const subAssignees = ref(props.ticket.sub_assignees)
const stakeholders = ref(props.ticket.stakeholders)
const due = ref<Date | null>(
  props.ticket.due ? fromZonedTime(props.ticket.due, 'Asia/Tokyo') : null
) // 'YYYY-MM-DD' 形式 -> Date
const ticketStatus = ref<Ticket['status']>(props.ticket.status)
const tags = ref<string[]>(props.ticket.tags)

const isFieldChanged = computed(() => {
  const dueISO = due.value
    ? due.value.toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' })
    : null // Date -> 'YYYY-MM-DD' 形式

  return (
    title.value !== props.ticket.title ||
    description.value !== props.ticket.description ||
    assignee.value !== props.ticket.assignee ||
    JSON.stringify(subAssignees.value) !== JSON.stringify(props.ticket.sub_assignees) ||
    JSON.stringify(stakeholders.value) !== JSON.stringify(props.ticket.stakeholders) ||
    ticketStatus.value !== props.ticket.status ||
    JSON.stringify(tags.value) !== JSON.stringify(props.ticket.tags) ||
    dueISO !== props.ticket.due
  )
})

const handleCancel = () => {
  title.value = props.ticket.title
  description.value = props.ticket.description
  assignee.value = props.ticket.assignee
  subAssignees.value = props.ticket.sub_assignees
  stakeholders.value = props.ticket.stakeholders
  due.value = props.ticket.due ? new Date(props.ticket.due) : null
  ticketStatus.value = props.ticket.status
  tags.value = props.ticket.tags
}

const emit = defineEmits(['refresh'])

const handleSave = async () => {
  // dueをYYYY-MM-DD形式 or nullに変換
  const dueISO = due.value
    ? due.value.toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' })
    : null
  await api.patchTicket(props.ticket.id, {
    title: title.value,
    description: description.value,
    status: ticketStatus.value,
    assignee: assignee.value,
    sub_assignees: subAssignees.value,
    stakeholders: stakeholders.value,
    due: dueISO,
    tags: tags.value,
  })
  emit('refresh')
}

const users = ref<User[]>([])
onMounted(async () => {
  users.value = await api.getUsers()
})
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="!isSmallScreen"
    :temporary="isSmallScreen"
    width="300"
  >
    <div class="d-flex flex-column">
      <!-- ヘッダー -->
      <div class="text-h6 ml-5 mt-3">{{ ticket.title }}</div>
      <div class="text-body-2 text-secondary ml-5 mt-1">#{{ ticket.id }}</div>
      <div class="text-body-2 text-secondary ml-5">
        作成日時 : {{ getDateRepresentation(ticket.created_at) }}
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
          :items="TicketStatusList"
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
    v-if="isSmallScreen && !drawer"
    icon="mdi-dock-left"
    class="position-fixed ma-2"
    style="top: 0; left: 0; z-index: 2"
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
