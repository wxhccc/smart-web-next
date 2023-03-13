import { VNode } from 'vue'
import { ColumnProps } from 'ant-design-vue/lib/table'

/** Tabel自定义渲染程序的参数 */
export interface TableCellRow<D extends App.AnyObject = App.AnyObject> {
  value: any
  text: any
  column: ColumnProps<D>
  record: D
  index: number
}

export type TableCellRender = <D extends App.AnyObject = App.AnyObject>(row: TableCellRow<D>) => string | VNode
