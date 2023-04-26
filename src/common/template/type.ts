import { FormFieldsItem } from '@wxhccc/ue-antd-vue'
import { AppStore } from '@/store'

export interface FieldItemsMap {
  props: FormFieldsItem[]
  extra?: FormFieldsItem[]
}

export interface TplModuleEditFieldsCreator {
  (store?: AppStore): FieldItemsMap | FormFieldsItem[]
}
