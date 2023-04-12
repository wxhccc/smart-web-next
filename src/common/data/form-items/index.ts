import { Textarea } from 'ant-design-vue'
import {
  createDateFormItem,
  createFFIRulesProps,
  createFormFieldItem,
  createInputFormItem,
  CommonFieldProps,
  StrOrProps
} from '@wxhccc/ue-antd-vue'
import { idCardValidate, regexRuleCreator } from '@/utils/validate'
import { markRaw } from 'vue'

export * from './confirm-pwd'

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
  return createFormFieldItem(Textarea, label, name, { ...filedProps, ...size })
}

/** 日期选择表单项 */
export const dateFormItem = (name = 'date', required = true) => {
  return createDateFormItem(
    required ? createFFIRulesProps('日期', required) : '日期',
    name,
    'date'
  )
}

/** 时间范围选择表单项 */
export const daterangeFormItem = (label ='时间', name = 'daterange', required = false) => {
  return createDateFormItem(
    required ? createFFIRulesProps(label, required) : label,
    name,
    'dateTimeRange'
  )
}

/** 电话号码表单项（中国大陆） */
export const telphoneFormItem = (name = 'telphone', required = true) => {
  return createInputFormItem(
    createFFIRulesProps('手机号', required, [regexRuleCreator('telphone')]),
    name,
    { placeholder: '请输入手机号', maxlength: 11 }
  )
}

/** 身份证表单项 */
export const idCardFormItem = (name: string, required = true) => {
  return createInputFormItem(
    createFFIRulesProps('身份证号码', required, [
      regexRuleCreator('idCard', '身份证号码格式有误', 'change'),
      { validator: idCardValidate, message: '身份证号码不合法', trigger: 'change' }
    ]),
    name,
    { placeholder: '请输入身份证号码', maxlength: 18 }
  )
}