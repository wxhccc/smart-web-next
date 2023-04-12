<script lang="ts">
import { defineComponent, mergeProps, h, computed } from 'vue'
import { Image } from 'ant-design-vue'
import fallbackImg from '@/assets/empty-img.png'
import { ImageProps } from 'ant-design-vue/lib/image'

export default defineComponent({
  name: 'SwImage',
  props: Image.props,
  setup(props: ImageProps, { attrs }) {
    const fallback = props.fallback || fallbackImg
    const src = computed(() => props.src || fallbackImg)
    return () => h(Image, mergeProps(props, attrs, { wrapperClassName: 'sw-image', fallback, src: src.value }))
  }
})
</script>

<style lang="scss">
.sw-image {
  width: 100%;
  height: 100%;
  .ant-image-img {
    height: 100%;
    object-fit: contain;
  }
}
</style>
