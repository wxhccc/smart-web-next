<script setup lang="ts">
import { ref, watch } from 'vue'
import { useVModel, useIgnoreWatch } from '@wxhccc/ue-antd-vue'
import OssUpload from '../oss-upload'

const props = defineProps<{
  dir?: string
  modelValue?: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', val?: string): void
}>()

const handleValue = useVModel(props, 'modelValue', emit)
const selfValue = ref(props.modelValue)

const updateInput = () => {
  handleValue.value = selfValue.value
}
const uploadUpdate = (val?: string) => {
  handleValue.value = val
}

useIgnoreWatch(() => props.modelValue, () => {
  selfValue.value = props.modelValue
})

</script>

<template>
  <div class="swcomp-image-input">
    <a-input class="image-url-input" v-model:value="selfValue" @blur="updateInput"></a-input>
    <div class="image-upload-pane">
      <img v-if="modelValue" :src="modelValue" alt="" />
      <oss-upload class="upload-hanlder" model-value="" :dir="dir" @update:model-value="uploadUpdate" :show-upload-list="false">
        <a-button>
          <template #icon>
            <edit-outlined v-if="!!modelValue" />
            <upload-outlined v-else />
          </template>
          {{ modelValue ? '重传' : '上传' }}
        </a-button>
      </oss-upload>
    </div>
  </div>
</template>

<style lang="scss">
.swcomp-image-input {
  display: flex;
  align-items: flex-start;
  .image-url-input {
    flex: 1;
    margin-right: 10px;
  }
  .image-upload-pane {
    position: relative;
    width: 128px;
    height: 128px;
    border: 1px solid var(--light-grey);
    background-color: var(--grey-white);
    overflow: hidden;

    img {
      width: 100%;
    }

    .upload-hanlder {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -16px;
      margin-left: -36px;
      opacity: .7;
    }
  }
}</style>