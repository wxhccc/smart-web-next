import { ref, computed, ComputedRef } from 'vue'
import { TreeField, createInputFormItem, ActionBtnItem, createFormFieldItem, TreeFiledProps } from '@wxhccc/ue-antd-vue'
import { createTableColumn, createDateTableColumn } from '@/common'
import { useAppStore } from '@/store'
import { descriptionFormItem, nameFormItem } from '@/common/data/form-items'

export interface RightItem {
  id: number
  pid: number
  title: string
  children?: RightItem[]
}

// 生成页面table列数据
export const useListPageData = (actions: ComputedRef<ActionBtnItem[]>) => {
  const store = useAppStore()

  const rightsOptions = ref<RightItem[]>([])
  
  // 生成页面搜索表单项数据
  const searchFormItems = [
    createInputFormItem('名称', 'account', '请输入名称')
  ]

  const searchForm = computed(() => ({ items: searchFormItems }))

  const tableColumns = computed(() => [
    createTableColumn('名称', 'name'),
    createTableColumn('说明', 'description'),
    createDateTableColumn('创建时间', 'createdAt'),
    { title: '操作', minWidth: 180, actions: actions.value }
  ])

  const editFormItems = computed(() => {
    return [
      nameFormItem(),
      descriptionFormItem(),
      createFormFieldItem(TreeField, '权限', 'rightIds', { props: { data: rightsOptions.value, fieldNames: { key: 'id', title: 'name' } } })
    ]
  })

  return { rightsOptions, searchFormItems, searchForm, tableColumns, editFormItems }
}
