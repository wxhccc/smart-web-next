<template>
  <div class="admin-test-page">
    <!-- <div class="container">
      {{ RouteRights }}
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TestPage',
  components: {},
  data() {
    return {
      value: []
    }
  }
})
</script>
<style lang="scss">
.admin-test-page {
  .container {
    width: 600px;
  }
}
</style>
