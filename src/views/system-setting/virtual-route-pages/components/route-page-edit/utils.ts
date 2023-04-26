import { ref, computed, Ref } from 'vue'
import { get, set } from 'lodash-es'
import { InputNumber, InputNumberProps } from 'ant-design-vue'
import { createFFIRulesProps, createInputFormItem, createRadioGroupFormItem, createFormFieldItem  } from '@wxhccc/ue-antd-vue'
import SelectOptionsField from '@/common/components/fields/select-options-field'
import { FieldItemsMap } from '@/common/template/type'
import type { AppStore } from '@/store'
import ArrayFieldSwitch from './components/array-field-switch.vue'

export type { FieldItemsMap }

export const getEditMainFormItems = () => {
  return [
    createInputFormItem('模版', 'component', undefined, { text: true }),
    createInputFormItem(createFFIRulesProps('路由Name'), 'routeName', '请输入路由Name, 会自动填充到菜单'),
    createInputFormItem({ class: 'page-name-item', label: '页面名称' } as any, 'name', '请输入页面名称，默认填充到菜单名')
  ]
}

export type CommonModuleType = 'fieldItem' | 'tableColumn'

export const commonModuleTypeMap: Record<string, CommonModuleType> = {
  searchFormItems: 'fieldItem',
  tableColumns: 'tableColumn'
}

export const createFieldItemEditFields = (component?: string, store?: AppStore) => {
  const result: FieldItemsMap = {
    props: [
      createInputFormItem(createFFIRulesProps('Name'), 'name'),
      createInputFormItem('Label', 'label', undefined, { prevNames: ['props'] })
    ]
  }
  const booleanOption = store?.getAppDictConfig('boolean')
  const prevNames = () => ({ prevNames: ['field'] })
  switch (component) {
    case 'ASelect':
      result.props.push(
        createRadioGroupFormItem('可清除', 'allowClear', booleanOption, undefined, prevNames()),
        createFormFieldItem(SelectOptionsField, '选项数据', 'data', undefined, {
          prevNames: ['field']
        })
      )
      break
    case 'ARangePicker':
      result.props.push(
        createInputFormItem('显示格式', 'format', 'YYYY-MM-DD HH:mm:ss', prevNames()),
        createInputFormItem('数据格式', 'valueFormat', 'YYYY-MM-DD HH:mm:ss', prevNames())
      )
      result.extra = [
        createFormFieldItem(
          ArrayFieldSwitch,
          '字段拆分',
          'fieldSwitch',
          { type: 'timeRange' },
          { prevNames: ['extraConfig'] }
        )
      ]
      break
  }
  if (component !== 'ARangePicker') {
    result.props.push(createInputFormItem('placeholder', 'placeholder', undefined, prevNames()))
  }
  return result
}

export const createTableColumnEditFields = (store?: AppStore) => {
  const booleanOption = store?.getAppDictConfig('boolean')
  const numberInputProps: Partial<InputNumberProps> = { min: 0, step: 1, precision: 0, placeholder: '请输入正整数' }
  return [
    createInputFormItem(createFFIRulesProps('数据字段'), 'dataIndex'),
    createInputFormItem('列名', 'title'),
    createInputFormItem('列宽', 'width', '可以为像素值, 百分比'),
    createFormFieldItem(InputNumber, '最小宽度', 'minWidth', numberInputProps),
    createFormFieldItem(InputNumber, '最大宽度', 'maxWidth', numberInputProps)
  ]
}

export const useTplModuleChose = <T = any>(config: Ref<T>) => {
  const choseItem = ref<App.StrOrNum[]>([])

  const choseItemData = computed({
    get: () => get(config.value, choseItem.value),
    set: (val) => set(config.value as any, choseItem.value, val)
  })

  const choseModuleKey = computed(() => choseItem.value[0])

  const onChoseItem = (paths: App.StrOrNum[]) => {
    choseItem.value = Array.isArray(paths) ? paths : []
  }
  return { choseItem, choseModuleKey, choseItemData, onChoseItem }
}
