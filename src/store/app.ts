import { defineStore } from 'pinia'
import { Storage, configToMap } from '@/utils'
import getAppConfig from '@/config/app-dict'
import { WsInstance } from '@/utils/websocket'

const appConfig: ReturnType<typeof getAppConfig> = Storage.session('APPCONFIG') || getAppConfig() || {}
export type AppConfig = typeof appConfig

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
  appConfig: AppConfig
  /** 系统字典项和其对应的value-label对象，用于value值转换（使用getters.switchFilter(xxx)） */
  appConfigDictMap: Record<string, Record<string, string | number>>
  /** 自定义页面内标题，可用于新增页面和编辑页面的区分 */
  customPageTitle: string
  /** 全局websocket实例对象 */
  globalWs: undefined | WsInstance
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
    appConfig,
    // 系统配置数据key-value对照map
    appConfigDictMap: configToMap(appConfig),
    customPageTitle: '',
    globalWs: undefined
  }),
  getters: {
    getAppConfig: (state) => (key: keyof AppConfig) => state.appConfig[key] || [],
    switchFilter: (state) => (key: keyof AppConfig) => (value: App.StrOrNum) =>
      state.appConfigDictMap[key] ? state.appConfigDictMap[key][value] : ''
  },
  actions: {
    setAppConfig (config: Partial<AppConfig> = {}) {
      this.appConfig = { ...this.appConfig, ...config }
      this.appConfigDictMap = configToMap(appConfig)
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
    }
  }
})

export type AppStore = ReturnType<typeof useAppStore>