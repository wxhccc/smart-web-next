<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { FormFields, SearchInput, FormBtns } from '@wxhccc/ue-antd-vue'
import { cloneDeep, isEqual } from 'lodash-es'
import { getSystemConfigs, updateSystemConfigs } from '@/api/system'
import DetailPageContainer from '@/components/detail-page-container'
import { refToLock, smartfetch } from '@/utils'
import { useCommonForm } from '@/common/hooks'
import DictConfigItem from './components/dict-config-item.vue'
import { baseModuleFieldItems, dictItemFieldItems, FormParams } from './data-and-utils'

type OriginItem = SystemSettings.Configs.Item
type DictItem = SystemSettings.Configs.DictParamsItem

const { form, formData, formProps } = useCommonForm<FormParams>({
  base: {},
  dict: []
})
const { form: dictForm, formData: dictFormData } = useCommonForm<DictItem>()

const actTab = ref('base')
const dictSearchKey = ref('')
const originData = ref<Record<string, OriginItem>>({})
const loading = ref(false)
const sending = ref(false)

interface DictEditState {
  visible: boolean
  isEdit?: boolean
  item?: DictItem
}

const dictEditState = ref<DictEditState>({ visible: false })

const baseFieldItems = computed(() => baseModuleFieldItems())

const dictFieldItems = computed(() => {
  const { isEdit } = dictEditState.value
  const { valueType } = dictFormData.value
  return dictItemFieldItems(!!isEdit, Boolean(valueType))
})

const showDictConfigs = computed(() => {
  const { dict } = formData.value
  const key = dictSearchKey.value
  return key
    ? dict.filter((item) => item.key.indexOf(key) >= 0 || (item.describe || '').indexOf(key) >= 0)
    : dict
})

const editDictItem = (item?: DictItem) => {
  dictEditState.value = {
    visible: true,
    isEdit: !!item,
    item
  }
  dictFormData.value = item
    ? cloneDeep(item)
    : { key: '', value: undefined, valueType: 0, state: 1, type: 1 }
}

// 获取系统配置数据
const fetchSystemConfigs = async () => {
  const [err, data] = await smartfetch<OriginItem[]>(getSystemConfigs(), refToLock(loading))
  if (data && Array.isArray(data)) {
    const result = data.reduce(
      (acc, cur) => {
        const { key, value, type } = cur
        acc.originData[key] = cloneDeep(cur)
        if (type === 1) {
          acc.formData.dict.push(cur)
        } else {
          acc.formData.base[key] = value as string
        }
        return acc
      },
      {
        originData: {} as Record<string, OriginItem>,
        formData: { base: {}, dict: [] } as FormParams
      }
    )

    originData.value = result.originData
    formData.value = result.formData
  }
}

// 获取发生变化的数据
const getModifyData = () => {
  const { base, dict } = formData.value
  const result: DictItem[] = []
  Object.entries(base).forEach(([key, value]) => {
    const item = originData.value[key]
    if (!item || base[key] !== item.value) {
      result.push({ ...(item ? { id: item.id } : {}), key, value })
    }
  })
  dict.forEach((item) => {
    const { id, key, value, isDelete } = item
    const oriItem = originData.value[key]
    if (!id || (id && isDelete) || !isEqual(item, oriItem)) {
      result.push(item)
    }
  })
  return result
}

// 更新系统配置数据
const sendSystemConfigs = async (params: DictItem[]) => {
  const [err] = await smartfetch(updateSystemConfigs(params), refToLock(sending))
  if (!err) {
    message.success('保存成功')
    fetchSystemConfigs()
  }
}

const formDataSubmit = async () => {
  const items = getModifyData()
  items.length ? sendSystemConfigs(items) : message.warning('数据未发生变化，无需提交')
}

const closeDictDrawer = () => {
  dictEditState.value = { visible: false, isEdit: false }
}
const dictItemSave = () => {
  const { item } = dictEditState.value
  item ? Object.assign(item, dictFormData.value) : formData.value.dict.push(dictFormData.value)
  dictFormData.value = {} as DictItem
  closeDictDrawer()
}

