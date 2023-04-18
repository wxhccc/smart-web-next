<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { vueTypeProp } from '@wxhccc/ue-antd-vue'
import { menuIcons } from '@/components/icons'

const props = defineProps({
  isSubItem: Boolean,
  item: vueTypeProp<App.SideMenuItem>(Object, () => ({} as App.SideMenuItem))
})

const router = useRouter()

const iconComp = computed(() => {
  const { isSubItem, item } = props
  return menuIcons[item.name] || (isSubItem ? null : menuIcons.default)
})

const getRoute = (item: App.SideMenuItem) => {
  const { name, path } = item
  return router.hasRoute(item.name) ? { name } : { path }
}
</script>

<template>
  <a-menu-item v-if="!item.children || !item.children.length" :key="item.name" class="side-menu-item">
    <router-link v-if="!item.children || !item.children.length" :to="getRoute(item)">
      <component :is="iconComp" v-if="iconComp" :class="{ 'root-menu-icon': !isSubItem }" />
      <span>{{ item.title }}</span>
    </router-link>
  </a-menu-item>
  <template v-else>
    <a-sub-menu :key="item.name" class="side-sub-menu">
      <template #title>
        <component :is="iconComp" v-if="iconComp" :class="{ 'root-menu-icon': !isSubItem }" />
        <span>{{ item.title }}</span>
      </template>
      <menu-item v-for="child in item.children" :key="child.name" :item="child" is-sub-item> </menu-item>
    </a-sub-menu>
  </template>
</template>