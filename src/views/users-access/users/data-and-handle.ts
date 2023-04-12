import { computed, ComputedRef } from 'vue'
import { createInputFormItem, createSelectFormItem, ActionBtnItem } from '@wxhccc/ue-antd-vue'
import { createArrayTextTableColumn, createTableColumn, createDateTableColumn } from '@/common'
import { useAppStore } from '@/store'
import { useStoreSwitchFilter } from '@/common/hooks'
import { createDotStatusRender } from '@/common/data/table-columns'
import { daterangeFormItem } from '@/common/data/form-items'

// 生成页面table列数据
export const useListPageData = (actions: ComputedRef<ActionBtnItem[]>) => {
  const store = useAppStore()

  const [stateFilter] = useStoreSwitchFilter(['accountState'])
  const { accountState } = store.appDictConfig

  // 生成页面搜索表单项数据
  const searchFormItems = [
    createInputFormItem('账号', 'account', '请输入账号，支持模糊搜索'),
    createSelectFormItem('状态', 'state', accountState as Common.SelectOption[], '请选择'),
    daterangeFormItem('创建时间', '')
  ]

  const searchForm = computed(() => ({ items: searchFormItems }))

  const tableColumns = computed(() => [
    createTableColumn('账号', 'account'),
    createTableColumn('昵称', 'nick'),
    createArrayTextTableColumn('角色', 'roleNames'),
    createTableColumn('创建者', 'creator'),
    createDateTableColumn('创建时间', 'createdAt'),
    createTableColumn(
      '状态',
      'state',
      createDotStatusRender(stateFilter, { 1: 'success', 0: 'error' })
    ),
    { title: '操作', minWidth: 180, actions: actions.value }
  ])

  return { searchFormItems, searchForm, tableColumns }
}
