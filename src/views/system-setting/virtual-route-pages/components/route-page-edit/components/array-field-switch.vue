<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { vueTypeProp } from '@wxhccc/ue-antd-vue'

type Value = VirtualRoutes.FieldSwitchConfig

const props = defineProps({
  modelValue: vueTypeProp<Value>(Object),
  type: vueTypeProp<Value['type'] | undefined>(String)
})
const emit = defineEmits(['update:modelValue'])

const lockType = computed(() => !!props.type)

const handleValue = computed({
  get: (): Value => {
    const { type, ...rest } = props.modelValue || {}
    return { type: type || (props.type as Value['type']), ...rest }
  },
  set: (val) => {
    emit('update:modelValue', val)
  }
})

const timeRangeValue = computed(() => {
  const { timeRange = [] } = handleValue.value
  return timeRange
})

const options = [
  { value: 'timeRange', label: '时间范围转字段' },
  { value: 'join', label: '数组转字符串(,拼接)' },
  { value: 'pop', label: '数组取最后元素' }
]

const updateValue = <T extends keyof Value>(key: T, val: Value[T]) => {
  console.log(123123, handleValue.value)
  handleValue.value = (key === 'timeRange' ? { ...handleValue.value, [key]: val } : { [key]: val }) as Value
}

const onChangeType = (val: string) => {
  updateValue('type', val as Value['type'])
}
const onTimerangeChange = (index: number, val: string) => {
  const defVal = ['startTime', 'endTime']
  const isNoFormat = index === 2 && !val
  const value = timeRangeValue.value.slice(0, isNoFormat ? 2 : 3) as NonNullable<Value['timeRange']>
  if (!isNoFormat) {
    value[index] = val || defVal[index]
  }
  updateValue('timeRange', value)
}

</script>

<template>
  <div class="array-field-switch-field">
    <a-form-item-rest>
      <a-select v-if="!lockType" :value="handleValue.type" :options="options" @change="onChangeType" />
      <div v-if="handleValue.type === 'timeRange'" class="time-range-inputs">
        <a-input :value="timeRangeValue[0]" placeholder="开始时间字段" @update:value="(val: string) => onTimerangeChange(0, val)" />
        <a-input :value="timeRangeValue[1]" placeholder="结束时间字段" @update:value="(val: string) => onTimerangeChange(1, val)" />
        <a-input
          :value="timeRangeValue[2]"
          class="time-format-input"
          placeholder="时间格式"
          @update:value="(val: string) => onTimerangeChange(2, val)"
        />
      </div>
    </a-form-item-rest>
  </div>
</template>

<style lang="scss">
.array-field-switch-field {
  @include flex-block(column);
  row-gap: 10px;
  .time-range-inputs {
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 10px;
    .ant-input {
      flex: 1;
    }
    .time-format-input {
      flex: none;
      width: 100%;
    }
  }
}
</style>
