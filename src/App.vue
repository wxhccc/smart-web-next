<template>
  <a-config-provider :locale="locale" :auto-insert-space-in-button="false">
    <router-view></router-view>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watch } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { handleMenuInfo, addDynamicRouters, MenuRoutesInfo, resoucesToRights } from '@/router/router-handler'
import { Storage } from '@/utils'
import { useAppStore, useUserStore } from '@/store'
import { getVirtualTplMap } from '@/api/common'
import { getMenuRightsTree } from '@/api/auth'

import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export default defineComponent({
  name: 'App',
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const router = useRouter()
    const locale = zhCN
    const curRouteNames = ref<string[]>([])

    // 登出系统
    const loginOut = () => {
      router.push({ name: 'Login' })
      nextTick(() => {
        window.location.reload()
      })
    }
    // 获取左侧菜单数据并缓存
    const getSidebarInfo = async () => {
      const sidebarInfo: {
        sidebarJson: string
        virtualRoutes: string
        handledData: MenuRoutesInfo
      } = Storage.session('SIDEBARINFO') || {}
      let firstRoute = ''
      const { handledData, sidebarJson, virtualRoutes } = sidebarInfo
      // 先使用本地缓存的数据生成路由
      if (handledData) {
        firstRoute = handleSidebarData(handledData)
      }
      if (firstRoute) {
        appStore.sidebar.firstRoute = firstRoute
      }
      // 异步请求数据，然后根据是否变化决定是否需要更新缓存和视图
      const result = await Promise.all([
        getMenuRightsTree(),
        getVirtualTplMap()
      ])
      const [[err, resource], [, virtualTplMap]] = result
      // 获取资源失败需要退出登录，获取虚拟路由关系图失败则不生成虚拟路由
      if (err) {
        userStore.logout()
      }
      const newSidebarJson = JSON.stringify(resource)
      const vtmJson = JSON.stringify(virtualTplMap)
      if (newSidebarJson === sidebarJson && vtmJson === virtualRoutes) {
        return
      }
      sidebarInfo.sidebarJson = newSidebarJson
      sidebarInfo.virtualRoutes = vtmJson
      const rights = resoucesToRights(resource || [], virtualTplMap)
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
        const { name: childName } = children && children.length ? children[0] : ({} as App.SideMenuItem)
        return childName || name
      }
      return ''
    }

    /** 监听登陆状态的变化，控制更新菜单或退出登陆 */
    watch(() => userStore.isLogin, (newVal?: boolean) => {
      if (newVal) {
        window.location.reload()
      } else {
        loginOut()
      }
    })

    userStore.isLogin && getSidebarInfo()

    return { locale }
  }
})
</script>
