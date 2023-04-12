<template>
  <span :class="['sw-status-dot', colorClassName]" :style="styles">
    <slot></slot>
  </span>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { vueTypeProp } from '@wxhccc/ue-antd-vue'
import { StatusDotProps } from './'

export default defineComponent({
  name: 'StatusDot',
  props: {
    color: vueTypeProp<NonNullable<StatusDotProps['color']>>(String, 'default')
  },
  setup(props) {
    const colorClassName = computed(() => (typeof props.color === 'string' ? `status-${props.color}` : ''))
    const styles = computed(() => {
      if (Array.isArray(props.color)) {
        const [backgroundColor, color] = props.color
        return { backgroundColor, color }
      } else if (props.color.startsWith('#')) {
        return { backgroundColor: props.color }
      }
      return {}
    })
    return { colorClassName, styles }
  }
})
</script>
<style lang="scss">
.sw-status-dot {
  white-space: nowrap;
  &::before {
    content: '';
    display: inline-block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    margin-right: 4px;
    vertical-align: middle;
  }
  &.status-default::before {
    background: rgba(0, 0, 0, 0.4);
  }
  &.status-success::before {
    background: #52c41a;
  }
  &.status-processing::before {
    background: #1890ff;
  }
  &.status-error::before {
    background: #f5222d;
  }
  &.status-warning::before {
    background: #faad14;
  }
}
</style>
