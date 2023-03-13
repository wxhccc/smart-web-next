<template>
  <simple-form
    v-model="formData"
    is-modal
    class="pwd-form"
    sync-model-value
    :field-items="fieldItems"
    :request="modifyPwd"
    :success-skip="loginOut"
  ></simple-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createInputFormItem, createFFIRulesProps } from '@/common'
import SimpleForm from '@/common/components/SimpleForm'
import { regexRuleCreator } from '@/utils/validate'
import { passwordsFormItem } from '@/common/components/formItems/Passwords'
import { modifyPwd } from '@/api/user'
import { FormFieldsItem } from '@/components/form-fields/types'
import { message } from 'ant-design-vue'

const pwdFormatRule = {
  props: {
    rules: [regexRuleCreator('password', '密码格式有误，密码需要包含大写字母，小写字母和数字，长度为8-20位')]
  }
}

export default defineComponent({
  name: 'ModifyPwd',
  components: {
    SimpleForm
  },
  data() {
    return {
      formData: { newPassword: '', password: '', confirmPassword: '' } as User.ModifyPwdParams,
      modifyPwd
    }
  },
  computed: {
    fieldItems(): FormFieldsItem[] {
      return [
        createInputFormItem(createFFIRulesProps('原密码'), 'password', {
          placeholder: '请输入原密码',
          type: 'password',
          autoComplete: 'new-password'
        })
      ].concat(
        passwordsFormItem({ password: 'newPassword', confirmPwd: 'confirmPassword' }, true, this.formData, {
          password: pwdFormatRule,
          confirmPwd: pwdFormatRule
        })
      )
    }
  },
  methods: {
    loginOut() {
      message.warning('修改成功，需重新登录', () => {
        this.$store.dispatch('logout')
      })
    }
  }
})
</script>
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
