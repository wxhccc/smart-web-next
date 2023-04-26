<script setup lang="ts">
import { computed } from 'vue'
import { FormFieldItem, vueTypeProp } from '@wxhccc/ue-antd-vue'
import DraggableList from '@/components/draggable-list'
import PagedTablePage, { PageConfig } from './index'
import { configJsonToObject, createNewColumnItem, createNewSearchFieldItem, fieldsOptions, formCompsMap } from './utils'
import { genUUID } from '@/utils'
import { SearchFieldItem, TableColumnItem } from './type'

type ActiveModuleItem = [keyof PageConfig] | [keyof PageConfig, number]

const props = defineProps({
  modelValue: vueTypeProp<PageConfig>(Object, () => ({} as PageConfig)),
  choseModule: vueTypeProp<App.StrOrNum[]>(Array),
  data: vueTypeProp<App.AnyObject>(Object),
  preview: Boolean
})
const emit = defineEmits(['update:modelValue', 'update:choseModule'])

const handleValue = computed<PageConfig>({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
})

const activeModuleItem = computed({
  get: () => {
    const [module, index] = Array.isArray(props.choseModule) ? props.choseModule : []
    return [module, index] as ActiveModuleItem
  },
  set: (val) => {
    emit('update:choseModule', val)
  }
})

const previewConfigs = computed(() => configJsonToObject(props.modelValue))

const formItems = computed<SearchFieldItem[]>({
  get: () => {
    const { searchFormItems } = handleValue.value
    return Array.isArray(searchFormItems) ? searchFormItems : []
  },
  set: (val) => onUpdateValue('searchFormItems', val)
})

const columnItems = computed({
  get: () => {
    const { tableColumns } = handleValue.value
    return Array.isArray(tableColumns) ? tableColumns : []
  },
  set: (val) => onUpdateValue('tableColumns', val)
})

const onUpdateValue = <K extends keyof PageConfig>(key: K, value: PageConfig[K]) => {
  handleValue.value = { ...props.modelValue, [key]: value }
}

const getActiveIndex = (key: App.StrOrNum) => {
  const [moduleKey, index] = activeModuleItem.value
  return moduleKey === key ? (index as number) : undefined
}
/** 排除附加字段，其他字段给对应组件 */
const getModuleItemProps = (item: SearchFieldItem) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, extraConfig, field, ...rest } = item
  const { component, ...fieldRest } = field || {}
  return { ...rest, field: { ...fieldRest, component: formCompsMap[component as string] } }
}

const addNewFieldItem = ({ key }: { key: string }) => {
  const newItem = createNewSearchFieldItem(key)
  if (newItem) {
    formItems.value = formItems.value.concat([{ ...newItem, id: genUUID() }])
  }
}

const addNewColumnItem = () => {
  columnItems.value = columnItems.value.concat([createNewColumnItem()])
}
</script>
<script lang="ts">
export default { name: 'PagedTablePageConfig' }
</script>

<template>
  <div class="paged-table-page-config">
    <a-form v-show="!preview" class="section-box config-container">
      <div class="section-box top-section">
        <div class="section-box operation-section">
          <span class="section-tips">操作按钮区(暂不可用)</span>
        </div>
        <div class="section-box search-form-section">
          <span class="section-tips">查询条件区</span>
          <draggable-list
            v-model="formItems"
            class="search-field-list"
            :active-index="getActiveIndex('searchFormItems')"
          >
            <template #default="{ item, index }">
              <div @click="() => (activeModuleItem = ['searchFormItems', index])">
                <form-field-item v-bind="getModuleItemProps(item)"></form-field-item>
              </div>
            </template>
            <template #add>
              <a-dropdown class="list-add-btn" trigger="click">
                <a-button class="list-add-btn" type="text"><plus-outlined /></a-button>
                <template #overlay>
                  <a-menu @click="addNewFieldItem">
                    <a-menu-item v-for="item in fieldsOptions" :key="item.value">{{
                      item.label
                    }}</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
          </draggable-list>
        </div>
      </div>
      <div class="section-box table-section">
        <div class="section-box columns-section">
          <span class="section-tips">表头区</span>
          <draggable-list
            v-model="columnItems"
            class="table-columns-list"
            :active-index="getActiveIndex('tableColumns')"
          >
            <template #default="{ item, index }">
              <div
                class="table-header-cell"
                @click="() => (activeModuleItem = ['tableColumns', index])"
              >
                {{ item.title || `列${index + 1}` }}
              </div>
            </template>
            <template #add>
              <a-button class="list-add-btn" type="text" @click="addNewColumnItem">
                <plus-outlined />
              </a-button>
            </template>
          </draggable-list>
          <div class="table-action-column" @click="() => (activeModuleItem = ['tableActionColumn'])">操作列</div>
        </div>
        <div class="section-box list-section">
          <span class="section-tips">数据区</span>
          <a-alert type="warning" show-icon>
            <template #message>
              必须配置接口地址才能请求数据，
              <a-button type="link" @click="() => (activeModuleItem = ['getPagedData'])">
                点此进行配置
              </a-button>
            </template>
          </a-alert>
        </div>
      </div>
    </a-form>
    <paged-table-page v-if="preview" :config="previewConfigs" />
  </div>
</template>

<style lang="scss">
.paged-table-page-config {
  @include relative();
  @mixin flex-gap {
    row-gap: 10px;
    column-gap: 10px;
  }
  .section-box {
    position: relative;
    padding: 12px;
    min-height: 50px;
    border: 1px dotted #aaaaaa;
  }
  .config-container {
    @include flex-block(column);
    @include relative();
    @include flex-gap();
    display: flex;
    overflow: hidden;
    border: 0;
  }
  .section-tips {
    position: absolute;
    left: 50%;
    top: 50%;
    color: #666666;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
  .top-section {
    display: flex;
    @include flex-gap();
  }
  .table-section,
  .search-form-section,
  .list-section {
    flex: 1;
  }
  .search-form-section {
    overflow: hidden;
  }
  .table-section {
    @include flex-block(column);
  }
  .operation-section {
    width: 10%;
    min-width: 150px;
    .section-tips {
      color: #aeaeae;
    }
  }
  .list-add-btn {
    width: 100%;
    font-size: 16px;
    line-height: 1;
  }
  .search-field-list {
    flex-wrap: wrap;
    column-gap: 16px;
    .list-group-item {
      min-width: 120px;
      max-width: 25%;
    }
    .ue-form-field-item {
      margin-bottom: 0;
      .ant-form-item-control {
        pointer-events: none;
      }
    }
  }
  .columns-section {
    @include flex-block();
  }
  .table-columns-list {
    flex: 1;
    column-gap: 8px;
    overflow-x: auto;
    .list-group-item {
      min-width: 120px;
      max-width: 20%;
    }
    .table-header-cell {
      @include flex-block(column, center);
      height: 100%;
      font-weight: bold;
    }
  }
  .table-action-column {
    @include flex-block(column, center);
    margin-left: 10px;
    width: 80px;
    border: 1px dashed #aeaeae;
    font-weight: bold;
    cursor: pointer;
    &.actived {
      border-color: var(--theme-color);
    }
  }
  .swc-list-page {
    @include relative;
  }
}
</style>
