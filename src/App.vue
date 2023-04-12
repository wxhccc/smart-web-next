<template>
  <a-config-provider :locale="locale" :auto-insert-space-in-button="false">
    <router-view></router-view>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, nextTick, watch } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { useUserStore } from '@/store'
import { useInitSidebarInfo, useGetAppConfigs } from './hooks/app-system-init'

import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export default defineComponent({
  name: 'App',
  setup() {
    const userStore = useUserStore()
    const router = useRouter()
    const locale = zhCN

    if (userStore.isLogin) {
      useInitSidebarInfo()
      useGetAppConfigs()
    }

    // 登出系统
    const loginOut = () => {
      router.push({ name: 'Login' })
      nextTick(() => {
        window.location.reload()
      })
    }

    /** 监听登陆状态的变化，控制更新菜单或退出登陆 */
    watch(() => userStore.isLogin, (newVal?: boolean) => {
      if (newVal) {
        window.location.reload()
      } else {
        loginOut()
      }
    })

    return { locale }
  }
})
</script>
