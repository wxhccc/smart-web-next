<template>
  <div class="prism-code">
    <pre
      :class="{ 'line-numbers': lineNumber, 'soft-wrap': wrap }"
    ><code :class="`lang-${language}`" :innerHTML="highlightDom" v-bind="pluginsAttrs"></code>
    </pre>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import Prism from 'prismjs'
import { vueTypeProp } from '@wxhccc/ue-antd-vue'
import { PrismCodeProps } from './'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-json'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/toolbar/prism-toolbar.css'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

const defCopyTexts = {
  'data-prismjs-copy': '复制代码',
  'data-prismjs-copy-success': '复制成功',
  'data-prismjs-copy-error': '复制失败',
  'data-prismjs-copy-timeout': 2000
}

type PropsWithDef = Required<PrismCodeProps>

export default defineComponent({
  name: 'PrismCode',
  props: {
    language: vueTypeProp<PropsWithDef['language']>(String, 'json'),
    code: vueTypeProp<PrismCodeProps['code']>(String),
    lineNumber: vueTypeProp<PropsWithDef['wrap']>(Boolean, true),
    copy: vueTypeProp<PropsWithDef['copy']>([Boolean, String], true),
    wrap: vueTypeProp<PrismCodeProps['wrap']>(Boolean)
  },
  setup(props) {
    const highlightDom = computed(() => {
      const { code, language } = props
      return Prism.highlight(code, Prism.languages['javascript'], language)
    })
    const pluginsAttrs = computed(() => {
      const result: Record<string, App.StrOrNum> = {}
      if (props.copy) {
        const copyTexts = props.copy === true ? {} : props.copy
        Object.assign(result, defCopyTexts, copyTexts)
      }
      return result
    })
    return { highlightDom, pluginsAttrs }
  },
  mounted() {
    Prism.highlightAll()
  },
  updated() {
    Prism.highlightAll()
  }
})
</script>

<style lang="scss">
.prism-code {
  width: 100%;
  height: 100%;
  overflow: auto;
  pre {
    border: 0;
    border-radius: 0;
    padding: 6px;
    line-height: 1.2;
  }
  .soft-wrap {
    white-space: pre-wrap;
  }
}
</style>
