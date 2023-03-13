<template>
  <div class="page-404">
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
      <template #extra>
        <router-link to="/">
          <a-button class="return-btn" type="primary" plain>返回首页</a-button>
        </router-link>
        <router-link :to="{ name: 'Login' }">
          <a-button class="login-btn" type="primary" plain>重新登陆</a-button>
        </router-link>
      </template>
    </a-result>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Page404',
})
</script>
