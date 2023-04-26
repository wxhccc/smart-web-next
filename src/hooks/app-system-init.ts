import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getMenuRightsTree } from '@/api/auth'
import { getAppBaseConfig } from '@/api/common'
import { MenuRoutesInfo, addDynamicRouters, handleMenuInfo, resoucesToRights } from '@/router/router-handler'
import { useAppStore, useUserStore } from '@/store'
import { Storage, smartfetch } from '@/utils'

/** 处理动态路由和主菜单相关逻辑 */
export const useInitSidebarInfo = () => {

  const router = useRouter()

  const appStore = useAppStore()
  const userStore = useUserStore()

  const curRouteNames = ref<string[]>([])

  // 获取左侧菜单数据并缓存
  const getSidebarInfo = async () => {
    const sidebarInfo: {
      sidebarJson: string
      handledData: MenuRoutesInfo
    } = Storage.session('SIDEBARINFO') || {}
    let firstRoute = ''
    const { handledData, sidebarJson } = sidebarInfo
    // 先使用本地缓存的数据生成路由
    if (handledData) {
      firstRoute = handleSidebarData(handledData)
    }
    if (firstRoute) {
      appStore.sidebar.firstRoute = firstRoute
    }
    // 异步请求数据，然后根据是否变化决定是否需要更新缓存和视图
    const [err, resource] = await getMenuRightsTree()
    // 获取资源失败需要退出登录，获取虚拟路由关系图失败则不生成虚拟路由
    if (err) {
      userStore.logout()
    }
    const newSidebarJson = JSON.stringify(resource)
    if (newSidebarJson === sidebarJson) {
      return
    }
    sidebarInfo.sidebarJson = newSidebarJson
    const rights = resoucesToRights(resource || [])
    sidebarInfo.handledData = handleMenuInfo(rights)
    const newFirstRoute = handleSidebarData(sidebarInfo.handledData)
    Storage.session('SIDEBARINFO', sidebarInfo)
    if (newFirstRoute !== firstRoute) {
      appStore.sidebar.firstRoute = firstRoute
    }
  }
  // 处理菜单数据和添加动态权限路由
  const handleSidebarData = (data: MenuRoutesInfo) => {
    const { menu, dynaRoutes, actions } = data
    addDynamicRouters(router, dynaRoutes, curRouteNames.value)
    curRouteNames.value = dynaRoutes.map((item) => item.name as string)
    appStore.setSidebarMenu(menu)
    userStore.setRouteActions(actions)
    const [first] = menu
    if (first) {
      const { children, name } = first
      const { name: childName } =
        children && children.length ? children[0] : ({} as App.SideMenuItem)
      return childName || name
    }
    return ''
  }

  getSidebarInfo()
}

/** 处理系统基础配置获取逻辑 */
export const useGetAppConfigs = () => {
  const store = useAppStore()

  const fetchAppConfigs = async () => {
    const [, data] = await smartfetch<SystemSettings.Configs.PublicItem[]>(getAppBaseConfig())
    if (Array.isArray(data) && data.length) {
      const dictConfigs: Record<string, App.Option[]> = {}
      const configs: App.AnyObject = {}
      data.forEach(item => {
        const { type, key, value } = item
        if (type === 0) {
          configs[key] = value
        } else if (type === 1) {
          dictConfigs[key] = value
        }
      })
      Object.keys(dictConfigs).length && store.setAppDictConfig(dictConfigs)
      store.appDynamicConfigs = configs
    }
  }

  fetchAppConfigs()
}