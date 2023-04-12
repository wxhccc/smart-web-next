import { defineStore } from 'pinia'
import { Storage, configToMap } from '@/utils'
import { getAppDictConfigs, AppDictConfigs, AppRemoteConfigs } from '@/config'
import { WsInstance } from '@/utils/websocket'

const appDictConfig: AppDictConfigs = Storage.session('APP_DICT_CONFIGS') || getAppDictConfigs() || {}

export type { AppDictConfigs }

export interface AppState {
  /** 左侧菜单信息 */
  sidebar: {
    /** 是否展开 */
    opened: boolean
    /** 上一次展开状态，用于处理自动折叠逻辑时的恢复 */
    lastOpenState: boolean
    /** 菜单数据数组 */
    menuItems: any[]
    /** 第一个有权限的路由name */
    firstRoute: string
    /** 菜单黑白主题 */
    theme: 'dark' | 'light'
  }
  /** 列表跳转到详情页需要记录的列表页路由name，返回时进行判断 */
  rememberRoute: string
  /** 是否处于记录状态 */
  remember: boolean
  /** 系统字典配置对象，可以本地配置，也可以用接口获取的数据进行覆盖, 使用getters.getAppConfig(xxx)获取项 */
  appDictConfig: AppDictConfigs
  /** 系统字典项和其对应的value-label对象，用于value值转换（使用getters.switchFilter(xxx)） */
  appDictConfigsMap: Record<string, Record<string, string | number>>
  /** 自定义页面内标题，可用于新增页面和编辑页面的区分 */
  customPageTitle: string
  /** 全局websocket实例对象 */
  globalWs: undefined | WsInstance
  /** ali oss 临时token */
  ossAccessToken: App.AnyObject
  appDynamicConfigs: AppRemoteConfigs
}


const sidebarOpend = typeof Storage.get('SIDEBARSTATUS') === 'boolean' ? Storage.get('SIDEBARSTATUS') : true

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    // 左侧主菜单数据
    sidebar: {
      // 菜单是否展开
      opened: sidebarOpend,
      // 上一次菜单栏状态，用于控制菜单响应式改变时的还原
      lastOpenState: sidebarOpend,
      // 菜单数据数组
      menuItems: [],
      // 第一个有权限的菜单路由name
      firstRoute: '',
      theme: 'dark'
    },
    // ListPageTpl记录页面路由name
    rememberRoute: '',
    // 当前页面是否处于表单记录状态
    remember: false,
    // 系统配置数据列表map
    appDictConfig,
    // 系统配置数据key-value对照map
    appDictConfigsMap: configToMap(appDictConfig),
    customPageTitle: '',
    globalWs: undefined,
    ossAccessToken: Storage.get('OSSACCESSTOKEN') || {},
    appDynamicConfigs: {}
  }),
  getters: {
    getAppDictConfig: (state) => (key: keyof AppDictConfigs) => state.appDictConfig[key] || [],
    switchFilter: (state) => (key: keyof AppDictConfigs) => (value: App.StrOrNum) =>
      state.appDictConfigsMap[key] ? state.appDictConfigsMap[key][value] : ''
  },
  actions: {
    setAppDictConfig (config: Partial<AppDictConfigs> = {}) {
      this.appDictConfig = { ...this.appDictConfig, ...config }
      this.appDictConfigsMap = configToMap(this.appDictConfig)
    },
    toggleSidebar (payload: { value?: boolean; breakpoint?: boolean } = {}) {
      const { value, breakpoint } = payload
      this.sidebar.opened = value !== undefined ? value : !this.sidebar.opened
      if (!breakpoint) {
        this.sidebar.lastOpenState = this.sidebar.opened
      }
      Storage.session('SIDEBARSTATUS', this.sidebar.opened)
    },
    setSidebarMenu (data: App.SideMenuItem[]) {
      this.sidebar.menuItems = Array.isArray(data) ? data : []
    },
    setOssAccessToken (ossToken: App.AnyObject) {
      if (!ossToken || !ossToken.expireTime) {
        return
      }
      this.ossAccessToken = ossToken
      Storage.session('OBSACCESSTOKEN', ossToken)
    },
  }
})

export type AppStore = ReturnType<typeof useAppStore>