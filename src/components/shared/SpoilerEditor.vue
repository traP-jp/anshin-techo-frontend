<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { EditorState, StateField, type Range, Text, Prec } from '@codemirror/state'
import { EditorView, keymap, Decoration, type DecorationSet } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'

const editorRef = ref<HTMLDivElement | null>(null)
let editorView: EditorView | null = null // editorRef の CodeMirror 用ラップ

const props = defineProps<{
  initialContent?: string
  prohibitBreaks?: boolean
}>()

const emit = defineEmits<{
  edit: [content: string]
  focus: [isFocused: boolean]
}>()

// 装飾の定義。クラス名を指定
const spoilerMark = Decoration.mark({ class: 'cm-spoiler' })

// ドキュメント全体からスポイラーを探す
function getSpoilerDecorations(doc: Text): DecorationSet {
  const decorations: Range<Decoration>[] = []
  const text = doc.toString()
  for (const match of text.matchAll(/!!(.*?)!!/gs)) {
    decorations.push(spoilerMark.range(match.index, match.index + match[0].length))
  }

  return Decoration.set(decorations)
}

// 伏字の状態管理
const spoilerField = StateField.define<DecorationSet>({
  create: (state) => getSpoilerDecorations(state.doc), // 初期化
  update: (decorations, tr) => {
    return tr.docChanged ? getSpoilerDecorations(tr.state.doc) : decorations
    // ドキュメントが変更された場合のみ再計算
  },
  provide: (field) => EditorView.decorations.from(field),
})

onMounted(() => {
  if (!editorRef.value) return

  // 拡張機能を登録
  const extensions = [
    history(),
    keymap.of([...defaultKeymap, ...historyKeymap]),
    EditorView.updateListener.of((update) => {
      // トランザクションのハンドラ。自らはドキュメントの変更権限を持たない
      if (update.docChanged) emit('edit', update.state.doc.toString())
      if (update.focusChanged) emit('focus', update.view.hasFocus)
    }),
    spoilerField,
  ]

  // 改行を防ぐフィルタ
  if (props.prohibitBreaks) {
    extensions.push(
      Prec.highest(
        keymap.of([
          { key: 'Enter', run: () => true },
          { key: 'Shift-Enter', run: () => true },
          { key: 'Mod-Enter', run: () => true },
        ])
      ),
      EditorState.transactionFilter.of((tr) => {
        if (!tr.docChanged || tr.newDoc.lines <= 1) return tr
        const oldText = tr.newDoc.toString()
        const newText = oldText.replace(/[\r\n]+/g, ' ')

        // 改行をスペースに置換しつつ、カーソル位置を維持する
        const oldAnchor = tr.newSelection.main.anchor
        const newAnchor = oldText.slice(0, oldAnchor).replace(/[\r\n]+/g, ' ').length

        return {
          // 元のトランザクションの内容を無視
          changes: { from: 0, to: tr.startState.doc.length, insert: newText },
          selection: { anchor: newAnchor },
        }
      })
    )
  } else {
    extensions.push(EditorView.lineWrapping)
  }

  // エディタの初期状態を設定
  const startState = EditorState.create({
    doc: props.initialContent ?? '',
    extensions: extensions,
  })

  editorView = new EditorView({
    state: startState,
    parent: editorRef.value,
  })
})

onBeforeUnmount(() => {
  editorView?.destroy()
})

defineExpose({
  getContent: () => editorView?.state.doc.toString(),
  setContent: (content: string) => {
    if (!editorView) return
    if (content === editorView.state.doc.toString()) return // 同じ内容なら更新をサボる
    editorView.dispatch({
      changes: { from: 0, to: editorView.state.doc.length, insert: content },
      // ドキュメント全体を新しい内容で置き換えるトランザクションを発行
    })
  },
})
</script>

<template>
  <div ref="editorRef" :class="$style.editorContainer"></div>
</template>

<style module lang="scss">
@use 'sass:meta';

.editorContainer {
  width: 100%;
  height: 100%;
  :global {
    @include meta.load-css('@/styles/editor-style.scss');
  }
}
</style>
