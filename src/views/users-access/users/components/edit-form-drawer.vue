<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { createInputFormItem, createSelectFormItem, createFFIRulesProps } from '@wxhccc/ue-antd-vue'
import { pick } from 'lodash-es'
import SimpleForm from '@/components/simple-form'
import { useAppStore } from '@/store'
import { addUser, updateUser } from '@/api/access'
import { createTelphoneFormItem } from '@/common/components/form-items'
import { useCommonForm } from '@/common/hooks'
import { useAccessRolesOptions } from '@/common/hooks/get-options'
import { smartfetch } from '@/utils'
import { encrptedPassword } from '@/utils/auth'

export interface CompProps extends Common.ModalProps<User.Item> {
  isEdit?: boolean
}

type FormParams = User.EditParams

const props = defineProps<CompProps>()

const emit = defineEmits(['close'])

const store = useAppStore()

const { formData, formProps, colProps } = useCommonForm<FormParams>({ dataStrategy: 0 })

formProps.value = colProps([6, 16])

const modalProps = computed(() => ({ title: props.isEdit ? '编辑用户' : '新增用户' }))

const { options: roleOptions } = useAccessRolesOptions()

const formItems = computed(() => {
  const { isEdit } = props
  const { dataStrategy } = store.appConfig
  return [
    createInputFormItem(
      createFFIRulesProps('账号', true),
      'account',
      isEdit ? { disabled: true } : '请输入账号，仅支持字母和数字'
    ),
    createInputFormItem('昵称', 'nick', '请输入账号昵称，缺省时将用账号名替代'),
    createInputFormItem(createFFIRulesProps('密码', !isEdit), 'password', { type: 'password' }),
    createSelectFormItem('角色', 'roleIds', roleOptions.value, {
      multiple: true,
      filterable: true,
      placeholder: '请选择角色'
    }),
    createSelectFormItem(
      createFFIRulesProps('数据访问权限', '请选择数据访问权限'),
      'dataStrategy',
      dataStrategy as Common.SelectOption[],
      { initValue: 0 }
    ),
    createTelphoneFormItem('telphone', false)
  ]
})

const sendUserInfo = async (params: FormParams) => {
  const { isEdit, model } = props
  if (params.password) {
    params.password = encrptedPassword(params.password)
  }
  const config = isEdit ? updateUser((model as User.Item).id, params) : addUser(params as User.AddPrams)
  const [err, data] = await smartfetch<boolean>(config)
  if (err) {
    throw err
  } else {
    return data
  }
}

const onClose = () => {
  emit('close')
}

watch(
  () => props.model,
  () => {
    const { model, isEdit } = props
    formData.value = isEdit ? pick(model, ['account', 'nick', 'roleIds', 'telphone', 'dataStrategy']) : {}
  }
)
</script>

<template>
  <simple-form
    modal="drawer"
    :field-items="formItems"
    :props="formProps"
    :modal-props="modalProps"
    :request="sendUserInfo"
    :success-skip="onClose"
    :cancel-skip="onClose"
  ></simple-form>
</template>
