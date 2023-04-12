<script setup lang="ts">
import { ref, reactive, computed, watch, useAttrs, nextTick } from 'vue'
import { Cropper as UeCropper, vwp } from '@wxhccc/ue-antd-vue'
import OssUpload, { genUid } from '@/common/components/oss-upload'
import { useAppStore } from '@/store'
import { smartfetch } from '@/utils'

const props = defineProps<{
  initSrc?: string
  customRequest?: App.AnyFunction<Promise<unknown>>
}>()
const emit = defineEmits<{
  (e: 'avatarSuccess', url: string): void
}>()
const attrs = useAttrs()

const store = useAppStore()

const initState = () => ({
  sending: false,
  ossKey: Math.random()
})

const src = ref(props.initSrc)

const $cropper = ref()
const state = reactive({
  inited: false,
  canSend: false,
  ...initState()
})

const cropperProps = { preview: '.priview-img-pane' }

const initSrcState = (newVal: boolean) => {
  const { initSrc } = props
  if (newVal && initSrc && !state.inited) {
    state.inited = true
  }
}

const renderLocalImage = (file: File) => {
  src.value = window.URL.createObjectURL(file)
}

const cropperReady = () => {
  state.canSend = true
}
const sendImageOss = async () => {
  if ($cropper.value) {
    state.sending = true
    const file = await $cropper.value.getCroppedFile()
    const { host, expireTime, ...ossInfo } = store.ossAccessToken
    const ossConfig: Record<string, any> = { ...ossInfo, key: `${genUid()}.png`, file }
    const formData = new FormData()
    for (let i in ossConfig) {
      formData.append(i, ossConfig[i])
    }
    const [err, data] = await smartfetch(`https:${host}`, formData, 'POST')
    if (data) {
      emit('avatarSuccess', data.imgUrl)
      if (typeof props.customRequest === 'function') {
        const [, result] = await vwp(props.customRequest(data.imgUrl))
        if (result) {
          closeDialog()
        }
      }
    }
    state.sending = false
  }
}
const resetCropper = () => {
  $cropper.value?.reset()
}
const closeDialog = () => {
  const { 'onUpdate:visible': onVisibleChange } = attrs
  if (typeof onVisibleChange === 'function') {
    onVisibleChange(false)
  }
  Object.assign(state, initState())
}

watch(() => attrs.visible as boolean, initSrcState)
</script>

<template>
  <a-modal
    class="swcomp-avatar-modal"
    :closable="!state.sending"
    :ok-button-props="{ disabled: !state.canSend }"
    :ok-text="state.sending ? '提交中' : '确 定'"
    :confirm-loading="state.sending"
    :width="720"
    @ok="sendImageOss"
    @cancel="closeDialog"
  >
    <a-row class="inner-wrap" type="flex">
      <a-col class="operation-wrap" :span="18">
        <ue-cropper
          v-if="src"
          class="avatar-ope-pane"
          ref="$cropper"
          :src="src"
          type="avatar"
          :options="cropperProps"
          @ready="cropperReady"
        >
        </ue-cropper>
      </a-col>
      <a-col class="preview-wrap" :span="5" :offset="1">
        <oss-upload
          class="local-file"
          ref="ossUpload"
          manual
          :key="state.ossKey"
          @manual-chose="renderLocalImage"
        >
          <a-button>选择图片文件</a-button>
        </oss-upload>
        <p class="tool-btns">
          <a-button
            size="mini"
            @click="resetCropper"
          >
            <template #icon>
              <reload-outlined />
            </template>
            重置
          </a-button>
        </p>
        <div class="priview-pane">
          <p>头像预览</p>
          <div class="priview-img">
            <div class="priview-img-pane" ref="preview"></div>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>

<style lang="scss">
.swcomp-avatar-modal {
  @mixin grey-bg {
    background-color: #f1f1f1;
  }

  .el-dialog__body {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .inner-wrap {
    align-items: stretch;
  }

  .operation-wrap {
    @include grey-bg;
    display: flex;
    position: relative;
    padding-top: 45%;
  }

  .preview-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .avatar-ope-pane {
    @include absolute;
    left: 0;
    top: 0;
  }

  .dialog-footer .ant-button {
    min-width: 100px;
    margin-left: 20px;
  }

  .priview-pane {
    width: 80%;

    .priview-img {
      position: relative;
      width: 100%;
      padding-top: 100%;
      @include grey-bg;

      .priview-img-pane {
        @include absolute;
        left: 0;
        top: 0;
        overflow: hidden;
      }
    }
  }
}
</style>
