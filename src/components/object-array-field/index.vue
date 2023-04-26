<script setup lang="ts">
import { CSSProperties, computed } from 'vue'
import { cloneDeep } from 'lodash-es'
import { Input } from 'ant-design-vue'
import {
  FormFieldItem,
  FormFieldItemProps,
  vueTypeProp,
  createFFIRulesProps,
  createFormFieldItem
} from '@wxhccc/ue-antd-vue'
import { ObjectArrayColumn, ObjectArrayFieldProps, ValueItem } from './index'

type OAFProps = ObjectArrayFieldProps

const props = defineProps({
  rowProps: vueTypeProp<OAFProps['rowProps']>(Object),
  modelValue: vueTypeProp<OAFProps['modelValue']>(Array, () => []),
  staticValue: vueTypeProp<OAFProps['staticValue']>(Array, () => []),
  columns: vueTypeProp<OAFProps['columns']>(Array, () => [
    { label: 'Label', name: 'label' },
    { label: 'Value', name: 'value' }
  ]),
  labelTop: vueTypeProp<boolean>(Boolean, true),
  prevNames: vueTypeProp<OAFProps['prevNames']>(Array, () => []),
  deleteConfirm: vueTypeProp<OAFProps['deleteConfirm']>([Boolean, Function]),
  addButton: vueTypeProp<OAFProps['addButton']>([Boolean, String]),
  orderKey: vueTypeProp<OAFProps['addButton']>([Boolean, String]),
  bordered: Boolean
})
const emit = defineEmits<{
  (e: 'update:modelValue', value?: OAFProps['modelValue']): void
}>()

const gridStyle = computed(
  (): CSSProperties => ({
    gridTemplateColumns: `repeat(${props.columns.length}, minmax(100px, 1fr)) 100px`
  })
)
const handledValue = computed({
  get(): OAFProps['modelValue'] {
    return props.staticValue.concat(cloneDeep(props.modelValue))
  },
  set(val: OAFProps['modelValue']) {
    const dyncValue = val.slice(props.staticValue.length)
    emit('update:modelValue', addIndexToValue(dyncValue))
  }
})
const addBtnText = computed(() => {
  const { addButton } = props
  return typeof addButton === 'string' ? addButton : '新增'
})
// 将元素的索引添加到对象中
const addIndexToValue = (data: ValueItem[]) => {
  const { orderKey } = props
  if (!orderKey) {
    return data
  }
  const key = typeof orderKey === 'string' ? orderKey : 'index'
  return data.map((item, index) => ({ ...item, [key]: index }))
}

// 交换对象在数组中的顺序
const swapArray = (orgIndex: number, targIndex: number) => {
  const arr = cloneDeep(handledValue.value)
  arr[orgIndex] = arr.splice(targIndex, 1, arr[orgIndex])[0]
  handledValue.value = arr
}
// 由配置参数创建FormItemFieldProps
const getFieldItem = (item: ObjectArrayColumn, index: number, isStatic?: boolean) => {
  const { component = Input, name, label, required = true, placeholder: ph, isNumber } = item
  const placeholder = ph || '请输入' + label
  const fiProps: FormFieldItemProps = props.labelTop ? { wrapperCol: { span: 24 } } : {}
  const trueIndex = index - props.staticValue.length
  return createFormFieldItem(
    component,
    createFFIRulesProps(props.labelTop ? '' : label, required, [], fiProps),
    isStatic ? undefined : name,
    { placeholder, isNumber, readonly: isStatic },
    { prevNames: (props.prevNames || []).concat([trueIndex]) }
  )
}
const trueIndex = (index: number) => {
  return index - props.staticValue.length
}
const objectMove = (index: number, moveIndex: number) => {
  swapArray(index, index + moveIndex)
}
/** event **/
const createNewItem = (name: App.StrOrNum = '', value: App.StrOrNum = '') => {
  handledValue.value = handledValue.value.concat([name ? { [name]: value } : {}])
}
const updateObject = (object: ValueItem, name: App.StrOrNum, val: App.StrOrNum) => {
  object[name] = val
  handledValue.value = cloneDeep(handledValue.value)
}
const deleteObject = (index: number) => {
  const deleteFn = () => {
    const value = cloneDeep(handledValue.value)
    value.splice(index, 1)
    handledValue.value = value
  }
  const { deleteConfirm } = props
  if (typeof deleteConfirm === 'function') {
    const promise = deleteConfirm()
    if (promise instanceof Promise) {
      promise.then(deleteFn)
    }
  } else {
    deleteFn()
  }
}
</script>
<script lang="ts">
export default { name: 'ObjectArrayField' }
</script>

<template>
  <ul :class="['ue-object-array-field', { 'is-bordered': bordered }]" :style="gridStyle">
    <template v-if="labelTop">
      <li
        v-for="(item, index) in columns"
        v-bind="item.colProps"
        :key="item.name || index"
        class="cell-col labal-col"
      >
        <span class="labal-span">{{ item.label }}</span>
      </li>
      <li class="cell-col ope-btns">操作</li>
    </template>
    <template v-for="(object, oindex) in handledValue" :key="oindex">
      <li
        v-for="(item, index) in columns"
        v-bind="item.colProps"
        :key="index"
        class="cell-col value-col"
      >
        <form-field-item
          v-bind="getFieldItem(item, oindex, object.static)"
          :ref="`${item.name}.field`"
          :model-value="object[item.name]"
          @update:model-value="updateObject(object, item.name, $event)"
        >
        </form-field-item>
      </li>
      <li class="cell-col ope-btns">
        <template v-if="!object.static">
          <slot name="actionBtns" :item="object" :index="trueIndex(oindex)" :value="modelValue">
            <a-button
              class="sw-link-icon"
              :disabled="trueIndex(oindex) === modelValue.length - 1"
              type="link"
              size="small"
              @click="objectMove(oindex, +1)"
            >
              <arrow-down-outlined />
            </a-button>
            <a-button
              :disabled="trueIndex(oindex) === 0"
              type="link"
              size="small"
              @click="objectMove(oindex, -1)"
            >
              <arrow-up-outlined />
            </a-button>
          </slot>
          <a-button type="link" size="small" @click="deleteObject(oindex)"
            ><delete-outlined
          /></a-button>
        </template>
      </li>
    </template>
    <a-row class="add-btn-row">
      <a-button type="link" @click="createNewItem()"><plus-outlined />新增</a-button>
    </a-row>
  </ul>
</template>

<style lang="scss">
.ue-object-array-field {
  display: grid;
  padding: 0;
  grid-gap: 4px 20px;
  li {
    position: relative;
    list-style: none;
  }
  .me-form-field-item {
    margin-bottom: 0;
  }
  &.is-bordered {
    grid-gap: 0;
    .cell-col {
      padding: 6px 6px;
      border: 1px solid var(--border-color);
    }
    .top-label-row {
      background-color: #eaeaea;
    }
  }
  .add-btn-row .ant-btn {
    padding: 0;
  }
  .ope-btns {
    display: flex;
    white-space: nowrap;
    align-items: baseline;
    min-width: 104px;
  }
  .form-field-item {
    display: flex;
    margin-right: 0;
  }
}
</style>
