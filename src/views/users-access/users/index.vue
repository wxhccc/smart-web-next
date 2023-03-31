<script setup lang="ts">
import { ref, computed } from 'vue'
import { ActionBtnItem, CommonListPage, OperationItem } from '@wxhccc/ue-antd-vue'
import { useAppStore } from '@/store'
import { getUserList, updateUser } from '@/api/access'
// import GroupSettingPop from './components/GroupSettingPop'
import { useListPageData } from './data-and-handle'
import { editBtn, stateBtn, tableActionBtn } from '@/common/data/action-btns'
import { usePagedData } from '@/hooks'
import { smartfetch, refToLock } from '@/utils'
import EditFormDrawer, { CompProps as EFDProps } from './components/edit-form-drawer.vue'

type Item = User.Item

type EditFormState = Pick<EFDProps, 'model' | 'visible' | 'isEdit'>

const store = useAppStore()

const { pagedData, loading } = usePagedData()

const editFormState = ref<EditFormState>({ visible: false })

const tableActionBtns = computed<ActionBtnItem[]>(() => [
  ...(true
    ? [
        tableActionBtn({ text: '添加到用户组', key: 'groupSetting', click: onGroupSetting }),
        editBtn(onUserEdit)
      ]
    : []),
  ...(true
    ? [
        stateBtn(onStausChange, undefined, {
          confirmMessage: (isAccess, keyWord) =>
            `${keyWord}后，该账号将会${isAccess ? '被冻结' : '解除冻结'}，确定${keyWord}吗?`
        })
      ]
    : [])
])

const { searchForm, tableColumns } = useListPageData(tableActionBtns)

const operationItems = computed(() => [
  { btnText: '新增用户', key: 'addUser', type: 'primary', onClick: onUserAdd } as OperationItem
])

const getPageListData = async (params: User.SearchParams) => {
  const [, data] = await smartfetch(getUserList(params), refToLock(loading))
  console.log(params, data)
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

const onStausChange = () => {}

const stateParamsHandle = (row: Item) => {
  return { state: 1 ^ row.state }
}
/** event **/
const onGroupSetting = (row: Item) => {
  // Object.assign(this.groupSetting, { show: true, userInfo: row })
}
const rowDataUpdate = (row: Item, params: unknown) => {
  Object.assign(row, params)
}

const onEditDrawerClose = () => {
  editFormState.value = { visible: false }
}
</script>
<script lang="ts">
export default { name: 'UserListPage' }
</script>
<template>
  <div class="user-list-page">
    <common-list-page
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
    <!-- <group-setting-pop
      class="group-slide-pane"
      :show.sync="groupSetting.show"
      :user-info="groupSetting.userInfo"
      @on-update-row="rowDataUpdate"
    >
    </group-setting-pop> -->
  </div>
</template>

<style lang="scss" scoped></style>
