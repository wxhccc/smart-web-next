<script setup lang="ts">
import { vueTypeProp } from '@wxhccc/ue-antd-vue'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue'
import { ListItem } from './utils'

const props = defineProps({
  data: vueTypeProp<ListItem>(Object, () => ({ isAddCard: true }))
})
const emit = defineEmits(['add', 'delete', 'edit'])
</script>

<template>
  <a-card class="route-page-item-card" hoverable>
    <div v-if="'isAddCard' in data" class="add-card" @click="$emit('add')">
      <plus-outlined />
    </div>
    <template v-else>
      <a-card-meta class="route-page-info" :title="data.name || data.routeName">
        <template #description>
          <div class="info-line">
            <label>路由Name:</label>
            <span class="sw-text-ellipsis">{{ data.routeName }}</span>
          </div>
        </template>
      </a-card-meta>
      <div class="action-pane">
        <div class="inner-pane">
          <div class="sw-text-ellipsis create-time-span"><clock-circle-outlined /> {{ data.createdAt }} </div>
          <div class="action-btns">
            <a-button class="delete-btn" type="link" @click="$emit('edit', data)">
              <edit-outlined />
            </a-button>
            <a-button class="delete-btn" danger type="link" @click="$emit('delete', data)">
              <delete-outlined />
            </a-button>
          </div>
        </div>
      </div>
    </template>
  </a-card>
</template>

<style lang="scss">
.virtual-route-pages .route-page-item-card {
  .ant-card-body {
    display: flex;
    padding: 16px;
    height: 140px;
  }
  .add-card {
    @include flex-block(row, center);
    width: 100%;
    font-size: 40px;
    opacity: 0.6;
    .anticon {
      padding: 10px;
      border: 1px dashed #bebebe;
    }
  }
  .route-link {
    flex: 1;
    overflow: hidden;
  }
  .route-page-name {
    @include text-ellipsis;
    padding: 0;
    font-size: 14px;
  }
  .info-line {
    display: flex;
    white-space: nowrap;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.65);
    label {
      padding-right: 12px;
    }
  }

  .action-pane {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    padding: 0 20px;
    box-sizing: border-box;
    .inner-pane {
      @include flex-block('', vertical);
      width: 100%;
      height: 100%;
      color: var(--grey-color);
      border-top: 1px solid var(--border-color);
      justify-content: space-between;
    }
  }
  .action-btns {
    white-space: nowrap;
    overflow: hidden;
  }
  .create-time-span {
    display: flex;
    flex: 1;
    align-items: center;
    .anticon {
      margin-right: 6px;
    }
  }
  .delete-btn {
    margin-left: 8px;
    padding-right: 0;
  }
}
</style>
