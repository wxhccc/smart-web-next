<script setup lang="ts">
import { computed, createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { vueTypeProp } from '@wxhccc/ue-antd-vue'
import RoutePageCard from './route-page-card.vue'
import { ListItem } from './utils'

type DataRecord = VirtualRoutes.Item

const props = defineProps({
  data: vueTypeProp<DataRecord[]>(Array, () => []),
  loading: Boolean
})

const emit = defineEmits<{
  (e: 'edit', item?: DataRecord): void
  (e: 'delete', item: DataRecord): void
}>()

const grid = { xxl: 4, xl: 3, lg: 3, md: 2, sm: 2, xs: 2 }

const pageList = computed<ListItem[]>(() => [...props.data, { isAddCard: true }])

const onDeleteRoute = (record: DataRecord) => {
  Modal.confirm({
    title: `确认要删除路由 ${record.routeName} 吗？`,
    content: '该操作无法撤销，请谨慎操作',
    icon: createVNode(ExclamationCircleOutlined),
    onOk: () => emit('delete', record)
  })
}

const onAddRoute = () => emit('edit')

</script>

<template>
  <a-list class="sw-full-spin route-page-list" size="small" :data-source="pageList" :grid="grid" :loading="loading">
    <template #renderItem="{ item }">
      <a-list-item class="project-list-item">
        <route-page-card :data="item" @add="onAddRoute" @edit="() => $emit('edit', item)" @delete="onDeleteRoute" />
      </a-list-item>
    </template>
    <template #footer>
      <div>总页面数：{{ data.length }}</div>
    </template>
  </a-list>
</template>

<style lang="scss">
.virtual-route-pages .route-page-list {
  @include flex-block(column);
  height: 100%;
  background-color: transparent;
  .ant-spin-container {
    padding: 20px 0;
  }
  .ant-list-footer {
    padding-left: 20px;
    border-top: 1px solid #eaeaea;
  }
}
</style>
