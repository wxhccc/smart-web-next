<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { Cascader } from 'ant-design-vue'
import {
  createInputFormItem,
  createSelectFormItem,
  createFFIRulesProps,
  createFormFieldItem
} from '@wxhccc/ue-antd-vue'
import { isFunction, pick } from 'lodash-es'
import SimpleForm from '@/components/simple-form'
import { useAppStore } from '@/store'
import { addUser, updateUser } from '@/api/access'
import { telphoneFormItem } from '@/common/data/form-items'
import { useCommonForm } from '@/common/hooks'
import { useAccessGroupsOptions, useAccessRolesOptions } from '@/common/hooks/get-options'
import { smartfetch } from '@/utils'
import { encrptedPassword } from '@/utils/auth'
import { editFormModalProps } from '@/common/utils'

export interface CompProps extends Common.ModalProps<User.Item> {
  isEdit?: boolean
}

type FormParams = User.EditParams

const props = defineProps(editFormModalProps())

const emit = defineEmits<{
  (e: 'close', success?: boolean): void
}>()

const attrs = useAttrs()

const store = useAppStore()

const { formData, formProps, colProps } = useCommonForm<FormParams>({ dataStrategy: 0 })

formProps.value = colProps([6, 16])

const modalProps = computed(() => ({ title: props.isEdit ? '编辑用户' : '新增用户' }))

const { options: roleOptions } = useAccessRolesOptions()

const { options: groupOptions } = useAccessGroupsOptions()

const formItems = computed(() => {
  const { isEdit } = props
  const { dataStrategy } = store.appDictConfig
  return [
    createInputFormItem(
      createFFIRulesProps('账号', true),
      'account',
      isEdit ? { disabled: true } : '请输入账号，仅支持字母和数字'
    ),
    createInputFormItem('昵称', 'nick', '请输入账号昵称，缺省时将用账号名替代'),
    createInputFormItem(createFFIRulesProps('密码', !isEdit), 'password', { type: 'password' }),
    createSelectFormItem('角色', 'roleIds', roleOptions.value, {
      mode: 'multiple',
      showSearch: true,
      placeholder: '请选择角色'
    }),
    createFormFieldItem(Cascader, '所属用户组', 'groupId', {
      options: groupOptions.value,
      placeholder: '请选择用户组'
    }),
    createSelectFormItem(
      createFFIRulesProps('数据访问权限', '请选择数据访问权限'),
      'dataStrategy',
      dataStrategy as Common.SelectOption[],
      { initValue: 0 }
    ),
    telphoneFormItem('telphone', false)
  ]
})

const sendUserInfo = async (params: FormParams) => {
  const { isEdit, model } = props
  if (params.password) {
    params.password = encrptedPassword(params.password)
  }
  const config = isEdit
    ? updateUser((model as User.Item).id, params)
    : addUser(params as User.AddParams)
  const [err, data] = await smartfetch<boolean>(config)
  if (err) {
    throw err
  } else {
    return data
  }
}

const onSendSuccess = () => {
  onClose(true)
}

const onClose = (success?: boolean) => {
  emit('close', success)
}

watch(
  () => props.model,
  () => {
    const { model, isEdit } = props
    formData.value = isEdit
      ? pick(model, ['account', 'nick', 'roleIds', 'telphone', 'dataStrategy'])
      : {}
  }
)
</script>

<template>
  <simple-form
    modal="drawer"
    v-model="formData"
    sync-model-value
    :field-items="formItems"
    :props="formProps"
    :modal-props="modalProps"
    :request="sendUserInfo"
    :success-skip="onSendSuccess"
    :cancel-skip="onClose"
    @close="() => onClose()"
  ></simple-form>
</template>
