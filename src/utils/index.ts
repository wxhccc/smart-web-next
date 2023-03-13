export * from './utils'
export * from './keyValueMap'
export * from './formatter'
export * from './storage'

/** 处理空字符串或undefined,返回指定格式的占位字符 **/
export function emptyCell(value: unknown) {
  return value || value === 0 ? value : '--'
}
