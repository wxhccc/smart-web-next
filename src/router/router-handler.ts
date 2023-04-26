import { cloneDeep } from 'lodash-es'
import { Router, RouteRecordRaw } from 'vue-router'
import { RouteMeta, RouteRecordItem } from './types'
import { adminDynaRoutes } from './admin-routes'
import vitrualRoutesMap, { tplSwitchMap } from './vitrual-routes'

type RouteActions = string[]
type RouteParentNames = Record<string, string>
type RightsMap = Record<string, App.RightItem>

export interface MenuRoutesInfo {
  /** 左侧主菜单数据 */
  menu: App.SideMenuItem[]
  /** 动态权限路由数据 */
  dynaRoutes: RouteRecordItem[]
  /** 所有功能点字符串 */
  actions: string[]
}
/**
 * 根据接口返回的权限菜单数据生成菜单和路由数据
 * 菜单及路由处理----入口
 **/
export function handleMenuInfo(rightsInfo: App.RightItem[]) {
  const result: MenuRoutesInfo = { menu: [], dynaRoutes: [], actions: [] }
  if (Array.isArray(rightsInfo) && rightsInfo.length) {
    // 获取本地动态路由列表
    const dynaRoutes = adminDynaRoutes()
    try {
      // 生成菜单数据和路由权限
      const { menu, routeActions, routeParentNames, rightsMap, virtualRoutes } =
        handleMenusInfo(rightsInfo)
      // 生成动态路由数据
      result.dynaRoutes = handleRoutes(
        routeActions,
        dynaRoutes.concat(virtualRoutes),
        rightsMap,
        routeParentNames
      )
      result.menu = menu
      result.actions = routeActions
    } catch (e) {
      console.log(e)
    }
  }
  return result
}
/** 检查变量是否是函数，如果是将指定参数传入并返回值 **/
function getFnValue<T>(value: T | App.AnyFunction<T>, ...args: any[]) {
  return value instanceof Function ? value(...args) : value
}
/* 根据本地文件生成可用路由name数组 */
// function getAccessRouteNames(dynaRoutes: RouteRecordItem[]) {
//   const names: string[] = []
//   dynaRoutes.forEach((route) => {
//     const { name, component } = route
//     if (adminComponents[name as string] || (typeof component === 'string' && adminComponents[component])) {
//       names.push(name as string)
//     }
//   })
//   return names
// }

/**
 * 检查当前菜单项是否有索引子菜单
 * 如果存在则检出当前菜单索引子菜单，否则返回当前菜单本身
 */
function checkoutIndexItem(item: App.RightItem) {
  if (!item.index || !item.children || !item.children.length || !item.children[0].type) return item
  const searchChildDeep = (children: App.RightItem[]): undefined | App.RightItem => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].name === item.index) return children[i]
      const indexItem = searchChildDeep(children[i].children)
      if (indexItem) return indexItem
    }
  }
  return searchChildDeep(item.children) || item
}

/* 处理使用模版页的虚拟菜单路由，转换为有效路由对象  */
function transformTplToRoute(item: App.RightItem) {
  const { vrid, template, name: routeName, path } = item as Required<App.RightItem>
  const { path: pathCreator, meta } = tplSwitchMap[template]
  if (!path) {
    return null
  }
  const route: RouteRecordItem = {
    path: path || pathCreator(routeName) || '',
    name: routeName,
    component: template
  }
  route.meta = { virtualPageId: vrid, ...getFnValue(meta, routeName, template) }
  return route
}

