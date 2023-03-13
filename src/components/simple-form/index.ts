import { AnyFunction, AnyObject, FormBtnsProps, FormFieldsItem, StrOrNum } from '@wxhccc/ue-antd-vue'
import { FormProps } from 'ant-design-vue/lib/form'
import { ModalProps } from 'ant-design-vue/lib/modal'
export { default as default } from './index.vue'

export type SkipRouteOrFn = string | AnyFunction<void>

export interface SimpleFormProps extends FormProps {
  /** api目录里接口文件返回的接口函数 */
  request?: AnyFunction<Promise<any>>
  /** 表单项配置对象数组，可传入函数来动态控制表单项 */
  fieldItems: FormFieldsItem[] | AnyFunction<FormFieldsItem[]>
  /** 是否使用inline form */
  inline?: boolean
  /** 传递给Form组件的props对象，主要用于防止属性冲突 */
  props?: FormProps
  /** 是否使用Modal弹框 */
  isModal?: boolean
  /** 使用modal模式时传递给Modal组件的props对象 */
  modalProps?: Partial<ModalProps>
  /** 提交按钮组的props对象 */
  btnsProps?: Partial<FormBtnsProps>
  /** 提交按钮是否不放置在FormItem组件内，默认否 */
  btnsNotInFormItem?: boolean
  /** 请求数据发送前的自定义处理逻辑 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paramsHandler?: (formData: any) => any
  /** 提交成功后跳转路由name或手动处理函数 */
  successSkip?: SkipRouteOrFn
  /** 提交成功后是否需要等待message消息消失后再跳转 */
  immediateSkip?: boolean
  /** 取消后跳转路由name或手动处理函数 */
  cancelSkip?: SkipRouteOrFn
  /** 提交给request函数的第一个参数，一般是用于请求路径参数中的主键id */
  primaryKey?: StrOrNum
  /** 表单绑定值，不传则由组件内部管理 */
  modelValue?: AnyObject
  /** 是否启用modelValue同步更新，适用于需要根据表单值动态处理组件外逻辑的情况 */
  syncModelValue?: boolean
  /** 表单是否在提交中 */
  sending?: boolean
}
