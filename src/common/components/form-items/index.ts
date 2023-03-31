import { createInputFormItem, createFFIRulesProps } from '@wxhccc/ue-antd-vue'
import { regexRuleCreator } from '@/utils/validate'

export const createTelphoneFormItem = (name: string, required = true) => {
  return createInputFormItem(
    createFFIRulesProps('手机号', required, [regexRuleCreator('telphone')]),
    name,
    { placeholder: '请输入手机号', maxlength: 11 }
  )
}
