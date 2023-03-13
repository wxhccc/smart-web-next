import { mapToObject } from '@wxhccc/es-util'
/***
 ** 字典转换
 * {object} appConfig 系统配置信息对象
 * {array} keys 需要转化成key-value形式的对象的appConfig对象中的key数组
 ** 返回值: {object} 返回新的字典对象
 ***/
export function configToMap(appConfig: Record<string, App.Option[]>, keys?: string[]) {
  keys = Array.isArray(keys) ? keys : Object.keys(appConfig)
  const result: Record<string, Record<string, number | string>> = {}
  appConfig &&
    keys.forEach((item) => {
      if (Array.isArray(appConfig[item])) {
        result[item] = mapToObject(appConfig[item], (item: App.Option) => `${item.value}`, 'label')
      }
    })
  return result
}

/**
 * 将对象数组转换成变化转换函数
 * @param config 对象数组
 * @returns
 */
export function configToFilter(config: App.Option[]) {
  const map = mapToObject(config, 'value', 'label')
  return (key: App.StrOrNum) => map[key]
}
