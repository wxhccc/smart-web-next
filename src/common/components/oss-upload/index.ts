import { UploadProps } from 'ant-design-vue'
import { UploadLimit } from './utils'

export interface OssUploadProps extends UploadProps {
  modelValue?: string | string[]
  limit?: UploadLimit
  /** 是否手动上传，手动上传时仅做类型检查，然后通过事件传出文件 */
  manual?: boolean
  /** 是否显示进度条，开启时modelValue会变成非完全受控模式 */
  showProgress?: boolean
  /** 是否需要计算md5 */
  countMd5?: boolean
  /** 是否需要在上传文件名中保留原文件名，如果保留会在原文件名后添加随机数保证唯一 */
  keepOriginName?: boolean
  /** 文件解析器，会在文件上传之前调用，可以通过返回值控制是否允许上传，参见beforeUpload参数 */
  fileParser?: (file: File) => boolean | Promise<void>
}

export { default as default } from './index.vue'

export * from './utils'