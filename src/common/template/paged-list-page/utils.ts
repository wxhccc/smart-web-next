import { cloneDeep } from 'lodash-es'
import dayjs from 'dayjs'
import { Input, Select, RangePicker } from 'ant-design-vue'
import {
  createInputFormItem,
  createSelectFormItem,
  createDateFormItem,
  createFFIRulesProps,
  FormFieldItemProps
} from '@wxhccc/ue-antd-vue'
import { ParamsSwitchMaps } from '@wxhccc/es-util'
import { genUUID } from '@/utils'
import { PageConfig, SearchFieldItem } from './type'
import { TplModuleEditFieldsCreator } from '../type'
import { createTableColumn } from '@/common'
import { AppStore } from '@/store'

export const fieldsOptions = [
  { value: 'AInput', label: '输入框' },
  { value: 'ASelect', label: '下拉框' },
  { value: 'ARangePicker', label: '时间范围' }
]

export const formCompsMap: Record<string, any> = {
  'AInput': Input,
  'ASelect': Select,
  'ARangePicker': RangePicker
}

export const switchFieldItemStringComp = (item: SearchFieldItem, clone?: boolean) => {
  const handleItem = clone ? cloneDeep(item) : item
  const { field } = handleItem
  if (typeof field?.component === 'string' && formCompsMap[field?.component]) {
    field.component = formCompsMap[field.component]
  }
}

export const createNewSearchFieldItem = (key: string) => {
  let result = {} as FormFieldItemProps
  switch (key) {
    case 'AInput':
      result = createInputFormItem('', '', '请输入')
    case 'ASelect':
      result = createSelectFormItem('', '', [], '请选择')
    case 'ARangePicker':
      result = createDateFormItem('', '', 'dateTimeRange')
  }
  if (result.field) {
    result.field.component = key
  }
  return result
}

export const createNewColumnItem = () => {
  return { ...createTableColumn('', ''), id: genUUID() }
}

/** 将json格式的数据转换成实际的数据对象 */
export const configJsonToObject = (config: PageConfig) => {
  const clone = cloneDeep(config)
  const { searchFormItems = [], tableColumns, getPagedData } = clone
  let paramsSwitchMaps: undefined | ParamsSwitchMaps = undefined
  searchFormItems.forEach((item) => {
    const { field } = item
    if (field?.component === 'ARangePicker') {
      const { defaultValue = [] } = item.field?.showTime || {}
      field.showTime.defaultValue = defaultValue.map((item: string) => dayjs(item))
    }
    switchFieldItemStringComp(item)
    const { fieldSwitch } = item.extraConfig || {}
    if (fieldSwitch) {
      if (!paramsSwitchMaps) {
        paramsSwitchMaps = {} as ParamsSwitchMaps
      }
      const { type, timeRange } = fieldSwitch
      console.log(type, timeRange)
      paramsSwitchMaps[item.name as string] = type !== 'timeRange' ? type : (timeRange as NonNullable<typeof timeRange>)
    }
  })
  return { searchFormItems, tableColumns, getPagedData, paramsSwitchMaps }
}

export const createGetPagedDataFields: TplModuleEditFieldsCreator = (store) => {
  const methodOptions = store?.getAppDictConfig('requestMethods') as Common.SelectOption[]
  return [
    createInputFormItem(createFFIRulesProps('接口路径'), 'url', '填写无前缀的路径即可'),
    createSelectFormItem('请求方式', 'method', methodOptions)
  ]
}

export const moduleEditFieldsCreators = {
  getPagedData: createGetPagedDataFields
}
