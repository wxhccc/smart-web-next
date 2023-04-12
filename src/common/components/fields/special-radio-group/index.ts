export interface SpecialRadioGroupProps {
  options: SpeRadioOption[]
  modelValue?: App.StrOrNum
  tag?: 'div' | 'ul'
  valueKey?: string
  type?: 'image' | 'card'
  readonly?: boolean
  disabled?: boolean
  // 只读时是否过滤其他数据项
  readonlyFilter?: boolean
  layout?: 'horizontal' | 'vertical'
  size?: 'small' | 'default' | 'large'
}

export interface SpeRadioOption extends Common.SelectOption {
  /** 卡片cover图片 */
  cover?: string
  /** 提示文字 */
  tip?: string
}

export { default as default } from './index.vue'
