import { ref, computed, ComputedRef, h } from 'vue'
import { ModalProps } from 'ant-design-vue'
import { createInputFormItem, ActionBtnItem } from '@wxhccc/ue-antd-vue'
import { createTableColumn, createDateTableColumn } from '@/common'
import { useAppStore } from '@/store'
import { useStoreSwitchFilter } from '@/common/hooks'
import { createDotStatusRender } from '@/common/data/table-columns'
import { nameFormItem } from '@/common/data/form-items'

export interface TreeItem extends Group.Item {
  parent?: TreeItem
  children?: TreeItem[]
}

export interface EditFormState extends Common.ModalProps<TreeItem> {
  isEdit?: boolean
  parent?: TreeItem
}

export type FormParams = Group.EditParams

// 生成页面table列数据
export const useListPageData = (actions: ComputedRef<ActionBtnItem[]>) => {
  const store = useAppStore()

  const searchParams = ref({ name: '' })

  const editFormState = ref<EditFormState>({ visible: false })

  const [stateFilter] = useStoreSwitchFilter(['enable'])

  // 生成页面搜索表单项数据
  const searchFormItems = [createInputFormItem('名称', 'name', '请输入')]

  const searchForm = computed(() => ({ items: searchFormItems }))

  const tableColumns = computed(() => [
    createTableColumn('名称', 'name', {
      minWidth: 320,
      customRender: ({ text }) => {
        const { name } = searchParams.value
        if (name && text.includes(name)) {
          const words = (text as string).split(name)
          return words.reduce((acc, cur, index) => {
            acc.push(cur)
            if (index != words.length - 1) {
              acc.push(h('span', { class: 'match-words' }, [name]))
            }
            return acc
          }, [] as any[])
        }
        return text
      }
    }),
    createTableColumn(
      '状态',
      'state',
      createDotStatusRender(stateFilter, { 1: 'success', 0: 'error' })
    ),
    createDateTableColumn('创建时间', 'createdAt'),
    { title: '操作', minWidth: 240, actions: actions.value }
  ])

  const parentName = computed(() => {
    const { parent } = editFormState.value || {}
    return parent?.name || '无'
  })

  const editFormItems = computed(() => {
    return [
      createInputFormItem('父用户组', 'parentName', '', { text: parentName.value }),
      nameFormItem()
    ]
  })

  const editModalProps = computed<Partial<ModalProps>>(() => ({ title: editFormState.value.isEdit ? '编辑用户组' : '新增用户组' }))

  return {
    searchParams,
    searchFormItems,
    searchForm,
    tableColumns,
    editFormState,
    editFormItems,
    editModalProps
  }
}
