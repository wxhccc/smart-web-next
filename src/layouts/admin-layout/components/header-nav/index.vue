<template>
  <div class="comp-header-nav">
    <div class="header-bar">
      <div class="menu-explode-btn" @click="isCollapse = !isCollapse">
        <menu-unfold-outlined v-if="isCollapse" />
        <menu-fold-outlined v-else />
      </div>
    </div>
    <!-- <a-tooltip effect="dark" content="全屏" placement="bottom">
      <screenfull class="screenfull right-menu-item"></screenfull>
    </a-tooltip> -->
    <user-center-module />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { useAppStore } from '@/store'
import UserCenterModule from './components/user-center-module.vue'

export default defineComponent({
  name: 'HeaderNav',
  components: {
    UserCenterModule,
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },
  setup() {
    const store = useAppStore()
    const isCollapse = computed({
      get: () => !store.sidebar.opened,
      set: (value: boolean) => {
        store.toggleSidebar({ value: !value })
      }
    })
    return { isCollapse }
  }
})
</script>

<style lang="scss">
.comp-header-nav {
  height: 100%;
  display: flex;
  .header-bar {
    flex: 1;
  }
  .menu-explode-btn {
    width: 60px;
    font-size: 18px;
  }
}
</style>
