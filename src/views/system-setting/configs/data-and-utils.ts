import {
  createInputFormItem,
  createSelectFormItem,
  createFFIRulesProps,
  createFormFieldItem
} from '@wxhccc/ue-antd-vue'
import ImageInput from '@/common/components/fields/image-input.vue'
import ObjectArrayField, { ObjectArrayColumn } from '@/components/object-array-field'
import { useAppStore } from '@/store'

export function baseModuleFieldItems() {
  return [createFormFieldItem(ImageInput, { label: '默认用户头像' }, 'defaultAvatar')]
}
const valueLabelConfig = (isNumber: boolean): ObjectArrayColumn[] => [
  { name: 'value', label: 'Value', isNumber, colProps: { span: 10 } },
  { name: 'label', label: 'Label', colProps: { span: 14 } }
]

export function dictItemFieldItems(isEdit: boolean, isNumber: boolean) {
  const store = useAppStore()
  const { dataType, commonState } = store.appConfig
  return [
    createInputFormItem(
      createFFIRulesProps('字段', true, [
        { pattern: /^\w+$/, message: '字段必须为合法', trigger: 'blur' }
      ]),
      'key',
      '请填写字段'
    ),
    createInputFormItem(createFFIRulesProps('标题', true), 'describe', '请填写标题'),
    createSelectFormItem('选项值类型', 'valueType', dataType as Common.SelectOption[], {
      disabled: isEdit
    }),
    createSelectFormItem('状态', 'state', commonState as Common.SelectOption[]),
    createFormFieldItem(ObjectArrayField, createFFIRulesProps('选项列表', '请添加选项'), 'value', {
      props: { columns: valueLabelConfig(isNumber), prevNames: ['value'] }
    })
  ]
}

export interface FormParams {
  base: Record<string, App.StrOrNum>,
  dict: SystemSettings.Configs.DictParamsItem[]
}
