/** 通用模块 */
declare namespace Common {
  /** 下拉选项类型 */
  interface SelectOption extends App.Option {
    value: number | string
    [key: string]: any
  }

  /** 模态弹框组件通用属性 */
  interface ModalProps<T> {
    visible: boolean
    title?: string
    model?: T
    onClose?: (bool: boolean) => void
  }

  interface SearchProps<T> {
    onSearch: (value: T) => void
    onAdd: () => void
  }

  interface TagOption {
    label: string
    value: number | string
    color: string
  }
  /* 分页接口数据格式 */
  interface PagedData<R extends Record<string, any>> {
    records: R[]
    /** 总记录条数，用于页码分页 */
    total?: number
    /** 是否有下一页，用于下拉分页 */
    hasNext?: boolean
    [key: string]: unknown
  }

  /** 基础数据对象 */
  interface RecordBase {
    id: App.StrOrNum
    /** 创建人 */
    createdBy?: string
    /** 创建时间 */
    createdTime?: string
    /** 更新人 */
    updatedBy?: string
    /** 更新时间 */
    updatedTime?: string
  }

  interface DictItem {
    id: App.StrOrNum
    name: string
  }

  interface Size {
    width: number
    height: number
  }

  /** 使用appConfigs字典表做转换的函数，一般由store.getters.switchFilter返回 */
  type ConfigFilter = (val: App.StrOrNum) => App.StrOrNum
  /** 切换锁定状态的函数 */
  type LockSwitch = (bool: boolean) => void

  /** 记录操作者信息 */
  interface OperatorInfo {
    id: number
    account: string
  }
}
