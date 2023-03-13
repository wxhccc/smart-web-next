<template>
  <div class="app-wrapper app-layout">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Layout'
})
</script>
<style lang="scss">
.app-layout {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
