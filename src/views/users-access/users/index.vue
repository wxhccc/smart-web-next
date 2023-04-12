<script setup lang="ts">
import { ref, computed } from 'vue'
import { ActionBtnItem, CommonListPage, OperationItem } from '@wxhccc/ue-antd-vue'
import { useAppStore, useUserStore } from '@/store'
import { getUserList, updateUser, deleteUser } from '@/api/access'
import { useListPageData } from './data-and-handle'
import { deleteBtn, editBtn, stateBtn } from '@/common/data/action-btns'
import { usePagedData } from '@/hooks'
import { smartfetch, refToLock } from '@/utils'
import EditFormDrawer, { CompProps as EFDProps } from './components/edit-form-drawer.vue'

type Item = User.Item

type EditFormState = Pick<EFDProps, 'model' | 'visible' | 'isEdit'>

const store = useAppStore()
const { hasPermission } = useUserStore()

const { pagedData, refresh, loading } = usePagedData()

const editFormState = ref<EditFormState>({ visible: false })

const tableActionBtns = computed<ActionBtnItem[]>(() => [
  ...(hasPermission('users:edit')
    ? [
        editBtn(onUserEdit),
        stateBtn(onStausChange, undefined, {
          confirmMessage: (isAccess, keyWord) =>
            `${keyWord}后，该账号将会${isAccess ? '被冻结' : '解除冻结'}，确定${keyWord}吗?`
        })
      ]
    : []),
  ...(hasPermission('users:delete') ? [deleteBtn(onDeleteUser)] : [])
])

const { searchForm, tableColumns } = useListPageData(tableActionBtns)

const operationItems = computed(() => [
  { btnText: '新增用户', key: 'addUser', type: 'primary', onClick: onUserAdd } as OperationItem
])

const getPageListData = async (params: User.SearchParams) => {
  const [, data] = await smartfetch(getUserList(params), refToLock(loading))
  if (data) {
    pagedData.value = data
  }
}

const onUserAdd = () => {
  editFormState.value = { visible: true }
}

const onUserEdit = (row: Item) => {
  editFormState.value = { visible: true, isEdit: true, model: row }
}

const onStausChange = async (row: Item) => {
  const { id, state } = row
  const params = { state: 1 ^ state }
  const [err] = await smartfetch(updateUser(id, params))
  if (!err) {
    row.state = params.state
  }
}

const onDeleteUser = async (row: Item) => {
  const [err] = await smartfetch(deleteUser(row.id))
  if (!err) {
    refresh.value = true
  }
}

const onEditDrawerClose = (success?: boolean) => {
  editFormState.value = { visible: false }
  if (success) {
    refresh.value = true
  }
}
</script>
<script lang="ts">
export default { name: 'UserListPage' }
</script>
<template>
  <div class="sw-list-page user-list-page">
    <common-list-page
      v-model:refresh="refresh"
      :paged-data="pagedData"
      :loading="loading"
      :columns="tableColumns"
      :operation="operationItems"
      created-auto-send
      :search-forms="searchForm"
      :get-paged-data="getPageListData"
      :restore="store.remember"
    >
    </common-list-page>
    <edit-form-drawer v-bind="editFormState" @close="onEditDrawerClose"></edit-form-drawer>
  </div>
</template>

<style lang="scss" scoped></style>
