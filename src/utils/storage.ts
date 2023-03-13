import Store from 'store2'

/** 全局的storage命名空间，保证系统内所有本地限定在范围内 **/
export const Storage = Store.namespace('SMART_WEB') 

export const CompStorage = (component: string) => Storage.namespace(`${component || ''}`)

/**
 * 存储指定页面的数据
 */
export const pageStorage = (pageName: string) => (name?: string, value?: any, clean?: boolean) => {
  if (!name) {
    return undefined
  }
  const pageKey = `Page_${pageName}`
  const data = Storage.get(pageKey) || {}
  if (value === undefined) {
    return data[name]
  }
  const newData = Object.assign(clean ? {} : data, { [name]: value })
  Storage.set(pageKey, newData)
}
