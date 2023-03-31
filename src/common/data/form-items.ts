import { checkoutBy } from '@wxhccc/es-util'
import {
  createDateFormItem,
  createFFIRulesProps,
  createFormFieldItem,
  createInputFormItem,
  CommonFieldProps,
  StrOrProps
} from '@wxhccc/ue-antd-vue'

/** xx名称 */
export const nameFormItem = (label = '名称', required?: boolean, name = 'name', disabled?: boolean) => {
  return createInputFormItem(createFFIRulesProps(label, required), name, { placeholder: `请输入${label}`, disabled })
}

/** xx描述 */
export const descriptionFormItem = (
  label = '描述',
  name = 'description',
  phOrFieldProps?: StrOrProps<Partial<CommonFieldProps>>,
  rows?: number | App.AnyObject
) => {
  const size = typeof rows === 'number' ? { rows } : rows || {}
  const filedProps = !phOrFieldProps
    ? { placeholder: `请输入${label}` }
    : typeof phOrFieldProps === 'string'
    ? { placeholder: phOrFieldProps }
    : phOrFieldProps
  return createFormFieldItem('ATextarea', label, name, { ...filedProps, ...size })
}

export const commonFormItems = () => ({
  mobile: createInputFormItem('手机号', 'mobile', '客户手机号'),
  idcard: createInputFormItem('身份证号', 'idcard', '客户身份证号'),
  date: createDateFormItem('日期', 'date', 'date'),
  time: createDateFormItem('时间', 'daterange', 'dateTimeRange')
})

export function checkoutFormItems(keys: string[] | Record<string, any>, originData?: Record<string, any>) {
  const formItems = originData || commonFormItems()
  return checkoutBy(formItems, keys)
}
