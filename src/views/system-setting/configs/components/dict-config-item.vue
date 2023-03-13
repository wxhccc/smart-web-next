<script setup lang="ts">
import { computed } from 'vue'
import {} from 'ant-design-vue'
import { ColumnType } from 'ant-design-vue/es/table'
import { useStoreSwitchFilter } from '@/common/hooks'

type Item = SystemSettings.Configs.DictParamsItem

const props = defineProps<{
  data: Item
}>()
const emit = defineEmits(['edit', 'delete'])

const columns: ColumnType[] = [
  { title: '标题', dataIndex: 'label' },
  { title: '值', dataIndex: 'value' }
]

const [dataTypeFilter, stateFilter] = useStoreSwitchFilter(['dataType', 'commonState'])

const onEditItem = () => {
  emit('edit', props.data)
}

const handleDelete = () => {
  emit('delete', props.data, true)
}
const undoDelete = () => {
  if (props.data.isDelete) {
    emit('delete', props.data, false)
  }
}
</script>

<template>
  <a-card :class="['swcomp-dict-config-item', 'item-state-' + data.state]" hoverable>
    <template #title>
      <span class="title">{{ data.key }}</span>
      <a-tag class="data-type-tag">{{ dataTypeFilter(data.valueType || 0) }}</a-tag>
    </template>
    <template #extra>
      <a-button class="edit-btn" @click="onEditItem">
        <template #icon>
          <edit-outlined />
        </template>
      </a-button>
      <a-popconfirm
        title="删除操作将在提交时生效，提交前可随时撤销删除操作，确定删除？"
        :disabled="data.isDelete"
        @confirm="handleDelete"
      >
        <a-button class="delete-btn" danger @click="undoDelete">
          <template #icon>
            <undo-outlined v-if="data.isDelete" />
            <delete-outlined v-else />
          </template>
        </a-button>
      </a-popconfirm>
    </template>
    <div class="desc-state-pane">
      <span class="desc">{{ data.describe }}</span>
      <a-tag class="state-tag" :color="data.state ? 'success' : 'default'">
        {{ stateFilter(data.state || 0) }}
      </a-tag>
      <a-tag v-if="data.isDelete" class="state-tag" color="warning">待删除</a-tag>
    </div>
    <a-popover overlay-class-name="dict-config-item-popover" placement="bottom" width="300">
      <a-button class="expode-bar"><caret-down-outlined /></a-button>
      <template #content>
        <a-table
          class="list-table"
          :columns="columns"
          size="small"
          :scroll="{ y: 360 }"
          :data-source="data.value"
          :pagination="false"
        ></a-table>
      </template>
    </a-popover>
  </a-card>
</template>

<style lang="scss">
.configs-mana-page .swcomp-dict-config-item {
  position: relative;
  display: inline-block;
  margin: 10px 20px 10px 0;
  width: 300px;

  .ant-card-head {
    padding: 0 16px;
  }
  .ant-card-body {
    padding: 24px 16px;
  }
  .data-type-tag {
    margin-left: 8px;
  }

  &.item-state-0 {
    color: #909399;
  }
  .edit-btn {
    margin-right: 12px;
  }
  .desc {
    line-height: 24px;
  }

  .desc-state-pane {
    margin-bottom: 24px;
  }

  .state-tag {
    float: right;
    margin-left: 12px;
  }

  .expode-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 24px;
    padding: 0;
  }
}
.dict-config-item-popover {
  .list-table {
    width: 320px;
  }
}
</style>
