import { AsyncComponentLoader, Component } from 'vue'
import { kebabCase } from 'lodash-es'
import { TplRouteRecord } from './types'

/** 虚拟页map */
const vitrualRoutesMap: Record<string, AsyncComponentLoader<Component>> = {
  PagedTablePage: () => import('@/common/template/paged-list-page')
}

/** 模版页的配置信息对象 **/
export const tplSwitchMap: Record<string, TplRouteRecord> = {
  PagedTablePage: {
    path: (routeName: string) => `/${kebabCase(routeName)}`,
    tplName: '通用分页列表页'
  }
}

/** 导出模版配置为列表供appConfig使用 **/
export function getTplOptions() {
  return Object.keys(tplSwitchMap).map((name) => ({
    label: tplSwitchMap[name].tplName,
    value: name
  }))
}

export default vitrualRoutesMap
