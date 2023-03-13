declare namespace App {
  /** 处理之后的左侧菜单权限数据 */
  interface RightItem {
    id: number
    parentId: number
    /** 菜单项标题 */
    title: string
    /** 页面的路由name，全局唯一 */
    name: string
    /** 页面地址路径，仅对虚拟路由页面有效 */
    path?: string
    /** 权限点标识 */
    permission?: string
    /** 子菜单项 */
    children: Item[]
    /** 权限点类型，0=菜单，1=功能点 */
    type: number
    /** 关联到子级菜单的name */
    index?: string
    /** 需要使用的模版页组件的模版名称 */
    template?: string
    icon?: string
  }

  /** 左侧主菜单的显示数据 */
  interface SideMenuItem {
    title: string
    name: string
    path?: string
    icon?: string
    children?: SideMenuItem[]
  }

  interface ApiRes<D = any> {
    code: number
    message: string
    error?: string
    data?: D
  }
}
