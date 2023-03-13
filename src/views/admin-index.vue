<template>
  <div class="admin-index-page"></div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useAppStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'AdminIndex',
  setup() {
    const store = useAppStore()
    const router = useRouter()
    const route = useRoute()
    watch(
      () => store.sidebar.firstRoute,
      () => {
        const { firstRoute } = store.sidebar
        const { lastPath } = route.params
        if (lastPath && typeof lastPath === 'string') {
          router.push(lastPath)
        } else if (firstRoute && router.hasRoute(firstRoute)) {
          router.push({ name: firstRoute })
        }
      },
      { immediate: true }
    )
    return {}
  }
})
</script>
