<template>
  <a-dropdown class="comp-user-center-module">
    <div class="avatar-pane">
      <div v-if="userInfo.avatar" class="user-avatar">
        <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="" />
        <user-outlined v-else />
      </div>
      <span v-if="userInfo.name" class="user-nick">
        {{ userInfo.name }}
      </span>
      <down-outlined />
      <modify-pwd v-if="pwdModalShow" v-model:visible="pwdModalShow" title="修改密码"></modify-pwd>
    </div>
    <template #overlay>
      <a-menu class="header-dropdown-menu-pane">
        <router-link :to="{ name: 'AdminIndex' }">
          <a-menu-item>首页</a-menu-item>
        </router-link>
        <a-menu-item @click="onChangePwd">修改密码</a-menu-item>
        <a-menu-divider />
        <a-menu-item>
          <div @click="onLogout">退出登录</div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent } from 'vue'
import { mapState } from 'pinia'
import { useUserStore } from '@/store'

export default defineComponent({
  name: 'UserCenterModule',
  components: {
    ModifyPwd: defineAsyncComponent(() => import('./modify-pwd.vue'))
  },
  setup() {
    const pwdModalShow = ref(false)
    const store = useUserStore()

    const onChangePwd = () => {
      pwdModalShow.value = true
    }

    const onLogout = () => {
      store.logout()
    }

    return { store, pwdModalShow, onChangePwd, onLogout }
  },
  computed: {
    ...mapState(useUserStore, ['userInfo'])
  }
})
</script>
<style lang="scss" scoped>
.comp-header-nav .avatar-pane {
  display: flex;
  align-items: center;
  cursor: pointer;
  .user-avatar {
    margin: 0 8px;
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 50%;
    line-height: 32px;
    text-align: center;
    background-color: #eaeaea;
  }
  .user-nick {
    line-height: 32px;
    padding: 0 8px;
  }
  .a-icon-caret-bottom {
    font-size: 12px;
  }
}
.comp-user-center-module {
  position: relative;
  height: 100%;
}
.header-dropdown-menu-pane {
  min-width: 120px;
  z-index: 10000;
}
</style>
