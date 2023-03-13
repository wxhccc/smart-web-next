<template>
  <a-layout class="app-wrapper app-admin-layout">
    <a-layout-sider
      class="app-side-menu"
      collapsible
      :collapsed="!sidebar.opened"
      :collapsed-width="62"
      breakpoint="lg"
      :theme="sidebar.theme"
      :trigger="null"
      @breakpoint="checkNeedCollapse"
    >
      <sidebar></sidebar>
    </a-layout-sider>
    <a-layout class="app-main-container">
      <a-layout-header class="app-nav-header">
        <header-nav></header-nav>
      </a-layout-header>
      <a-layout :class="['app-page-container', pageClassName]">
        <breadcrumb-nav />
        <a-layout-content class="app-main-pane">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { HeaderNav, Sidebar, BreadcrumbNav } from './components'
// import { websocketListen } from '@/mixins'
import { kebabCase } from 'lodash-es'
import { useAppStore } from '@/store'

export default defineComponent({
  name: 'AdminLayout',
  components: {
    HeaderNav,
    Sidebar,
    BreadcrumbNav
  },
  setup() {
    const store = useAppStore()

    const sidebar = computed(() => store.sidebar)

    const checkNeedCollapse = (broken: boolean) => {
      if (broken && store.sidebar.opened) {
        store.toggleSidebar({ value: false, breakpoint: true })
      } else if (!broken && !store.sidebar.opened && store.sidebar.lastOpenState) {
        store.toggleSidebar({ value: true, breakpoint: true })
      }
    }
    return { sidebar, checkNeedCollapse }
  },
  computed: {
    pageClassName() {
      const { name } = this.$route
      return name ? `${kebabCase(name as string)}-container` : ''
    }
  }
})
</script>

<style lang="scss" scoped>
.app-admin-layout {
  position: relative;
  width: 100%;
  height: 100%;
  .app-nav-header {
    height: 56px;
    line-height: 56px;
    padding: 0 20px;
    background-color: #ffffff;
  }
  // 主体区域
  // 侧边栏
  .app-side-menu {
    overflow: hidden;
    border-top: 1px solid transparentize(#ffffff, 0.8);
  }
  .app-main-container {
    overflow: hidden;
  }
  .app-main-pane {
    @include relative;
    padding: 0;
    overflow: hidden;
    background-color: var(--grey-white);
    & > div {
      width: 100%;
      height: 100%;
      padding: 0 16px 16px;
      display: flex;
      flex-direction: column;
      min-width: 600px;
      &:not(.fixed) {
        overflow: auto;
      }
    }
  }
}
</style>
