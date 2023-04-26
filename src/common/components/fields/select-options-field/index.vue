<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import { FormFieldItem, createRadioGroupFormItem, createFormFieldItem, vueTypeProp } from '@wxhccc/ue-antd-vue'
import { EditOutlined } from '@ant-design/icons-vue'
import ObjectArrayField, { ObjectArrayColumn } from '@/components/object-array-field'

const props = defineProps({
  modelValue: vueTypeProp<Common.SelectOption[]>(Array, () => [])
})
const emit = defineEmits(['update:modelValue'])


const form = ref()
const visible = ref(false)
const getInitType = () => {
  const { modelValue: val } = props
  return Array.isArray(val) && val.length && typeof val[0].value === 'number' ? 'number' : 'string'
}
let selfTrigger = false

const type = ref(getInitType())
const selfValue = ref<Common.SelectOption[]>([])

const typeOptions = [
  { value: 'number', label: 'number' },
  { value: 'string', label: 'string' }
]
const typeFieldItem = createRadioGroupFormItem('value类型', 'type', typeOptions)
/** 枚举类型的字典字段 */
const optionsFieldItem = computed(() => {
  const isNumber = type.value === 'number'
  const paramsColumns = (): ObjectArrayColumn[] => [
    { label: '实际值', name: 'value', isNumber, colProps: { flex: 2 } },
    { label: '显示值', name: 'label', colProps: { flex: 3 } }
  ]
  return createFormFieldItem(ObjectArrayField, '选项列表', 'options', {
    columns: paramsColumns(),
    bordered: true,
    addButton: true,
    prevNames: ['options']
  })
})

const updateItemValue = () => {
  selfValue.value.forEach((item) => {
    item.value = ''
  })
}
const emitValue = () => {
  selfTrigger = true
  emit('update:modelValue', cloneDeep(selfValue.value))
  visible.value = false
}

const resetSelfValue = (visible: boolean) => {
  if (visible) {
    selfValue.value = cloneDeep(props.modelValue)
  }
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (selfTrigger) {
      selfTrigger = false
      return
    }
    selfValue.value = cloneDeep(newVal)
  }
)

</script>

<template>
  <div class="swc-select-options-field">
    <a-input-group compact>
      <a-select value="" :options="modelValue" />
      <a-popover
        v-model:visible="visible"
        title="编辑数据"
        trigger="click"
        overlay-class-name="swc-select-options-field-popover"
        @visible-change="resetSelfValue"
      >
        <template #content>
          <a-form ref="form" :model="{ type, options: selfValue }">
            <form-field-item v-model="type" v-bind="typeFieldItem" @change="updateItemValue" />
            <form-field-item v-model="selfValue" v-bind="optionsFieldItem" />
            <form-btns :form="form" is-validate :submit="emitValue" :cancel="() => (visible = false)" />
          </a-form>
        </template>
        <a-button type="primary"><edit-outlined /></a-button>
      </a-popover>
    </a-input-group>
  </div>
</template>

<style lang="scss">
.swc-select-options-field {
  width: 100%;
  .ant-input-group {
    display: flex;
  }
  .ant-select {
    flex: 1;
  }
}
.swc-select-options-field-popover {
  width: 400px;
  .ant-popover-inner-content {
    max-height: 300px;
    overflow: hidden auto;
  }
  .ue-form-field-item {
    .ant-form-item-label {
      width: 80px;
    }
  }
}
</style>
