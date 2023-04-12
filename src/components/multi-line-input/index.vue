<template>
  <div class="ue-multi-line-input">
    <a-input
      v-for="(item, index) in handleValue"
      :ref="(el) => setItemRef(el, index)"
      :key="index"
      :value="item"
      :size="size"
      @update:value="setValue($event, index)"
      @pressEnter="addNewItem(index)"
    >
      <template #suffix>
        <a-button type="link" :disabled="handleValue.length === 1" :size="size" @click="deleteItem(index)">
          <delete-outlined />
        </a-button>
        <a-button type="link" :size="size" @click="addNewItem(index)">
          <plus-outlined />
        </a-button>
        <slot name="suffixBtns" :index="index"></slot>
      </template>
    </a-input>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { vueTypeProp } from '@wxhccc/ue-antd-vue'
import { ButtonSize } from 'ant-design-vue/lib/button'

type InputInstance = { focus: App.AnyFunction<void> }

export default defineComponent({
  name: 'LicenseAddOrUpdate',
  props: {
    modelValue: vueTypeProp<string[]>(Array),
    size: vueTypeProp<ButtonSize>(String, 'small')
  },
  emits: ['update:modelValue'],
  data() {
    return {
      // 内部绑定值
      innerValue: this.getInitValue() as string[],
      // 是否是内部触发的value变动
      selfTrigger: false,
      inputs: {} as Record<string, InputInstance>
    }
  },
  computed: {
    handleValue: {
      get(): string[] {
        return this.innerValue.length ? this.innerValue : ['']
      },
      set(value: string[]) {
        const filterValue = value.filter((val) => !!val)
        this.selfTrigger = true
        this.$emit('update:modelValue', filterValue)
      }
    }
  },
  watch: {
    modelValue() {
      if (this.selfTrigger) {
        this.selfTrigger = false
        return
      }
      this.innerValue = this.getInitValue()
    }
  },
  methods: {
    setItemRef(el: any, index: number) {
      if (el) {
        this.inputs[index] = el
      }
    },
    getInitValue() {
      return Array.isArray(this.modelValue) ? this.modelValue.slice(0) : []
    },
    setValue(value: string, index: number) {
      const trimVal = value.trim()
      this.innerValue.splice(index, 1, trimVal)
      this.handleValue = this.innerValue
    },
    addNewItem(index: number) {
      this.innerValue.splice(index + 1, 0, '')
      this.handleValue = this.innerValue
      this.$nextTick(() => {
        this.inputs[index + 1].focus()
      })
    },
    deleteItem(index: number) {
      this.innerValue.splice(index, 1)
      this.handleValue = this.innerValue
    }
  }
})
</script>
<style lang="scss">
.ue-multi-line-input {
  border: 1px solid $border-color;
  padding: 0 4px;
  .ant-input-affix-wrapper,
  .import-txt-btn {
    margin: 4px 0;
  }
}
</style>
