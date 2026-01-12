<script setup lang="ts">
import { api } from '@/api'
import { reactive, computed, onMounted, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { fromZonedTime } from 'date-fns-tz'
import SpoilerEditorWrapper from '@/components/shared/SpoilerEditorWrapper.vue'
import UserIcon from '@/components/shared/UserIcon.vue'
import { getDateRepresentation, getDateDayString } from '@/utils/date'
import { TicketStatusMap } from '@/lib/maps'
import { TICKET_STATUSES } from '@/lib/schema'
import { cloneDeep, isEqual } from 'lodash-es'

const props = defineProps<{ ticket: Ticket | undefined }>()

// 画面幅を監視
const { smAndDown } = useDisplay()
const drawer = ref(!smAndDown.value)

const toDateISOOrNull = (date: Date | null): string | null => {
  if (!date) return null
  return date.toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' }) // 'YYYY-MM-DD'形式
}

// フォームの状態
const form = reactive({
  title: '',
  description: '',
  assignee: '',
  subAssignees: [] as string[],
  stakeholders: [] as string[],
  status: null as Ticket['status'] | null,
  tags: [] as string[],
  due: null as Date | null,
})

// 初期状態を保存
let initialFormState: typeof form | null = null

const setTicketData = (ticket: Ticket) => {
  form.title = ticket.title
  form.description = ticket.description
  form.assignee = ticket.assignee
  form.subAssignees = ticket.sub_assignees
  form.stakeholders = ticket.stakeholders
  form.due = ticket.due ? fromZonedTime(ticket.due, 'Asia/Tokyo') : null
  form.status = ticket.status
  form.tags = ticket.tags

  initialFormState = cloneDeep(form)
}

const isFieldChanged = computed(() => {
  if (!initialFormState) return false
  return !isEqual(initialFormState, form) // 配列の順序変更も検出
})

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

const emit = defineEmits<{ refresh: [] }>()

const handleSave = async () => {
  if (!props.ticket || !form.status) return
  await api.patchTicket(props.ticket.id, {
    title: form.title,
    description: form.description,
    assignee: form.assignee,
    sub_assignees: form.subAssignees,
    stakeholders: form.stakeholders,
    status: form.status,
    tags: form.tags,
    // due: toDateISOOrNull(due.value),

    // due を null で送ると Bad Request になってしまうので、応急的に undefined に変換する
    due: toDateISOOrNull(form.due) ?? undefined,
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
          <spoiler-editor-wrapper v-model="form.title" :prohibit-breaks="true" />
        </div>
        <div class="d-flex flex-column ga-1 mb-5">
          <small class="text-secondary text-caption">概要</small>
          <spoiler-editor-wrapper v-model="form.description" :class="$style.description" />
        </div>

        <!-- 担当者 -->
        <v-combobox
          v-model="form.assignee"
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
          v-model="form.subAssignees"
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
                      :model-value="form.subAssignees.some((a) => a === item.raw)"
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
          v-model="form.stakeholders"
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
                    <v-checkbox-btn :model-value="form.stakeholders.includes(item.raw)" readonly />
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
          :model-value="form.due ? getDateDayString(form.due) : ''"
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
              <v-date-picker v-model="form.due" class="pb-2" />
              <v-btn
                variant="flat"
                color="red"
                class="position-absolute"
                :class="$style.clearDue"
                @click="form.due = null"
              >
                <div class="font-weight-medium">設定しない</div>
              </v-btn>
            </div>
          </v-menu>
        </v-text-field>

        <!-- ステータス -->
        <v-select
          v-model="form.status"
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
        <v-combobox
          v-model="form.tags"
          label="タグ"
          multiple
          chips
          closable-chips
          variant="outlined"
        />

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
