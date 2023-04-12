import { EditorConfiguration } from 'codemirror'

export const modeLanMap = {
  javascript: 'javascript',
  java: 'text/x-java',
  json: 'application/json',
  sql: 'text/x-mysql',
  groovy: 'text/x-groovy'
}
export type Language = keyof typeof modeLanMap

export type Theme = 'default' | 'idea' | 'erlang-dark'

export interface CodeMirrorEditorProps {
  /** 当前编辑的内容 */
  modelValue: string
  /** 是否使用对比模式 */
  diffEditor?: boolean
  /** 对比模式下原内容 */
  originValue?: string
  /** 主题 */
  theme?: Theme
  /** 语言 */
  language?: Language
  /** 配置项 */
  options?: EditorConfiguration
  readonly?: boolean
  /** 是否显示当前光标所在行 */
  activeLine?: boolean
  /** 是否对语法错误提示 */
  showLint?: boolean
}
