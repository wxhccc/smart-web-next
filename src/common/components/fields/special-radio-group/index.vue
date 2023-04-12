<script lang="ts">
import { CSSProperties, defineComponent } from 'vue'
import { vueTypeProp } from '@wxhccc/ue-antd-vue'
import SwImage from '@/components/sw-image'
import { SpecialRadioGroupProps } from './index'

type PropsWithDef = Required<SpecialRadioGroupProps>

export default defineComponent({
  name: 'SpecialRadioGroup',
  components: {
    SwImage
  },
  props: {
    options: vueTypeProp<PropsWithDef['options']>(Array, () => []),
    modelValue: vueTypeProp<App.StrOrNum>([String, Number]),
    valueKey: vueTypeProp(String, 'value'),
    type: vueTypeProp<SpecialRadioGroupProps['type']>(String),
    readonly: Boolean,
    disabled: Boolean,
    readonlyFilter: Boolean,
    layout: vueTypeProp<PropsWithDef['layout']>(String, 'horizontal'),
    size: vueTypeProp<PropsWithDef['size']>(String, 'small')
  },
  emits: ['update:modelValue', 'onChange'],
  computed: {
    handleOptions(): SpecialRadioGroupProps['options'] {
      const { options, readonlyFilter: isFilter, modelValue, valueKey } = this
      const hasModelValue = modelValue !== undefined
      return Array.isArray(options) && isFilter && hasModelValue
        ? options.filter((item) => modelValue === item[valueKey])
        : options
    },
    itemStyles(): CSSProperties {
      const { readonlyFilter: isFilter, options = [] } = this
      return isFilter ? { flex: `0 0 ${100 / options.length}%` } : {}
    }
  },
  methods: {
    onClickHandler(item: App.AnyObject) {
      if (item.disabled || this.readonly) {
        return
      }
      if (item[this.valueKey] !== this.modelValue) {
        this.$emit('update:modelValue', item[this.valueKey])
        this.$emit('onChange', item[this.valueKey])
      }
    }
  }
})
</script>

<template>
  <div :class="['sw-special-radio-group', `${layout}-radio-group`]">
    <template v-for="(item, index) in handleOptions" :key="item[valueKey] || index">
      <div
        :class="[
          'sw-special-radio',
          { 'is-active': item[valueKey] === modelValue, 'sw-special-radio-disabled': disabled || item.disabled }
        ]"
        :style="itemStyles"
        @click="onClickHandler(item)"
      >
        <slot :item="item" :index="index">
          <sw-image
            v-if="type === 'image'"
            class="radio-image"
            :preview="false"
            :src="item.imageUrl"
            :alt="item.label"
          ></sw-image>
          <a-card
            v-if="type === 'card'"
            :bordered="false"
            :size="size"
            :class="['radio-card', { 'radio-meta-card': !!item.meta }]"
          >
            <template v-if="item.cover" #cover>
              <sw-image :preview="false" :src="item.cover" :alt="item.label"></sw-image>
            </template>
            <slot name="cardContent" :item="item">
              <a-card-meta v-if="item.meta" v-bind="item.meta">
                <template v-if="item.meta.icon" #avatar>
                  <component :is="item.meta.icon"></component>
                </template>
              </a-card-meta>
              <div v-else class="content-line">
                <span class="label-span">{{ item.label }}</span>
                <a-tooltip v-if="item.tip" :title="item.tip"><info-circle-outlined /></a-tooltip>
              </div>
            </slot>
          </a-card>
        </slot>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.sw-special-radio-group {
  &.horizontal-radio-group {
    display: flex;
    .sw-special-radio {
      flex: 1;
      &:not(:last-child) {
        margin-right: 12px;
      }
    }
  }
  .sw-special-radio {
    border-radius: 4px;
    border: 1px solid rgba($theme-color, 0.2);
    cursor: pointer;
    &.sw-special-radio-disabled {
      cursor: not-allowed;
    }
    &:hover {
      border-color: rgba($theme-color, 0.6);
      box-shadow: 0px 2px 8px 1px rgba($theme-color, 0.2);
    }
  }
  .radio-card {
    margin: 4px;
    &:not(.radio-meta-card) {
      .ant-card-body {
        padding: 0;
        .content-line {
          display: flex;
          align-items: center;
          margin: 4px 0;
        }
        .label-span {
          flex: 1;
        }
      }
    }
  }
  .is-active {
    border-color: $theme-color;
  }
}
</style>
