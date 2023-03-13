/** 虚拟路有相关 */
declare namespace VirtualRoutes {
  type TemplateName = 'PagedTablePage'

  interface RouteTplInfo {
    /** 页面模版组件名称 */
    component: TemplateName
    /** 页面地址路径 */
    path?: string
  }
  /** 保存的路由和对应模版的关系map */
  type RouteTplMap = Record<string, string | RouteTplInfo>

  /** 路由页面数据记录 */
  interface DataRecord extends RouteTplInfo, Common.RecordBase {
    id: number
    /** 路由name */
    routeName: string
    /** 当前配置 */
    config: any
  }

  type AddParams = App.PartailSome<Pick<DataRecord, 'component' | 'path' | 'routeName' | 'config'>, 'config'>

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
