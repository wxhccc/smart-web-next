<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { message } from 'ant-design-vue'
import { ActionBtnItem, CommonListPage, OperationItem } from '@wxhccc/ue-antd-vue'
import { pick } from 'lodash-es'
import { array2tree } from '@wxhccc/es-util'
import SimpleForm from '@/components/simple-form'
import { useAppStore, useUserStore } from '@/store'
import { getAllGroups, addUserGroup, updateUserGroup } from '@/api/access'
import { deleteBtn, editBtn, stateBtn, tableActionBtn } from '@/common/data/action-btns'
import { usePagedData } from '@/hooks'
import { smartfetch, refToLock } from '@/utils'
import { useCommonForm } from '@/common/hooks'
import { FormParams, TreeItem, useListPageData } from './data-and-handle'

const store = useAppStore()
const { hasPermission } = useUserStore()

const expandKeys = ref<App.StrOrNum[]>([])

const { pagedData, loading } = usePagedData()

const { formData: editFormData, formProps: editFormProps } = useCommonForm<FormParams>({})

const flatItemMap = ref<Record<string, TreeItem>>({})

const tableActionBtns = computed<ActionBtnItem[]>(() => [
  ...(hasPermission('groups:edit')
    ? [
        tableActionBtn({
          text: '添加子用户组',
          key: 'addSubGroup',
          click: onGroupAdd
        }),
        editBtn(onGroupEdit),
        stateBtn(onStausChange, undefined, {
          confirmMessage: (isAccess, keyWord) =>
            `${keyWord}后，该用户组及子用户组将会${
              isAccess ? '禁用（无法添加用户到组）' : '恢复正常'
            }，确定${keyWord}吗?`
        })
      ]
    : [])
  // ...(hasPermission('groups:delete') ? [deleteBtn(onDeleteGroup)] : [])
])

const { searchForm, searchParams, tableColumns, editFormItems, editFormState, editModalProps } =
  useListPageData(tableActionBtns)

const operationItems = computed(() => [
  {
    btnText: '新增用户组',
    key: 'addGroup',
    type: 'primary',
    onClick: () => onGroupAdd()
  } as OperationItem
])

const searchKeys = computed(() => {
  const result = new Set<App.StrOrNum>()
  const { name: keyWord } = searchParams.value
  if (keyWord) {
    Object.entries(flatItemMap.value).forEach(([key, value]) => {
      if (value.name.includes(keyWord)) {
        result.add(value.id)
        let parent = flatItemMap.value[value.pid]
        while(parent) {
          result.add(parent.id)
          parent = flatItemMap.value[parent.pid]
        }
      }
    })
  }
  return Array.from(result)
})

const handlePagedData = computed(() => {
  if (searchKeys.value.length) {
    const { rows, total } = pagedData.value
    const filterItems = (items: TreeItem[]) => {
      const result: TreeItem[] = []
      items.forEach(i => {
        if (searchKeys.value.includes(i.id)) {
          const { children, ...rest } = i
          result.push({ ...rest, children: filterItems(children || []) })
        }
      })
      return result
    }
    return { rows: filterItems(rows as TreeItem[]), total }
  }
  return pagedData.value
})

const getGroupListData = async () => {
  const [, data] = await smartfetch<Group.Item[]>(getAllGroups(), refToLock(loading))
  if (data && Array.isArray(data)) {
    flatItemMap.value = data.reduce((acc, cur) => {
      acc[cur.id] = cur
      return acc
    }, {} as Record<string, Group.Item>)
    const treeData = array2tree(data, { parentRefKey: true }) as TreeItem[]
    pagedData.value = { rows: treeData, total: data.length }
  }
}

const onGroupAdd = (parent?: TreeItem) => {
  editFormState.value = { visible: true, parent }
  editFormData.value = { pid: (parent?.id as number) || 0, state: 1 }
}

const onGroupEdit = (row: TreeItem) => {
  editFormState.value = { visible: true, isEdit: true, model: row }
  editFormData.value = pick(row, ['id', 'pid', 'name']) as FormParams
}

const onStausChange = async (row: TreeItem) => {
  const { id, state } = row
  const params = { state: 1 ^ state }
  const [err] = await smartfetch(updateUserGroup(id, params))
  if (!err) {
    row.state = params.state
  }
}

const onEditModalClose = () => {
  editFormState.value = { visible: false }
}

const sendGroupInfo = async (params: FormParams) => {
  const { isEdit, model, parent } = editFormState.value
  const config = isEdit
    ? updateUserGroup((model as TreeItem).id, params)
    : addUserGroup(params as Group.AddParams)
  const [, data] = await smartfetch<boolean | number>(config)
  if (data) {
    message.success('提交成功！')
    onEditModalClose()
    getGroupListData()
  }
}
const onDeleteGroup = async (row: TreeItem) => {}

getGroupListData()
</script>
<script lang="ts">
export default { name: 'GroupListPage' }
</script>
<template>
  <div class="group-list-page">
    <common-list-page
      v-model:search-params="searchParams"
      v-model:expanded-row-keys="expandKeys"
      :paged-data="handlePagedData"
      :loading="loading"
      :columns="tableColumns"
      :pagination="false"
      :operation="operationItems"
      :search-forms="searchForm"
      :restore="store.remember"
    >
    </common-list-page>
    <simple-form
      modal
      :visible="editFormState.visible"
      v-model="editFormData"
      sync-model-value
      :field-items="editFormItems"
      :props="editFormProps"
      :modal-props="editModalProps"
      @no-request-submit="sendGroupInfo"
      @cancel="onEditModalClose"
    ></simple-form>
  </div>
</template>

<style lang="scss">
.group-list-page {
  .match-words {
    color: red;
  }
}
</style>
