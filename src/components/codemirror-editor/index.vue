<template>
  <div class="codemirror-editor-wrapper ant-input" :style="editorStyles">
    <a-textarea ref="textarea" class="codemirror-editor" v-bind="$attrs"></a-textarea>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, ComponentPublicInstance, StyleValue } from 'vue'
import { Textarea } from 'ant-design-vue'
import { vueTypeProp } from '@wxhccc/ue-antd-vue'
import { mergeObj } from '@/utils'
import CodeMirror, { Editor, EditorChange, EditorConfiguration } from 'codemirror'
import { CodeMirrorEditorProps, modeLanMap } from './types'
import jsonlint from 'jsonlint-mod'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/groovy/groovy'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
import 'codemirror/theme/erlang-dark.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/lint/lint.css'
// addon
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/sql-hint'
import 'codemirror/addon/fold/foldcode'

export default defineComponent({
  name: 'CodemirrorEditor',
  components: {
    [Textarea.name]: Textarea
  },
  inheritAttrs: false,
  props: {
    modelValue: vueTypeProp<CodeMirrorEditorProps['modelValue']>(String, ''),
    theme: vueTypeProp<NonNullable<CodeMirrorEditorProps['theme']>>(String, 'erlang-dark'),
    language: vueTypeProp<NonNullable<CodeMirrorEditorProps['language']>>(String, 'javascript'),
    options: vueTypeProp<CodeMirrorEditorProps['options']>(Object),
    activeLine: vueTypeProp<boolean>(Boolean, true),
    showLint: vueTypeProp<boolean>(Boolean, true),
    readonly: vueTypeProp<CodeMirrorEditorProps['readonly']>(Boolean)
  },
  emits: ['update:modelValue', 'change', 'editor-before-mount', 'editor-mounted', 'editor-mount-fail'],
  setup(props, { attrs }) {
    let editor: Editor | undefined
    const textarea = ref<ComponentPublicInstance>()
    const editorAccess = ref(false)
    const selfTriggle = ref(false)
    const defaultOptions: EditorConfiguration = {
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: true,
      hintOptions: {
        completeSingle: false
      }
    }
    if (props.language === 'json' && props.showLint) {
      ;(window as any).jsonlint = jsonlint
    }
    const initOptions = computed<EditorConfiguration>(() => {
      return mergeObj(
        defaultOptions,
        {
          theme: props.theme,
          mode: modeLanMap[props.language],
          value: props.modelValue,
          readOnly: props.readonly,
          placeholder: attrs.placeholder,
          styleActiveLine: props.activeLine,
          lint: true
        } as EditorConfiguration,
        props.options
      )
    })

    return { textarea, editor, editorAccess, initOptions, selfTriggle }
  },
  computed: {
    editorStyles(): StyleValue {
      if (!this.editorAccess) {
        return {}
      }
      const { rows } = this.$attrs as { rows: number }
      return rows ? { height: `${rows * 30}px` } : {}
    }
  },
  watch: {
    modelValue(newValue: string) {
      // 如果编辑器不可以,则不处理value变化
      if (!this.editorAccess) {
        return
      }
      if (this.selfTriggle) {
        this.selfTriggle = false
        return
      }
      this.$nextTick(() => this.editor?.setValue(newValue))
    }
  },
  mounted() {
    this.initMonaco()
  },
  methods: {
    async initMonaco() {
      this.$emit('editor-before-mount')
      try {
        if (!this.textarea) {
          return
        }
        this.editor = CodeMirror.fromTextArea(this.textarea.$el, this.initOptions)
        this.editor.on('change', this.onValueChange)
        this.editor.on('inputRead', () => this.editor?.showHint())
        this.editorAccess = true
        this.editor.setValue(this.modelValue)
        this.$emit('editor-mounted', this.editor)
      } catch (e) {
        this.editor = this.$refs.textarea as any
        this.$emit('editor-mount-fail', e)
      }
    },
    onValueChange(instance: Editor, event: EditorChange) {
      const value = instance.getValue()
      if (this.modelValue !== value) {
        this.selfTriggle = true
        this.$emit('update:modelValue', value)
        this.$emit('change', value, event)
      }
    },
    focus() {
      this.editor?.focus()
    }
  }
})
</script>

<style lang="scss">
.codemirror-editor-wrapper {
  padding: 0;
  .CodeMirror {
    height: 100%;
  }
}
.CodeMirror-hints {
  z-index: 9999;
}
</style>
