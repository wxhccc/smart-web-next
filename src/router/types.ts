import { RouteRecordRaw, RouteMeta as OrgRouteMeta } from 'vue-router'

export interface RouteBreadcrumbItem {
  /** 路由name */
  name?: string
  /** 显示文字 */
  label: string
}
export interface RouteMeta extends OrgRouteMeta {
  /** 当前路由需要激活的左侧菜单栏对应的页面name，一般用于详情页 */
  activeTarget?: string
  /** 当前路由在回退时是否需要对之前页面状态进行恢复，一般用于详情页 */
  remember?: boolean
  /** 当前路由的面包屑配置，如无特殊需求(比如页面可以同时新增和编辑，希望显示不同名称) */
  breadcrumb?: RouteBreadcrumbItem[]
  /** 当前路由所在的一级菜单的名称，用于在跳转后正确展开菜单 */
  rootMenuName?: string
  /** 虚拟页面的配置id，虚拟路由页面才有 */
  virtualPageId?: App.StrOrNum
  [k: string]: any
}

export interface RouteRecordItem extends Omit<RouteRecordRaw, 'component' | 'meta'> {
  title?: string
  component?: string | RouteRecordRaw['component']
  rightRelevance?: string | [string, (action: string[]) => boolean]
  meta?: RouteMeta
}

export interface TplRouteRecord {
  path: (routeName: string) => string
  tplName: string
  meta?: RouteMeta
}
