<script setup lang="ts">
import { ref, computed, watch, DefineComponent } from 'vue'
import { FormProps } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { FormFields, vueTypeProp, FormFieldsItem, FormFieldsOption } from '@wxhccc/ue-antd-vue'
import { tplModuleEditFieldsCreators } from '@/common/template'
import {
  CommonModuleType,
  createFieldItemEditFields,
  FieldItemsMap,
  createTableColumnEditFields
} from './utils'
import { useAppStore } from '@/store'

const props = defineProps({
  modelValue: vueTypeProp<App.AnyObject>(Object, () => ({})),
  fieldItems: vueTypeProp<FormFieldsItem[] | FieldItemsMap>([Array, Object]),
  type: vueTypeProp<CommonModuleType>(String)
})
const emit = defineEmits(['update:modelValue'])

const store = useAppStore()

const formData = ref(cloneDeep(props.modelValue))
const form = ref()
let selfTrigger = false

const formProps: FormProps = { labelCol: { span: 6, sm: 7 } }

const formItems = computed<FieldItemsMap>(() => {
  if (props.fieldItems) {
    const { fieldItems } = props
    return Array.isArray(fieldItems) ? { props: fieldItems } : fieldItems
  }
  if (props.type === 'fieldItem') {
    const { field } = formData.value as FormFieldsOption
    const { name: compName } = field?.component as DefineComponent
    return createFieldItemEditFields(compName, store)
  } else if (props.type === 'tableColumn') {
    const items = createTableColumnEditFields(store)
    return { props: items }
  } else if (tplModuleEditFieldsCreators[props.type]) {
    const creator = tplModuleEditFieldsCreators[props.type]
    const items = creator(store)
    return Array.isArray(items) ? { props: items } : items
  }
  return { props: [] }
})

const emitValue = () => {
  selfTrigger = true
  emit('update:modelValue', cloneDeep(formData.value))
}

watch(
  () => props.modelValue,
  () => {
    if (selfTrigger) {
      selfTrigger = false
      return
    }
    formData.value = cloneDeep(props.modelValue)
  }
)
</script>

<template>
  <a-form ref="form" class="module-item-form" v-bind="formProps" :model="formData" @finish="emitValue">
    <a-divider orientation="left" plain>属性</a-divider>
    <form-fields v-model="formData" :items="formItems.props" />
    <template v-if="formItems.extra?.length">
      <a-divider orientation="left" plain>其他</a-divider>
      <form-fields v-model="formData" :items="formItems.extra" />
    </template>
    <div class="form-btns-pane">
      <a-button v-show="!!type" html-type="submit" type="primary">确认</a-button>
    </div>
  </a-form>
</template>

<style lang="scss">
.virtual-route-pages .module-item-form {
  @include relative;
  padding: 20px 16px 0;
  background-color: #ffffff;
  overflow: hidden auto;
  .ue-form-field-item {
    .ant-input-number {
      width: 100%;
    }
  }
  .form-btns-pane {
    position: sticky;
    bottom: 0;
    background-color: #ffffff;
    .ant-btn {
      width: 100px;
    }
  }
}
</style>
