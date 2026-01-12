<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { EditorState, StateField, type Range, Text, Prec } from '@codemirror/state'
import { EditorView, keymap, Decoration, WidgetType, type DecorationSet } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'

class GuardWidget extends WidgetType {
  toDOM() {
    const span = document.createElement('span')
    span.style.cssText = 'display: none'

    // ↑ テキスト消滅バグ（再現性 : Mac & Chrome）を防ぎつつ、カーソル位置のずれを防ぐ

    // 既存のテキストとカーソル位置を「あ!!い!!|う」として、
    // 1. 日本語入力状態で「と」（t, o）と入力して、「と」を Delete
    // 2. 右矢印キーを連打して「う」の後ろに持っていくと「!!い!!」が消滅する

    // contentEditable=false や user-select: none は使用せず、
    // width: 0; height: 0; overflow: hidden で視覚的に非表示にする
    // vertical-align: baseline でFirefoxのカーソル位置ずれを防ぐ

    return span
  }

  eq(other: WidgetType) {
    return other instanceof GuardWidget // 再レンダリング時に DOM を再利用
  }
}

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
const guardWidget = Decoration.widget({ widget: new GuardWidget(), side: 0 })

// ドキュメント全体からスポイラーを探す
function getSpoilerDecorations(doc: Text): DecorationSet {
  const decorations: Range<Decoration>[] = []
  const text = doc.toString()

  for (const match of text.matchAll(/!!(.*?)!!/gs)) {
    const from = match.index
    const to = from + match[0].length
    decorations.push(spoilerMark.range(from, to))

    const isChrome = navigator.userAgent.includes('Chrome')
    // 大まかに Chromium 系かどうかを判定
    // Chrome, Edge, Opera は true, Firefox, Safari は false

    if (isChrome) decorations.push(guardWidget.range(to))
    // 安定して動作する Chromium 系のみでガードウィジェットを追加
    // 目的 : カーソル位置「あ!!い!!|う」において日本語入力の装飾が伏字ではなく地の文仕様になること
    // Chromium 以外はこの機能を諦め、CodeMirror が提供する基本的なカーソル管理機能の仕様に頼る
  }

  decorations.sort((a, b) => a.from - b.from)
  // 保証されていない場合 CodeMirror がエラーを投げてエディタが使用不可能になる

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
      }),
      EditorView.theme({ '.cm-scroller': { overflowX: 'hidden' } })
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
  focus: () => editorView?.focus(),
})
</script>

<template>
  <div ref="editorRef" :class="$style.editorContainer"></div>
</template>

<style module lang="scss">
@use 'sass:meta';

.editorContainer {
  :global {
    @include meta.load-css('@/styles/editor-style.scss');
  }
}
</style>
