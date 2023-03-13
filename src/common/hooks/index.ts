import { ref } from 'vue'
import { FormInstance, FormProps } from 'ant-design-vue'
import { useAppStore, AppConfig } from '@/store'

/** 提供一些表单的基础属性 */
export const useCommonForm = <T extends App.AnyObject = App.AnyObject>(initData?: T) => {
  const form = ref<FormInstance>()

  const formData = ref({ ...initData } as T)

  const colProps = (spans: [number, number] = [4, 18]): FormProps => ({ labelCol: { span: spans[0] }, wrapperCol: { span: spans[1] } })

  const formProps = ref(colProps())

  return { form, formData, formProps }
}

/**
 * 从store中获取指定的switchFilter
 * @param keys 
 */
export const useStoreSwitchFilter = <K extends keyof AppConfig>(keys: K[]) => {
  const store = useAppStore()

  return keys.map((i) => store.switchFilter(i))
}