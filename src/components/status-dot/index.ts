export interface StatusDotProps {
  /** 状态颜色，除了默认状态，可以自定义颜色，也可以用数组来定制背景色和文字色 */
  color?: 'sucess' | 'processing' | 'error' | 'default' | 'warning' | string | [string, string]
}

export { default as default } from './index.vue'
