<script setup lang="ts">
import { ref } from 'vue'
import { getCaptchaImage } from '@/api/auth'

const imageBaseSrc = getCaptchaImage()
const imgSrc = ref(imageBaseSrc)

const refreshImage = () => {
  imgSrc.value = `${imageBaseSrc}?id=${+new Date}`
}
</script>

<template>
  <img class="verify-code-image" :src="imgSrc" @click="refreshImage" />
</template>