/* 处理菜单权限数据，生成菜单数据和路由权限点数据 */
function handleMenusInfo(rightsInfo: App.RightItem[]) {
  const result: {
    menu: App.SideMenuItem[]
    routeParentNames: RouteParentNames
    rightsMap: RightsMap
    routeActions: RouteActions
    virtualRoutes: RouteRecordItem[]
  } = { menu: [], routeParentNames: {}, rightsMap: {}, routeActions: [], virtualRoutes: [] }
  // 检查菜单项是否是最后一层
  const checkItemLastLvl = (item: App.RightItem) =>
    !item.children || !item.children.length || !!item.children[0].type

  // 用接口权限数据递归生成满足条件的菜单数据
  const getMenuItem = (
    menuArr: App.SideMenuItem[],
    item: App.RightItem,
    parentItem?: App.RightItem & { prevNames?: string[] }
  ) => {
    const { type, title, icon, permission, vrid, template, path = '' } = item
    let { name, children } = item
    const { prevNames = [] } = parentItem || {}
    const curPrevNames = prevNames.concat(name)
    /** 如果是功能点，则根据层级生成唯一功能点字符串 */
    if (type === 1) {
      const actionKey = `${prevNames.join('-')}||${permission}`
      result.routeActions.push(actionKey)
      return
    }

    // 检查当前菜单是否关联到下级菜单, 如果管理，使用管理的菜单项
    const workItem = checkoutIndexItem(item)
    if (workItem !== item) {
      name = workItem.name
      children = workItem.children
    }

    result.routeParentNames[name] = parentItem ? parentItem.name : ''
    result.rightsMap[name] = item
    // 检查当前层级是否是菜单最后一级
    const isLastLvl = checkItemLastLvl(item)
    const isTemplate = !!(template && vitrualRoutesMap[template])

    // 当菜单为最后一级时检查路由name是否有对应有效路由组件或模版组件, 无则跳过
    // if (isLastLvl && !accessRouteNames.includes(name) && !isTemplate) return

    // 创建菜单项
    const menuItem: App.SideMenuItem = { title, name, icon, path }

    if (children && children.length) {
      if (!isLastLvl) {
        menuItem.children = []
      }
      children.forEach((ci) =>
        getMenuItem(menuItem.children || [], ci, { ...item, prevNames: curPrevNames })
      )
    }
    // 将虚拟路由添加到virtualRoutes中
    if (isTemplate) {
      const vroute = transformTplToRoute(item)
      vroute && result.virtualRoutes.push(vroute)
    }
    menuArr.push(menuItem)
  }
  rightsInfo.forEach((item) => getMenuItem(result.menu, item))
  return result
}

/* 处理路由数据 */
function handleRoutes(
  routeActions: RouteActions,
  dynaRoutes: RouteRecordItem[],
  rightsMap: RightsMap,
  routeParentNames: RouteParentNames
) {
  // 先递归处理权限数据
  // 再处理路由部分
  const checkRelevance = (value: RouteRecordItem['rightRelevance']) => {
    const result: { relevanceName: string; access: true } | { access: false } = {
      access: false
    }
    if (typeof value === 'string') {
      Object.assign(result, { relevanceName: value, access: !!rightsMap[value] })
      return result
    } else if (Array.isArray(value) && value.length === 2 && typeof value[0] === 'string') {
      const [routeName, checkFn] = value
      // 如果设置了关联检查函数，将关联路由的功能点权限传递给函数，如果检测不通过
      const access = !!rightsMap[routeName]
      if (access && checkFn instanceof Function) {
        const access = checkFn(Array.isArray(routeActions) ? routeActions : [])
        return access ? { access, relevanceName: routeName } : { access }
      }
      Object.assign(result, { relevanceName: routeName, access })
      return result
    } else {
      return result
    }
  }
  // 获取路由的面包屑配置
  const getRouteBreadcrumb = (routeItem: RouteRecordItem) => {
    const { name, title } = routeItem
    const { title: rightLable } = rightsMap[name as string] || {}
    const breadcrumb: RouteMeta['breadcrumb'] = [
      { name: name as string, label: rightLable || title || '' }
    ]
    let parentName = routeParentNames[name as string]
    let parentRoute: App.RightItem | undefined = parentName ? rightsMap[parentName] : undefined
    while (parentRoute) {
      const { name, title: label } = parentRoute
      breadcrumb.unshift({ name, label })
      parentName = routeParentNames[name as string]
      parentRoute = rightsMap[parentName]
    }
    return breadcrumb
  }

  return dynaRoutes.filter((item) => {
    const { name, rightRelevance, meta } = item
    // 最终使用的有权限的路由name
    let rightRouteName = name as string
    // 需要添加到meta中的数据
    const attachMeta = {} as RouteMeta
    // 检测当前路由是否有权限或权限点
    let access = !!rightsMap[name as string]
    // 如果当前路由无定义但是设置了关联校验路由，则检测关联路由的权限
    if (!access && rightRelevance) {
      const result = checkRelevance(rightRelevance)
      if (!result.access) {
        return false
      }
      const { relevanceName } = result
      rightRouteName = relevanceName
      access = !!rightsMap[rightRouteName]
      // 如果关联路由有权限，将当前路由添加到routeParentNames对象中
      routeParentNames[name as string] = rightsMap[relevanceName].name
      attachMeta.activeTarget = relevanceName
    } else if (!access) {
      return false
    }
    delete item.rightRelevance
    // 如果没有特定面包屑，则自动生成
    if (!meta || !meta.breadcrumb) {
      attachMeta.breadcrumb = getRouteBreadcrumb(item)
    }
    // 如果存在功能点权限数组，或者当前路由存在父级菜单，则修改meta对象
    item.meta = {
      ...attachMeta,
      ...meta,
      rootMenuName: routeParentNames[rightRouteName]
    }
    return true
  })
}