const dictItemDelete = (item: DictItem, isDelete: boolean) => {
  item.isDelete = isDelete
}

fetchSystemConfigs()
</script>
<script lang="ts">
export default { name: 'SystemConfigs' }
</script>
<template>
  <detail-page-container class="configs-mana-page" :cols-num="0" :loading="loading">
    <a-drawer
      class="sw-fixed-drawer dict-item-edit-dialog"
      v-model:visible="dictEditState.visible"
      :title="dictEditState.isEdit ? '修改字典项' : '新增字典项'"
      size="large"
      @cancel="closeDictDrawer"
    >
      <a-form class="dict-item-form" ref="dictForm" :model="dictFormData" v-bind="formProps">
        <form-fields :items="dictFieldItems" v-model="dictFormData"></form-fields>
      </a-form>
      <template #footer>
        <form-btns
          class="dict-form-btns"
          is-edit
          is-validate
          :form="dictForm"
          :submit="dictItemSave"
          :cancel="closeDictDrawer"
          :texts="{ sureBtn: '确定' }"
        ></form-btns>
      </template>
    </a-drawer>
    <a-form
      class="configs-form"
      ref="form"
      :model="formData"
      v-bind="formProps"
      @finish="formDataSubmit"
    >
      <a-tabs class="sw-fixed-tabs" v-model:active-key="actTab">
        <a-tab-pane class="config-module base-config" key="base" tab="参数配置">
          <form-fields :items="baseFieldItems" v-model="formData.base"></form-fields>
        </a-tab-pane>
        <a-tab-pane class="config-module dict-items" key="dict" tab="字典配置">
          <p class="operation-line">
            <search-input v-model="dictSearchKey" placeholder="搜索标题或key"></search-input>
            <a-button type="primary" @click="() => editDictItem()">
              <template #icon>
                <plus-outlined />
              </template>
              新增
            </a-button>
          </p>
          <div class="dict-list-pane">
            <template v-if="showDictConfigs.length">
              <dict-config-item
                v-for="(item, index) in showDictConfigs"
                :key="index"
                :data="item"
                @edit="editDictItem"
                @delete="dictItemDelete"
              >
              </dict-config-item>
            </template>
            <a-empty
              v-else
              class="common-flex-empty"
              :description="dictSearchKey ? '未搜索到任何数据！' : '暂无数据，请添加数据'"
            ></a-empty>
          </div>
        </a-tab-pane>
      </a-tabs>
      <div class="submit-btn-line">
        <a-button type="primary" html-type="submit" :loading="sending">提交</a-button>
      </div>
    </a-form>
  </detail-page-container>
</template>

<style lang="scss">
.dict-item-edit-dialog {
  .dict-item-form {
    padding: 20px;
  }
  .ue-form-btns {
    padding: 0;
  }
}

.configs-mana-page {
  .page-module-pane {
    padding-top: 6px;
  }
  .config-module {
    padding-top: 10px;
  }
  .configs-form {
    display: flex;
    position: relative;
    flex-direction: column;
    height: 100%;
    .operation-line {
      border-bottom: 1px dashed var(--border-color);
    }
    .sw-fixed-tabs {
      flex: 1;
    }
    .submit-btn-line {
      padding-top: 10px;
      border-top: 1px solid var(--border-color);
    }
  }

  .base-config {
    .comp-form-item-field {
      .field-item {
        width: 400px;
        vertical-align: top;
      }

      &.default-avatar {
        .field-item {
          margin: 0 20px 12px 0;
        }
      }
    }
  }

  .dict-items {
    .operation-line {
      display: flex;
      justify-content: space-between;
      margin: 0;
      padding-bottom: 16px;
      .ue-search-input {
        max-width: 320px;
      }
    }
    .common-flex-empty {
      min-height: 320px;
    }
    .dict-list-pane {
    }
  }
}
</style>
