import { Method } from '@wxhccc/smartfetch'
import { PagedTbColumnProps, FormFieldItemProps } from '@wxhccc/ue-antd-vue'

export type { FormFieldItemProps }

/** 表单域额外信息配置 */
export interface FieldItemExtraConfig {
  /** 字段转换逻辑，字段在提交前进行的转换，使用searchFormDateSwitch转换 */
  fieldSwitch?: VirtualRoutes.FieldSwitchConfig
}

/** 搜索条件表单项 */
export type SearchFieldItem = VirtualRoutes.TplModuleItem<FormFieldItemProps, FieldItemExtraConfig>

/** 表格列配置项 */
export type TableColumnItem = VirtualRoutes.TplModuleItem<PagedTbColumnProps>

/** 数据请求模块 */
export interface GetPagedData {
  /** 请求方式，默认get */
  method?: Method
  /** 接口路径，不需要前缀 */
  url: string
}

/** 通用分页列表页配置数据对象 */
export interface PageConfig {
  searchFormItems?: SearchFieldItem[]
  getPagedData: GetPagedData
  tableColumns: PagedTbColumnProps[]
  tableActionColumn?: any
}
