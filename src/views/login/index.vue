<script setup lang="ts">
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { FormFields, FormBtns, createFFIRulesProps, createInputFormItem } from '@wxhccc/ue-antd-vue'
import { login } from '@/api/auth'
import { useUserStore } from '@/store'
import { smartfetch } from '@/utils'

const store = useUserStore()
const router = useRouter()
const form = ref()

const loginForm = ref({
  username: '',
  password: '',
  captcha: ''
})
const sending = ref(false)
const verifyCodeKey = ref(+new Date())

const fieldItems = ref([
  createInputFormItem(createFFIRulesProps('', true), 'username', {
    placeholder: '账号',
    maxLength: 40,
    size: "large",
    slots: {
      prefix: () => [h(UserOutlined)]
    }
  }),
  createInputFormItem(createFFIRulesProps('', true), 'password', {
    placeholder: '密码',
    type: 'password',
    size: "large",
    slots: {
      prefix: () => [h(LockOutlined)]
    }
  }),
  // createInputFormItem(createFFIRulesProps('', true), 'captcha', {
  //   placeholder: '验证码',
  //   type: 'captcha',
  //   size: "large",
  //   slots: {
  //     prefix: () => [h(SafetyOutlined)],
  //     suffix: () => [h(VerifyCodeImage, { key: verifyCodeKey.value })]
  //   }
  // })
])

const loginSend = async () => {
  const params = { ...loginForm.value }
  const [err, data] = await smartfetch<Auth.AccessInfo>(login(params))
  if (err) {
    verifyCodeKey.value = +new Date()
    return
  }
  // const data = { token: 'xxxxxxxx' } as Auth.AccessInfo
  if (data && data.token) {
    store.loginIn(data)
    router.push({ name: 'AdminIndex' })
  }
}
</script>
<script lang="ts">
export default { name: 'Login' }
</script>

<template>
  <div class="login-page">
    <div class="middle-pane">
      <div class="left-image-pane">
      </div>
      <div class="login-form-pane">
        <a-form ref="form" class="login-form sw-common-form" layout="vertical" :model="loginForm">
          <div class="login-pane"></div>
          <form-fields v-model="loginForm" :items="fieldItems" />
          <form-btns
            class="submit-btn"
            size="large"
            submit-only
            is-validate
            :form="form"
            :btn-props="{ block: true }"
            :sending="sending"
            :submit="loginSend"
          ></form-btns>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login-page {
  @include flex-block(column, center);
  width: 100%;
  height: 100%;
  background: url('./images/login-page-bg.png') no-repeat center center / cover;

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }

  .middle-pane {
    @include flex-block;
    width: 62.5%;
    height: 62%;
    min-width: 880px;
    min-height: 300px;
    max-height: 500px;
    box-shadow: 0px 3px 7px 0px rgba(51, 136, 255, 0.7);
  }

  .left-image-pane {
    @include flex-block(column, center);
    flex: 1;
    height: 100%;
    overflow: hidden;
    background-color: #ffffff;

    img {
      width: 80%;
    }
  }

  .login-form-pane {
    @include flex-block(column, center);
    width: 45%;
    height: 100%;
    background-color: #f6f8f8;
    z-index: 2000;
  }

  .img-title {
    height: 140px;
  }

  .login-form {
    @include flex-block(column);
    width: 72%;
    min-width: 300px;
    height: 360px;
  }

  .login-pane {
    flex: 1;
    width: 70%;
    margin-left: 15%;

    img {
      width: 100%;
    }
  }

  .ue-form-fields {
    .ue-common-field {
      border-width: 0 0 1px 0 !important;
      background: none;
      box-shadow: none;

      .anticon {
        color: #aeaeae;
      }

      .ant-input {
        background-color: transparent !important;

        &:webkit-internal-autofill-selected {
          background-color: transparent;
        }
      }
    }
  }

  .verify-code-image {
    height: 26px;
  }

  .submit-btn {
    width: 100%;
    margin: 56px auto 30px;
    box-shadow: 0 12px 12px -10px var(--theme-color);
  }
}
</style>
