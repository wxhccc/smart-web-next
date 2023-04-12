export interface CopyTexts {
  'data-prismjs-copy'?: string
  'data-prismjs-copy-success'?: string
  'data-prismjs-copy-error'?: string
  'data-prismjs-copy-timeout'?: number
}

export interface PrismCodeProps {
  language?: 'javascript' | 'json'
  code: string
  lineNumber?: boolean
  copy?: boolean | CopyTexts
  /** 是否使用软换行，lineNumber为true时有效 */
  wrap?: boolean
}

export { default as default } from './index.vue'
