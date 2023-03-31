import { computed, defineComponent, h, mergeProps } from 'vue'
import { FormFields, createInputFormItem, FormFieldItemProps, vueTypeProp } from '@wxhccc/ue-antd-vue'
import { mergeObj } from '@/utils'
import { RuleObject } from 'ant-design-vue/lib/form/interface'

export function verifyCodeRules(required?: boolean, message?: string): App.AnyObject[] {
  return required ? [{ required: true, message, trigger: 'blur' }] : []
}
const passWordField = (name: string, required?: boolean) =>
  createInputFormItem(
    {
      label: '密码',
      rules: verifyCodeRules(required, '请输入密码')
    },
    name,
    {
      placeholder: '请输入密码',
      type: 'password',
      autoComplete: 'new-password'
    }
  )

const confirmPwdField = (name: string, required: boolean, pwdName: string, formData: App.AnyObject) =>
  createInputFormItem(
    {
      label: '确认密码',
      rules: verifyCodeRules(required, '请输入确认密码').concat([
        {
          async validator(rule: RuleObject, value: string) {
            if (formData[pwdName] !== value) {
              return Promise.reject('两次输入密码不一致')
            }
            return Promise.resolve()
          },
          message: '两次输入密码不一致',
          trigger: 'blur'
        }
      ])
    },
    name,
    {
      placeholder: '再次确认密码',
      type: 'password',
      autoComplete: 'new-password'
    }
  )
interface NameKeys {
  password?: string
  confirmPwd?: string
}
interface CustomItemsProps {
  password?: FormFieldItemProps
  confirmPwd?: FormFieldItemProps
}
/* 默认数据部分，可单独导出 */
export function passwordsFormItem(
  nameKeys: NameKeys = {},
  required = true,
  formData: App.AnyObject = {},
  customItemsProps: CustomItemsProps = {}
) {
  const { password, confirmPwd } = { password: 'password', confirmPwd: 'confirmPwd', ...nameKeys }
  const pwdField = mergeObj(passWordField(password, required), customItemsProps.password)
  const configPwdField = mergeObj(confirmPwdField(confirmPwd, required, password, formData), customItemsProps.password)
  return [pwdField, configPwdField]
}

export default defineComponent({
  name: 'FormItemPasswords',
  props: {
    required: Boolean,
    modelValue: vueTypeProp<App.AnyObject>(Object),
    nameKeys: vueTypeProp<NameKeys>(Object),
    customItemsProps: vueTypeProp<CustomItemsProps>(Object)
  },
  setup(props, { attrs }) {
    const items = computed(() =>
      passwordsFormItem(props.nameKeys, props.required, props.modelValue, props.customItemsProps)
    )

    return () => h(FormFields, mergeProps(attrs, { modelValue: props.modelValue, items: items.value }))
  }
})
