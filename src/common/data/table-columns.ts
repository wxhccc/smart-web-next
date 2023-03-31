import { h } from 'vue'
import { Switch } from 'ant-design-vue'
import { isFunction } from 'lodash-es'
import { checkoutBy } from '@wxhccc/es-util'
import StatusDot from '@/components/status-dot'
import { createTableColumn, tableColumnFormatter } from '../utils'

export const commonTbColumns = () => ({
  index: createTableColumn('序号', '', { width: '80px' }),
  idcard: createTableColumn('身份证号', 'idcard'),
  mobile: createTableColumn('手机号', 'mobile'),
  money: createTableColumn<App.AnyObject>('金额', 'money', tableColumnFormatter('money')),
  action: { label: '操作', action: [] }
})

export function checkoutTableColumns(keys: string[] | Record<string, any>, originData?: Record<string, any>) {
  const tbColumns = originData || commonTbColumns()
  return checkoutBy(tbColumns, keys)
}

export type SwitchHandler<D> = (record: D, switchLock: Common.LockSwitch) => Promise<void>

/**
 * 创建需要用Switch作为切换按钮的表格列
 * @param switchHandler 启用/禁用切换处理函数
 * @param stateKey 状态值的dataIndex
 * @param isCheckd 自定义状态判断
 * @returns PagedTbColumnProps
 */
export function createEnableSwitchColumn<D>(
  switchHandler: SwitchHandler<D>,
  stateKey = 'enable',
  isCheckd?: (stateValue: App.StrOrNum, record: D) => boolean
) {
  const wrapSwitchHandler = (record: D & { enableSwitching?: boolean }) => {
    const switchLock = (bool: boolean) => (record.enableSwitching = bool)
    switchHandler(record, switchLock)
  }
  return createTableColumn<any>('启用状态', stateKey, {
    customRender: ({ record }) => {
      const checked = isFunction(isCheckd) ? isCheckd(record[stateKey], record) : !!record[stateKey]
      return h(Switch, {
        loading: record.enableSwitching,
        checked,
        onChange: () => wrapSwitchHandler(record)
      })
    }
  })
}

/**
 * 创建需要添加状态颜色标记的表格列
 * @param statusFilter 状态值转换函数
 * @param statusColors 状态值和对应颜色的对象。eg: { 1: 'success', 0: 'error' }
 * @param statusKey 状态值对应的dataIndex
 * @returns PagedTbColumnProps
 */
export function createDotStatusRender(statusFilter: Common.ConfigFilter, statusColors: Record<string, string>) {
  return {
    customRender: ({ text }) => {
      return h(
        StatusDot,
        {
          color: statusColors[text]
        },
        { default: () => statusFilter(text) }
      )
    }
  } as ReturnType<typeof createTableColumn>
}
