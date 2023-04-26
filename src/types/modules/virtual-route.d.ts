/** 虚拟路有相关 */
declare namespace VirtualRoutes {
  type TemplateName = 'PagedTablePage'

  interface Base {
    /** 页面模版组件名称 */
    template: TemplateName
    /** 页面名称 */
    name: string
    /** 路由name */
    routeName: string
    /** 当前配置 */
    configs: any
  }
  /** 保存的路由和对应模版的关系map */
  type RouteTplMap = Record<string, string | RouteTplInfo>

  /** 路由页面数据记录 */
  type Item = Omit<Base, 'configs'> & Common.RecordBase

  type Detail = Base & Common.RecordBase

  type AddParams = Base

  interface EditParams extends AddParams {
    id: number
  }

  interface FieldSwitchConfig {
    type: 'timeRange' | 'join' | 'pop'
    timeRange?: [string, string] | [string, string, string]
  }
  /** 模版模块配置项统一封装类型 */
  type TplModuleItem<T extends App.AnyObject, E = any> = T & {
    id?: string
    extraConfig?: E
  }
}
