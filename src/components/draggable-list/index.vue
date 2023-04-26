<script setup lang="ts">
import { ref, computed } from 'vue'
import { vueTypeProp } from '@wxhccc/ue-antd-vue'
import VueDraggable from 'vuedraggable'

interface Item extends App.AnyObject {
  id?: App.StrOrNum
  isAddItem?: boolean
}
const props = defineProps({
  modelValue: vueTypeProp<App.AnyObject[]>(Array, () => []),
  activeIndex: vueTypeProp<number>(Number)
})
const emit = defineEmits<{
  (e: 'update:modelValue', value?: App.AnyObject[]): void
  (e: 'update:activeIndex', index?: number): void
}>()

const isPreview = ref(false)

const handleValue = computed({
  get: () => (Array.isArray(props.modelValue) ? props.modelValue : []),
  set: (val) => {
    emit('update:modelValue', val)
  }
})

const listItems = computed<Item[]>(() => {
  return [...handleValue.value, { id: 'add', isAddItem: true }]
})

const removeItem = (index: number) => {
  emit('update:activeIndex', undefined)
  const newItems = handleValue.value.slice(0)
  newItems.splice(index, 1)
  handleValue.value = newItems
}

const onItemsUpdate = (items: Item[]) => {
  const newItems = items.filter((item) => !item.isAddItem)
  handleValue.value = newItems
}

</script>
<script lang="ts">
export default { name: 'DraggableList' }
</script>

<template>
  <vue-draggable
    class="draggable-list-group"
    item-key="id"
    :model-value="listItems"
    filter=".list-group-add"
    @update:modelValue="onItemsUpdate"
  >
    <template #item="{ element, index }">
      <div
        :class="[
          'list-group-item',
          {
            'list-group-add': element.isAddItem,
            actived: activeIndex === index
          }
        ]"
      >
        <template v-if="!element.isAddItem">
          <a-button danger type="link" class="remove-item-btn" @click="removeItem(index)">
            <close-circle-outlined />
          </a-button>
          <slot :item="element" :index="index"></slot>
        </template>
        <slot v-else name="add"></slot>
      </div>
    </template>
  </vue-draggable>
</template>



<style lang="scss">
.draggable-list-group {
  display: flex;
  column-gap: 10px;
  row-gap: 10px;
  .list-group-item {
    position: relative;
    flex: 1;
    min-width: 80px;
    border: 1px dashed #aeaeae;
    cursor: pointer;
    &.actived {
      border-color: var(--theme-color);
    }
    .remove-item-btn {
      position: absolute;
      display: none;
      right: 0;
      top: -5px;
      padding: 0;
      height: auto;
      z-index: 2;
      font-size: 16px;
    }
    &:hover .remove-item-btn {
      display: block;
    }
  }
  .list-group-add {
    @include flex-block(column, center);
    font-size: 16px;
  }
}
</style>
