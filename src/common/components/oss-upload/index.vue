<script setup lang="ts">
import { ref, computed, useAttrs, watch } from 'vue'
import { byteStringify } from '@wxhccc/es-util'
import { message } from 'ant-design-vue'
import { vueTypeProp } from '@wxhccc/ue-antd-vue'
import { md5File } from '@/utils/file-parsers'
import { getOssAccessToken } from '@/api/common'
import { useAppStore } from '@/store'
import { FileItem, OssUploadProps, UploadLimit } from '.'
import { createFileTypeChecker, genUid, getNewFileKey } from './utils'

const typeRegMap: { [key: string]: RegExp } = {
  'image/*': /image+/,
  'video/*': /video+/
}

const defaultLimit: UploadLimit = {
  type: ['image/jpeg', 'image/png', 'image/jpg'],
  size: 1024 * 1024 * 5
}

const createFileItem = (url: string): FileItem => ({ uid: genUid(), name: url.split('/').pop(), url })

const props = defineProps({
  modelValue: vueTypeProp<OssUploadProps['modelValue']>([String, Array]),
  manual: Boolean,
  limit: vueTypeProp<UploadLimit>(Object),
  showProgress: Boolean,
  keepOriginName: vueTypeProp<boolean>(Boolean, true),
  cache: Boolean,
  countMd5: Boolean,
  fileParser: vueTypeProp<OssUploadProps['fileParser']>(Function)
})

const emit = defineEmits(['uploadSuccess', 'update:fileList', 'update:modelValue', 'manualChose'])

const attrs = useAttrs()

const store = useAppStore()

const getInitFileList = (): FileItem[] => {
  const { fileList } = attrs
  // 优先使用传入的fileList属性
  if (Array.isArray(fileList)) {
    return fileList
  }
  const { modelValue: value } = props
  if (!value) {
    return []
  }
  return Array.isArray(value) ? value.map(createFileItem) : [createFileItem(value)]
}

const selfList = ref(getInitFileList())
const imageData = ref<App.AnyObject>({})
const selfValue = ref(props.modelValue)
const upLoading = ref(false)
const selfTrigger = ref(false)

const OST = computed(() => store.ossAccessToken)
const isValueArr = computed(() => Array.isArray(props.modelValue))

const fileList = computed({
  get(): FileItem[] {
    return Array.isArray(attrs.fileList) ? attrs.fileList : selfList.value
  },
  set(val: FileItem[]) {
    selfTrigger.value = true
    selfList.value = val
    emit('update:fileList', val)
    const value = val.map((item) => item.url)
    selfValue.value = isValueArr.value ? (value as string[]) : value[0]
    emit('update:modelValue', selfValue.value)
  }
})

const handleValue = computed<OssUploadProps['modelValue']>(() => props.modelValue !== undefined ? props.modelValue : selfValue.value)

const limitOpts = computed<UploadLimit>(() => ({ ...defaultLimit, ...props.limit }))

const showTriggerBtn = computed(() => {
  const { maxNum = 0 } = limitOpts.value
  const max = isValueArr.value ? maxNum : 1
  return max > 0 ? fileList.value.length < max : true
})

watch(() => props.modelValue, () => {
  if (selfTrigger.value) {
    selfTrigger.value = false
    return
  }
  selfList.value = getInitFileList()
})

const fileTypeChecker = createFileTypeChecker(attrs.accept as string, typeRegMap)

const checkFileType = (type: string, file: File) => {
  const { type: limitType } = limitOpts.value
  return fileTypeChecker(file, limitType)
}
const checkFileSize = (size: number) => {
  const { size: limitSize = 0 } = limitOpts.value
  return limitSize <= 0 || size < limitSize
}

const errorTip = (msg: string) => message.error(msg)

const uploadError = () => {
  errorTip('文件上传失败，请稍后重试')
}
const removeFile = (file: FileItem) => {
  fileList.value = fileList.value.filter((item) => item.uid !== file.uid)
}

const handleImgData = (file: File) => {
  const key = getNewFileKey(file.name)
  imageData.value = { ...OST.value, key }
}

