<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  FormFields,
  FormBtns,
  createFFIRulesProps,
  createInputFormItem,
  createRadioGroupFormItem
} from '@wxhccc/ue-antd-vue'
import { regexRuleCreator } from '@/utils/validate'
import { pick } from 'lodash-es'
import { useCommonForm } from '@/common/hooks'
import { useAppStore } from '@/store'

export type TreeItem = SystemSettings.Rights.TreeItem

export type FormParams = SystemSettings.Rights.AddParams | SystemSettings.Rights.EditParams

export interface CompProps {
  isEdit?: boolean
  editing?: boolean
  parent?: TreeItem
  node?: TreeItem
  flatTreeMap?: Record<string, TreeItem>
}

const props = defineProps<CompProps>()

const emit = defineEmits(['save', 'cancel'])

const { form, formData, formProps } = useCommonForm<FormParams>()

const store = useAppStore()

const showForm = computed(() => props.node || (props.editing && !props.isEdit))

const hasChildren = computed(() => !!props.node?.children?.length)

const isChildPoint = computed(() => hasChildren.value && (props.node?.children as TreeItem[])[0].type)

const parentName = computed(() => {
  const { isEdit, node, parent, flatTreeMap } = props
  if (parent) {
    return parent.title
  } else if (node && flatTreeMap && flatTreeMap[node.pid]) {
    return flatTreeMap[node.pid].title
  }
  return '无'
})

const lockType = computed(() => {
  const { node, parent, isEdit } = props
  return isEdit
})

const lockState = computed(() => !!formData.value.type)

// const indexField = computed(() => {
//   if (!props.isEdit || !hasChildren.value || lockState.value) return false
//   const children = tree2array(props.data.children)
//   const menuChildren: any[] = []
//   children.forEach(child => {
//     child.isMenu && menuChildren.push({ value: child.key, label: child.name })
//   })
//   return createSelectFormItem('重定向KEY', 'index', menuChildren, '请选择子孙菜单')
// })

const fieldItems = computed(() => {
  const { editing, isEdit } = props
  const typeFieldOpts = { props: { class: 'right-type-field', disabled: !editing || lockType.value } }
  const { type } = formData.value
  const { commonState } = store.appDictConfig
  const keyWord = type ? '关键字' : '路由Name'
  return [
    createInputFormItem('父级名称', 'parentName', '', { text: parentName.value }),
    createRadioGroupFormItem(
      '类型',
      'type',
      [
        { label: '菜单', value: 0 },
        { label: '权限点', value: 1 }
      ],
      typeFieldOpts
    ),
    createInputFormItem(createFFIRulesProps('名称', true), 'title', { placeholder: '用于展示菜单/权限点名称的文字', disabled: !editing }),
    createInputFormItem(
      createFFIRulesProps(keyWord, true),
      'key',
      { placeholder: `请输入${keyWord}`, disabled: !editing }
    ),
    // ...(indexField.value ? [indexField.value] : []),
    ...(type === 0
      ? [
          createInputFormItem('图标', 'icon', {
            placeholder: '菜单图标',
            maxlength: 40,
            disabled: !editing
          })
        ]
      : []),
    // createInputFormItem(
    //   createFFIRulesProps('绑定APIS', false, [arrStrRule]),
    //   'routes',
    //   'API路由名, 多个用英文逗号(,)分隔'
    // ),
    createRadioGroupFormItem(
      '状态',
      'state',
      commonState as Common.SelectOption[],
      { disabled: !editing }
    )
  ]
})

const initFormData = () => {
  if (props.node) {
    formData.value = pick(props.node, ['id', 'icon', 'index', 'key', 'type', 'title', 'state'])
  } else {
    const curTime = Math.floor(+new Date() / 1000)
    const { parent } = props
    const type = isChildPoint.value ? 1 : 0
    formData.value = {
      pid: parent ? parent.id : 0,
      key: '',
      title: '',
      type,
      state: 1,
      icon: '',
      index: '',
      orderValue: curTime
    }
  }
}
/** events **/
const submitHandler = () => {
  emit('save', formData.value)
}
const cancelHandler = () => emit('cancel')

watch(() => [props.node, props.parent], initFormData)

initFormData()
</script>
<template>
  <div class="swcomp-right-form-card">
    <a-form
      v-show="showForm"
      ref="form"
      :model="formData"
      v-bind="formProps"
    >
      <form-fields :items="fieldItems" v-model="formData"></form-fields>
      <a-form-item class="form-btns-pane line-form-item" label=" " :colon="false">
        <form-btns
          v-if="editing"
          is-edit
          :form="form"
          is-validate
          :texts="{ sureBtn: '确定' }"
          :cancel="cancelHandler"
          :submit="submitHandler"
        >
        </form-btns>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss">
.swcomp-right-form-card {
  height: 100%;
  overflow: auto;

  .ue-form-fields {
    margin-top: 10px;

    .form-btns-pane {
      margin-bottom: 0;
    }

    .right-type-field .el-radio-button__inner {
      width: 100px;
    }
  }
}
</style>
