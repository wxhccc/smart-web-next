<template>
  <div :class="['sw-comp-sidebar', { 'is-collapse': isCollapse }]">
    <div class="sw-logo">
      <span>物联网平台</span>
    </div>
    <div class="side-menu-pane">
      <a-menu
        class="side-main-menu"
        mode="inline"
        :collapsed="isCollapse"
        :theme="sidebar.theme"
        :selected-keys="activeMenuKey"
        :open-keys="openKeys"
        @update:open-keys="onOpenChange"
      >
        <menu-item v-for="item in menuItems" :key="item.name" :item="item"> </menu-item>
      </a-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store'
import MenuItem from './menu-item.vue'

const getOpenKeys = (meta: App.AnyObject) => {
  const { rootMenuName } = meta
  return rootMenuName ? [rootMenuName] as string[] : []
}

export default defineComponent({
  name: 'AppSideBar',
  components: {
    MenuItem
  },
  setup() {
    const store = useAppStore()
    const route = useRoute()
    const openKeys = ref(getOpenKeys(route.meta))

    const sidebar = computed(() => store.sidebar)

    const isCollapse = computed(() => store.sidebar.opened)
    const menuItems = computed(() => store.sidebar.menuItems || [])
    const activeMenuKey = computed(() => {
      const {
        name,
        meta: { activeTarget }
      } = route
      return [activeTarget || name]
    })

    const onOpenChange = (values: string[]) => {
      const [curOpenKey] = openKeys.value
      openKeys.value = values.filter((key) => key !== curOpenKey)
    }

    watch(() => route, () => {
      if (openKeys.value.length > 0) {
        return
      }
      openKeys.value = getOpenKeys(route.meta)
    })

    return { isCollapse, openKeys, sidebar, menuItems, activeMenuKey, onOpenChange }
  }
})
</script>

<style lang="scss">
.sw-comp-sidebar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  &.is-collapse {
    .sw-logo span {
      display: none;
    }
  }
  .sw-logo {
    height: 72px;
    color: var(--white);
    text-align: center;
    line-height: 72px;
    font-size: 18px;
    span {
      padding-left: 10px;
      transition: all 0.2s;
    }
  }
  .side-menu-pane {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    .ant-menu-inline-collapsed {
      .root-menu-icon {
        font-size: 18px;
      }
    }
  }
}
</style>
