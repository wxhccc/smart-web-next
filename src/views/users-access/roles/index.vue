<script setup lang="ts">
import { ref, computed } from 'vue'
import { DrawerProps, message } from 'ant-design-vue'
import { ActionBtnItem, CommonListPage, OperationItem } from '@wxhccc/ue-antd-vue'
import SimpleForm from '@/components/simple-form'
import { pick } from 'lodash-es'
import { useAppStore, useUserStore } from '@/store'
import { getRoleList, addRole, updateRole, deleteRole, getRightsTreeOptions } from '@/api/access'
import { deleteBtn, editBtn } from '@/common/data/action-btns'
import { useCommonForm } from '@/common/hooks'
import { usePagedData } from '@/hooks'
import { smartfetch, refToLock } from '@/utils'
import { useListPageData } from './data-and-handle'

type Item = Role.Item

interface EditFormState extends Common.ModalProps<Item> {
  isEdit?: boolean
}

type FormParams = Role.EditParams

const store = useAppStore()
const { hasPermission } = useUserStore()

const { pagedData, refresh, loading } = usePagedData<Item>()

const { formData: editFormData, formProps: editFormProps } = useCommonForm<FormParams>({})

const editFormState = ref<EditFormState>({ visible: false })

const tableActionBtns = computed<ActionBtnItem[]>(() => [
  ...(hasPermission('role:edit') ? [editBtn(onRoleEdit)] : []),
  ...(hasPermission('role:delete') ? [deleteBtn(onDeleteRole)] : [])
])

const { rightsOptions, searchForm, tableColumns, editFormItems } = useListPageData(tableActionBtns)

const operationItems = computed(() => [
  { btnText: '新增角色', key: 'addRole', type: 'primary', onClick: onRoleAdd } as OperationItem
])

const editModalProps = computed<Partial<DrawerProps>>(() => ({
  size: 'large',
  title: editFormState.value.isEdit ? '编辑角色' : '新增角色'
}))

const getPageListData = async (params: Role.SearchParams) => {
  const [, data] = await smartfetch(getRoleList(params), refToLock(loading))
  if (data) {
    pagedData.value = data
  }
}

const onRoleAdd = () => {
  editFormState.value = { visible: true }
  editFormData.value = {}
}

const onRoleEdit = (row: Item) => {
  editFormState.value = { visible: true, isEdit: true, model: row }
  editFormData.value = pick(row, ['id', 'name', 'description', 'rightIds']) as FormParams
}

const onDeleteRole = async (row: Item) => {
  const [err] = await smartfetch(deleteRole(row.id))
  if (!err) {
    refresh.value = true
  }
}

const getRightOptions = async () => {
  const [, data] = await smartfetch(getRightsTreeOptions())
  rightsOptions.value = Array.isArray(data) ? data : []
}

const sendGroupInfo = async (params: FormParams) => {
  const { isEdit, model } = editFormState.value
  const config = isEdit
    ? updateRole((model as Item).id, params)
    : addRole(params as Group.AddParams)
  const [, data] = await smartfetch<boolean | number>(config)
  if (data) {
    message.success('提交成功！')
    onEditDrawerClose()
    refresh.value = true
  }
}

const onEditDrawerClose = () => {
  editFormState.value = { visible: false }
}

getRightOptions()
</script>
<script lang="ts">
export default { name: 'RoleListPage' }
</script>
<template>
  <div class="sw-list-page role-list-page">
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
    <simple-form
      modal="drawer"
      v-model="editFormData"
      :visible="editFormState.visible"
      sync-model-value
      :field-items="editFormItems"
      :props="editFormProps"
      :modal-props="editModalProps"
      @no-request-submit="sendGroupInfo"
      @cancel="onEditDrawerClose"
      @close="onEditDrawerClose"
    ></simple-form>
  </div>
</template>

<style lang="scss" scoped></style>
