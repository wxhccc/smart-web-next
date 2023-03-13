<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { Modal, TreeProps } from 'ant-design-vue'
import {
  getNonStaticRights,
  createNonStaticRights,
  updateNonStaticRights,
  deleteNonStaticRights
} from '@/api/system'
import { tree2array } from '@wxhccc/es-util'
import DetailPageContainer from '@/components/detail-page-container'
import { AntTreeNodeDropEvent } from 'ant-design-vue/es/tree'
import RightEditForm, {
  TreeItem,
  FormParams,
  CompProps as RightEditFormProps
} from './components/right-edit-form.vue'
import { smartfetch } from '@/utils'

type EditParams = SystemSettings.Rights.EditParams

const rightsTree = ref<TreeItem[]>([])
const selectedKeys = ref<App.StrOrNum[]>([])
const sending = ref(false)
const editFormState = ref<RightEditFormProps>({ editing: false })

const treeProps = computed<Partial<TreeProps>>(() => ({
  fieldNames: { key: 'id' },
  draggable: true,
  defaultExpandAll: true,
  blockNode: true
}))

const flatTreeMap = computed(
  () => tree2array(rightsTree.value, { returnObject: true }) as Record<string, TreeItem>
)

/** utils **/
const checkParentPropFalsy = (node: TreeItem, prop: keyof TreeItem = 'state') => {
  let curNode = node
  while (curNode[prop]) {
    const parent = flatTreeMap.value[curNode.pid]
    if (parent) {
      curNode = parent
    } else {
      return false
    }
  }
  return true
}

// 获取权限树
const getRights = async () => {
  const [, data] = await smartfetch<TreeItem[]>(getNonStaticRights())
  rightsTree.value = data ? data : []
}
// 权限表单暂存处理
const onRightItemEdit = async (newItem: FormParams) => {
  const { isEdit, parent, node } = editFormState.value
  const params = newItem as EditParams
  const [, data] = await smartfetch<boolean | number>(
    isEdit && node
      ? updateNonStaticRights(node.id, params)
      : createNonStaticRights(params as SystemSettings.Rights.AddParams)
  )
  if (data) {
    editFormClose()
    getRights()
  }
}
const deleteRightItem = async (id: number) => {
  const [, data] = await smartfetch(deleteNonStaticRights(id))
  if (data) {
    getRights()
  }
}

const addNode = (parent?: TreeItem) => {
  editFormState.value = { editing: true, parent }
  selectedKeys.value = []
}

const selectNodeWhenAction = (id: number) => {
  if (!selectedKeys.value.length) {
    onNodeSelect(id)
  }
}
const editNode = (node: TreeItem) => {
  const { id } = node
  selectNodeWhenAction(id)
  Object.assign(editFormState.value, { isEdit: true, editing: true })
}

// 删除节点，原始节点标记为删除，新节点直接删除
const deleteNode = (node: TreeItem) => {
  const { id } = node
  selectNodeWhenAction(id)
  Modal.confirm({
    title: '系统提示',
    content: '删除后此菜单及其子菜单或权限无法恢复，是否继续？',
    onOk: () => deleteRightItem(id)
  })
}
// 关闭编辑表单
const editFormClose = () => {
  editFormState.value.editing = false
}
const onNodeSelect = (key: App.StrOrNum) => {
  const [id] = selectedKeys.value
  const keys = id === key ? [] : [key]
  selectedKeys.value = keys
  editFormState.value.editing = false
  const [newId] = selectedKeys.value
  editFormState.value.node = newId ? flatTreeMap.value[newId] : undefined
}

const updateItemOrderOrParent = async (item: TreeItem, params: EditParams) => {
  const [err] = await smartfetch<boolean>(updateNonStaticRights(item.id, params))
  if (err) {
    getRights()
  } else {
    Object.assign(item, params)
  }
}