const getDynamRoutesMap = (routes: RouteRecordItem[]) => {
  const result: Record<string, RouteRecordItem['component']> = {}
  const getRoutesMap = (routes: RouteRecordItem[]) => {
    routes.forEach((item) => {
      const { name, component, children } = item
      if (name && component) {
        result[name as string] = component
      }
      if (children?.length) {
        getRoutesMap(children)
      }
    })
  }
  getRoutesMap(routes)
  return result
}

/** 给路由数据添加路由组件 **/
export function routesAddComponents(routes: RouteRecordItem[]) {
  const dynaRoutes = adminDynaRoutes()
  // 合并模版路由和真实路有
  const dynaRoutesMap = {
    ...getDynamRoutesMap(dynaRoutes),
    ...vitrualRoutesMap
  }
  const routeNames: Record<string, true> = {}
  const addComponent = (item: RouteRecordItem) => {
    const { name, children, component } = item
    routeNames[name as string] = true
    const componentName = (typeof component === 'string' ? component : name) as string
    if (!(component instanceof Function) && name && dynaRoutesMap[componentName]) {
      item.component = dynaRoutesMap[componentName]
    }
    Array.isArray(children) && children.length && children.forEach(addComponent)
  }
  routes.forEach(addComponent)
  return routeNames
}

/** 整合路由数据并添加到router **/
export function addDynamicRouters(
  router: Router,
  routes: RouteRecordItem[] = [],
  oldRouteNames?: string[]
) {
  const adminRoutes = cloneDeep(routes) as RouteRecordRaw[]
  const newRouteNames = routesAddComponents(adminRoutes)
  // 删除旧的不存在的路由
  Array.isArray(oldRouteNames) &&
    oldRouteNames.forEach((name) => {
      if (!newRouteNames[name] && router.hasRoute(name)) {
        router.removeRoute(name)
      }
    })
  // 添加新路由
  adminRoutes.forEach((route) => {
    if (route.name && !router.hasRoute(route.name)) {
      router.addRoute('Admin', route)
    }
  })
  return adminRoutes
}

/** 将接口的菜单资源数据和虚拟菜单关系图转换成权限数据 */
export const resoucesToRights = (resources: Auth.RightItem[]): App.RightItem[] => {
  if (!Array.isArray(resources) || !resources.length) {
    return []
  }
  return resources.map((item) => {
    const { type, key, children, ...reset } = item
    const [name, permission] = type === 0 ? [key, undefined] : [undefined, key]
    return {
      ...reset,
      type,
      name,
      permission,
      children: resoucesToRights(children || [])
    } as App.RightItem
  })
}
