import { dateFormat, PagedTbColumnProps, TableCellRow } from '@wxhccc/ue-antd-vue'
import { commaNum } from '@/utils/formatter'


export const tableCustomRenders = {
  money: <D extends TableCellRow>({ text }: D) => text && commaNum(text, '0,0.00'),
  date: <D extends TableCellRow>({ text }: D) => text && dateFormat(text),
  state: <D extends TableCellRow>({ text }: D) => (!!text ? '启用' : '禁用')
}

export const tableColumnFormatter = (key: keyof typeof tableCustomRenders) => {
  return { customRender: tableCustomRenders[key] } as PagedTbColumnProps
}

/**
 * 生成表格表头配置对象
 * @param title 表格头标题
 * @param dataIndex 表格列对应的数据项中的字段
 * @param others 其他属性
 * @returns PagedTbColumnProps
 */
export function createTableColumn<T = any>(
  title: string,
  dataIndex?: App.StrOrNum,
  others?: PagedTbColumnProps<T>
) {
  return { title, dataIndex, ...others } as PagedTbColumnProps<T>
}

/** 生成文本数组字段表头配置对象 */
export const createArrayTextTableColumn = <T = any>(
  title: string,
  dataIndex?: App.StrOrNum,
  separator = '、',
  others?: PagedTbColumnProps<T>
) => {
  return {
    title,
    dataIndex,
    customRender: ({ text }) =>
      Array.isArray(text) ? text.join(separator) : '',
    ...others
  } as PagedTbColumnProps<T>
}

/** 生成时间格式的表格表头配置对象, 扩展自createTableColumn */
export function createDateTableColumn(
  title: string,
  dataIndex?: App.StrOrNum,
  format?: string,
  others?: PagedTbColumnProps
) {
  const result: PagedTbColumnProps = { title, dataIndex, minWidth: 160, ...others }
  if (format) {
    result.customRender = ({ text }) => text && dateFormat(text, format)
  }
  return result
}