// 处理拖拽节点放下
const handleNodeDrop = (info: AntTreeNodeDropEvent) => {
  const { dropToGap, dragNode, node } = info
  const dragItem = dragNode.dataRef as TreeItem
  const dropItem = node.dataRef as TreeItem
  // 权限点不能添加子节点
  if (dropItem.type === 1 && !dropToGap) {
    return
  }
  // 仅变更排序
  const dropKey = node.key
  const dragKey = dragNode.key
  const dropPos = (node.pos || '').split('-')
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
  const loop = (data: TreeItem[], key: string | number, callback: (item: TreeItem, index: number, arr: TreeItem[]) => void) => {
    data.forEach((item, index) => {
      if (item.id === key) {
        return callback(item, index, data)
      }
      if (item.children) {
        return loop(item.children, key, callback)
      }
    })
  }
  const treeData = [...rightsTree.value]

  let dragObj = {} as TreeItem
  const params = { id: dragKey } as EditParams
  loop(treeData, dragKey, (item, index, arr) => {
    arr.splice(index, 1)
    dragObj = item
  })
  const checkParentChange = () => {
    if (dragNode.parent?.key !== dropKey) {
      params.pid = dropKey as number
    }
  }

  if (!dropToGap) {
    // Drop on the content
    loop(treeData, dropKey, (item) => {
      item.children = item.children || []
      /// where to insert 示例添加到头部，可以是随意位置
      item.children.unshift(dragObj)
      if (item.children.length > 1) {
        params.orderValue = item.children[1].orderValue - 100
      }
      checkParentChange()
    })
  } else if (
    (node.children || []).length > 0 && // Has children
    node.expanded && // Is expanded
    dropPosition === 1 // On the bottom gap
  ) {
    loop(treeData, dropKey, (item) => {
      item.children = item.children || []
      // where to insert 示例添加到头部，可以是随意位置
      item.children.unshift(dragObj)
      if (item.children.length > 1) {
        params.orderValue = item.children[1].orderValue - 100
      }
    })
    checkParentChange()
  } else {
    let ar: TreeItem[] = []
    let i = 0
    loop(treeData, dropKey, (_item, index, arr) => {
      ar = arr
      i = index
    })
    if (i === ar.length - 1) {
      params.orderValue = ar[ar.length - 1].orderValue + 100
    } else {
      params.orderValue = Math.round((ar[i]?.orderValue || 0 + ar[i + 1]?.orderValue || (+new Date()/1000))/2)
    }
    if (dropPosition === -1) {
      ar.splice(i, 0, dragObj)
    } else {
      ar.splice(i + 1, 0, dragObj)
    }
  }
  rightsTree.value = treeData

  updateItemOrderOrParent(dragObj, params)
}

getRights()
</script>
<script lang="ts">
export default { name: 'SystemRights' }
</script>
<template>
  <detail-page-container class="system-right-page fixed" :cols-num="2" :col-props="10" full-height>
    <div class="rights-tree-pane sw-flex-two">
      <div class="title-pane">
        <span><b>权限列表</b></span>
        <div class="action-buttons fr">
          <a-button class="add-btn" size="small" @click="addNode()">
            <template #icon>
              <plus-outlined />
            </template>
          </a-button>
        </div>
      </div>
      <div class="tree-pane sw-flex-auto">
        <a-tree
          v-if="rightsTree.length"
          class="rights-tree"
          ref="treeRef"
          :selected-keys="selectedKeys"
          :tree-data="rightsTree"
          v-bind="treeProps"
          @drop="handleNodeDrop"
        >
          <template #title="{ data, title }">
            <div :class="['right-node', data.type === 0 ? 'menu-node' : 'point-node']">
              <menu-outlined v-if="data.type === 0" />
              <key-outlined v-else />
              <span
                :class="['node-name', { 'is-disabled': checkParentPropFalsy(data) }]"
                @click="() => onNodeSelect(data.id)"
              >
                <stop-outlined />
                {{ title }}
              </span>
              <div class="operation-btns">
                <a-button
                  v-if="data.type === 0"
                  type="link"
                  size="small"
                  @click="() => addNode(data)"
                >
                  <template #icon>
                    <plus-outlined />
                  </template>
                </a-button>
                <a-button type="link" size="small" @click="() => editNode(data)">
                  <template #icon>
                    <edit-outlined />
                  </template>
                </a-button>
                <a-button type="link" size="small" danger @click="() => deleteNode(data)">
                  <template #icon>
                    <delete-outlined />
                  </template>
                </a-button>
              </div>
            </div>
          </template>
        </a-tree>
      </div>
    </div>
    <template #right>
      <right-edit-form
        class="right-form-pane"
        v-bind="editFormState"
        @cancel="editFormClose"
        @save="onRightItemEdit"
      >
      </right-edit-form>
    </template>
  </detail-page-container>
</template>

<style lang="scss">
.system-right-page {
  height: 100%;

  .ant-col {
    height: 100%;
  }
  .title-pane {
    line-height: 30px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--light-grey);
  }

  .content-col {
    position: relative;
  }

  .rights-tree-pane {
  }

  .save-btn {
    margin-right: 54px;
  }

  .rights-tree {
    margin: 10px 17px 17px 0;

    .right-node {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .node-type-icon {
      margin-right: 12px;
    }

    .node-name {
      flex: 1;
      margin-left: 8px;
      overflow: hidden;
      .anticon {
        display: none;
        margin-right: 2px;
      }

      &.is-disabled {
        color: #999999;

        .anticon {
          display: inline;
        }
      }
    }

    .menu-node {
    }

    .point-node {
    }
  }
}
</style>
