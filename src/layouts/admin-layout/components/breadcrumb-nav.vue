<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { RouteMeta } from '@/router/types'
import { useAppStore } from '@/store'

interface BreadcrumbItem {
  label: string
  routeName?: string
}
const router = useRouter()
const store = useAppStore()
const route = useRoute()

const curPageTitle = computed(() => store.customPageTitle)

const breadcrumb = computed<BreadcrumbItem[]>(() => {
  const { breadcrumb = [] } = route.meta as RouteMeta
  return breadcrumb.map((item, index) => {
    const { label, name } = item
    if (index === breadcrumb.length - 1) {
      const showLabel = index === breadcrumb.length - 1 && curPageTitle.value ? curPageTitle.value : label
      return { label: showLabel }
    }
    const hasRoute = !!name && router.hasRoute(name)
    return { label, routeName: hasRoute ? name : '' }
  })
})
</script>

<template>
  <a-breadcrumb class="page-breadcrumb">
    <a-breadcrumb-item v-for="item in breadcrumb" :key="item.label">
      <router-link v-if="item.routeName" :to="{ name: item.routeName }">{{ item.label }}</router-link>
      <span v-else>{{ item.label }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<style lang="scss" scoped>
.page-breadcrumb {
  margin: 10px 20px;
}
</style>
