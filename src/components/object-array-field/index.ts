import { CommonFieldProps } from '@wxhccc/ue-antd-vue'
import { ColProps } from 'ant-design-vue/lib/grid/Col'
import { RowProps } from 'ant-design-vue/lib/grid/Row'

export interface ObjectArrayColumn {
  /** 当前列的a-col组件的props属性 */
  colProps?: ColProps
  name: string
  label: string
  required?: boolean
  placeholder?: string
  isNumber?: boolean
  component?: CommonFieldProps['component']
}

export type ValueItem = Record<string, App.StrOrNum> & { static?: boolean }

export interface ObjectArrayFieldProps {
  rowProps: RowProps
  modelValue: ValueItem[]
  staticValue: ValueItem[]
  columns: ObjectArrayColumn[]
  labelTop?: boolean
  prevNames?: App.StrOrNum[]
  /** 删除时是否需要确认 */
  deleteConfirm?: boolean | (() => Promise<void>)
  /** 是否通过按添加新行, 如果是字符串则设置为按钮内文字 */
  addButton?: boolean | string
  /** 是否显示边框 */
  bordered?: boolean
  /** 是否需要再数据项中添加索引作为排序 */
  orderKey?: boolean | string
  /** 是否折叠选项，如果折叠，默认显示多少行 */
  collapseRow?: boolean | number
}

export { default as default } from './index.vue'
