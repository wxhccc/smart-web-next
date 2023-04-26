declare namespace Auth {
  /** 登陆参数 */
  interface LoginParams {
    account: string
    password: string
    captcha?: string
  }
  /** 登陆后的返回参数 */
  interface AccessInfo extends User.AccountInfo {
    token: string
    refreshToken: string
  }

  /** 用户菜单项, 处理之前的接口数据 */
  interface RightItem {
    id: number
    parentId: number
    /** 图标 */
    icon: string
    /** 菜单标题 */
    title: string
    /** 权限项类型，0=菜单，1=功能点 */
    type: number
    /** 菜单页面的路由name或页面权限点的key, 为name时需要全局唯一 */
    key: string
    /** 虚拟页面项配置id */
    vrid: number
    /** 虚拟页面使用的模板组件名称 */
    template: string
    children?: RightItem[]
  }
}