const beforeUpload = (file: File) => {
  const { type, size } = file
  if (!checkFileType(type, file)) {
    errorTip('文件类型有误！')
    return false
  } else if (!checkFileSize(size)) {
    const { size: limitSize = 0 } = limitOpts.value
    errorTip(`文件大小超过限制！,单文件最大不超过${byteStringify(limitSize)}`)
    return false
  }
  if (props.manual) {
    emit('manualChose', file)
    return false
  }
  if (checkObsExpired()) {
    return getAccessToken(true).catch((e) => {
      console.log(e)
    })
  }
  handleImgData(file)
  if (typeof props.fileParser === 'function') {
    return props.fileParser(file)
  }
}
const checkObsExpired = () => {
  const { expireTime } = store.ossAccessToken
  return !expireTime || +new Date() > expireTime
}
// const uploadFile = async (config: CustomRequestConfig) => {
//   const { file } = config
//   const fileInfo = file.name.split('.')
//   const fileExt = fileInfo.length >= 2 ? fileInfo.pop() : ''
//   const orgFileName = fileInfo.length ? fileInfo.join('.') : ''
//   const baseName = `${props.keepOriginName ? `${orgFileName}_` : ''}${genUid()}`
//   const param: Obs.UploadParams = {
//     file,
//     name: `${baseName}.${fileExt}`,
//     type: file.type.split('/')[0] as Resource.FileType
//   }
//   let onProgress: App.AnyFunction<void> = () => undefined
//   // 显示上传进度条
//   if (props.showProgress) {
//     selfList.value.push({ uid: baseName, status: 'uploading', name: file.name, percent: 0 })
//     onProgress = (transferred: number, total: number) => {
//       const fileIndex = selfList.value.findIndex((item) => item.uid === baseName)
//       if (fileIndex < 0) {
//         return
//       }
//       const percent = (transferred * 100) / total
//       selfList.value[fileIndex].percent = percent
//     }
//   }
//   let fileMd5 = ''
//   // 计算md
//   if (props.countMd5) {
//     md5File(file).then((value: string) => {
//       emit('file-md5-counted', value, file)
//       fileMd5 = value
//     })
//   }
//   const [err, res] = await obsSdkUpload(store.ossAccessToken, param, onProgress)
//   if (err || !res) {
//     return errorTip('上传文件失败')
//   }

//   if (props.showProgress) {
//     // 显示进度条时，因为添加了临时文件，需要在列表中找到并删除
//     const fileIndex = selfList.value.length && selfList.value.findIndex((item) => item.uid === baseName)
//     // 如果找不到当前文件，则表明文件被删除，则不处理后续流程
//     if (fileIndex < 0) {
//       return
//     }
//     selfList.value.splice(fileIndex, 1)
//   }
//   res.md5 = fileMd5
//   emit('uploadSuccess', res)
//   const fileItem = { uid: baseName, ...res }
//   fileList.value = [...fileList.value, fileItem]
// }
const getAccessToken = async (needReject?: boolean) => {
  const [err, data] = await getOssAccessToken()
  if (err || !data) {
    errorTip('获取上传所需凭证失败，请稍后再试')
    return needReject && Promise.reject()
  }
  // 有效期由接口数据决定
  data.expireTime = +new Date() + data.expire * 1000
  store.setOssAccessToken(data)
}

checkObsExpired() && getAccessToken()
</script>
<script lang="ts">
export default { name: 'OssUpload' }
</script>

<template>
  <a-upload
    v-if="OST.host || $attrs.httpRequest"
    ref="upload"
    :class="['abs-files-upload', { 'single-file': !isValueArr }]"
    :file-list="fileList"
    :disabled="upLoading"
    :on-error="uploadError"
    v-bind="$attrs"
    :action="OST.host"
    :data="imageData"
    :before-upload="beforeUpload"
    @remove="removeFile"
  >
    <slot v-if="showTriggerBtn" :loading="upLoading">
      <a-button size="small">
        <upload-outlined></upload-outlined>
        上传文件
      </a-button>
    </slot>
  </a-upload>
</template>

<style lang="scss">
.abs-files-upload.single-file {
  .ant-upload-select-picture-card {
    margin: 0;
  }
}
</style>
