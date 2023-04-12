import { h, VNodeProps } from 'vue'
import { ActionBtns, ActionBtnItem, PagedTbColumnProps } from '@wxhccc/ue-antd-vue'
import { isFunction } from 'lodash-es'

export const tableActionBtn = (options: ActionBtnItem): ActionBtnItem => ({
  props: { size: 'small' },
  btype: 'link',
  ...options
})

export function viewBtn(hander: ActionBtnItem['click'], props: ActionBtnItem = {}): ActionBtnItem {
  return tableActionBtn({
    text: '查看',
    key: 'view',
    click: hander,
    ...props
  })
}
export function editBtn(hander: ActionBtnItem['click'], props: ActionBtnItem = {}): ActionBtnItem {
  return tableActionBtn({
    text: '编辑',
    key: 'edit',
    btype: 'link',
    click: hander,
    ...props
  })
}

export interface StateBtnOptions<D> {
  /** 判断按钮可用状态 */
  isChecked?: (val: App.StrOrNum | undefined, record: D) => boolean
  /** 可用/禁用提示文案 */
  stateTexts?: [string, string]
  /** 提示信息 */
  confirmMessage?: boolean | ((access: boolean, keyWord: string) => string)
  /** 按钮的额外属性 */
  props?: ActionBtnItem
}
/** 状态切换按钮 */
export function stateBtn<D extends App.AnyObject = App.AnyObject>(
  hander: ActionBtnItem['click'],
  stateKey = 'state',
  options?: StateBtnOptions<D>
): ActionBtnItem {
  const { isChecked, stateTexts, confirmMessage, props } = {
    stateTexts: ['启用', '禁用'],
    ...options
  }
  const [enable, disabled] = stateTexts
  // 检查数据是否是可用
  const checkIsAccess = (record: D) => isFunction(isChecked) ? isChecked(record[stateKey], record) : !!record[stateKey]
    
  const config: ActionBtnItem = tableActionBtn({
    text: (record): string => (!checkIsAccess(record) ? enable : disabled),
    key: 'state',
    loadingKey: 'stateSetting',
    click: hander,
    ...props
  })
  if (confirmMessage !== false) {
    Object.assign(config, {
      isConfirm: true,
      confirmMsg: (record: D) => {
        const isAccess = checkIsAccess(record)
        const keyWord = isAccess ? disabled : enable
          
        return isFunction(confirmMessage)
        ? confirmMessage(isAccess, keyWord)
        : `${keyWord}后，该条数据将${isAccess ? '不可使用' : '恢复使用'}，确定${keyWord}吗?`
      }
    })
  }
  return config
}

export function deleteBtn(
  deleteHandler: ActionBtnItem['click'],
  content = '确定要删除这条记录吗?',
  props?: ActionBtnItem
): ActionBtnItem {
  return {
    text: '删除',
    isConfirm: true,
    btype: 'link',
    key: 'delete',
    loadingKey: 'deleteing',
    confirmMsg: content,
    props: {
      size: 'small',
      danger: true
    },
    click: isFunction(deleteHandler) ? deleteHandler : () => undefined,
    ...props
  }
}

/**
 * 生成表格按钮操作栏配置对象
 * @param btns 按钮配置数组
 * @param title 表头标题
 * @param others 其他属性
 * @returns ColumnProps
 */
export function createTableActionsColumn<D extends App.AnyObject = App.AnyObject>(
  btns: ActionBtnItem[],
  others?: PagedTbColumnProps,
  title = '操作'
) {
  const customRender = (row: D) => h(ActionBtns, { btns, data: row } as VNodeProps)
  return {
    title,
    customRender,
    className: 'action-column',
    minWidth: 160,
    ...others
  } as PagedTbColumnProps
}
