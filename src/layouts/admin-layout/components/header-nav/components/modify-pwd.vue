<script setup lang="ts">
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'
import { createInputFormItem, createFFIRulesProps } from '@wxhccc/ue-antd-vue'
import SimpleForm from '@/components/simple-form'
import { regexRuleCreator } from '@/utils/validate'
import { passwordsFormItem } from '@/common/data/form-items'
import { modifyPwd } from '@/api/user'
import { useUserStore } from '@/store'
import { encrptedPassword } from '@/utils/auth'

const pwdFormatRule = {
  props: {
    rules: [regexRuleCreator('password', '密码格式有误，密码需要包含大写字母，小写字母，数字和特殊字符，长度为8-32位')]
  }
}
const store = useUserStore()

const formData = ref<User.ModifyPwdParams>({ newPassword: '', password: '', confirmPassword: '' })

const fieldItems = computed(() => [
  createInputFormItem(createFFIRulesProps('原密码'), 'password', {
    placeholder: '请输入原密码',
    type: 'password',
    autoComplete: 'new-password'
  })
].concat(
  passwordsFormItem({ password: 'newPassword', confirmPwd: 'confirmPassword' }, true, formData.value, {
    password: pwdFormatRule,
    confirmPwd: pwdFormatRule
  })
))

const onModifyPwd = async (params: User.ModifyPwdParams) => {
  const { password, newPassword } = params
  const [err, data] = await modifyPwd({
    password: encrptedPassword(password),
    newPassword: encrptedPassword(newPassword)
  })
  if (err) {
    throw err
  }
  return data
}

const onLoginOut = () => {
  message.warning('修改成功，需重新登录').then(() => {
    store.logout()
  })
}
</script>

<template>
  <simple-form
    v-model="formData"
    is-modal
    class="pwd-form"
    sync-model-value
    :field-items="fieldItems"
    :request="onModifyPwd"
    :success-skip="onLoginOut"
  ></simple-form>
</template>

<style lang="scss" scoped>
.pwd-modify-page {
  .pwd-form {
    margin-left: 20px;
    padding-top: 12px;
    width: 800px;
  }
  .submit-btn {
    width: 100%;
    margin-bottom: 30px;
  }
}
</style>
