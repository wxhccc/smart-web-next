import { v4 } from 'uuid'

export type UploadLimitType = string | RegExp | ((fileType: string, file: File) => boolean)

export interface UploadLimit {
  /** 文件类型判断
   * 可以是字符串，字符串格式可以是image/png这种判断类型的，也可以是.png这种判断后缀的
   * 可以是正则
   * 可以是自定义函数 */
  type?: UploadLimitType[]
  size?: number
  maxNum?: number
}

export const genUid = () => v4()

export const getNewFileKey = (fileName: string, keepOriginName?: boolean) => {
  const fileInfo = fileName.split('.')
  const fileExt = fileInfo.length >= 2 ? fileInfo.pop() : ''
  const orgFileName = fileInfo.length ? fileInfo.join('.') : ''
  const baseName = `${keepOriginName ? `${orgFileName}_` : ''}${genUid()}`
  return `${baseName}.${fileExt}`
}

/** 创建检查文件类型的函数 */
export const createFileTypeChecker =
  (accept?: string, typeRegMap?: Record<string, RegExp>) =>
  (file: File, limitType?: UploadLimitType[]) => {
    const { type } = file
    if (accept && typeRegMap && typeRegMap[accept] && !typeRegMap[accept].test(type)) {
      return false
    }
    return (
      !Array.isArray(limitType) ||
      limitType.length === 0 ||
      limitType.some((val) => {
        if (typeof val === 'string') {
          const ext = `.${(file.name.split('.').pop() || '').toLowerCase()}`
          return val.startsWith('.') ? ext === val : val === type
        } else if (typeof val === 'function') {
          return val(type, file)
        } else if (val instanceof RegExp) {
          return val.test(type)
        }
        return false
      })
    )
  }
/** 检查文件大小 */
export const checkFileSize = (size: number, limitSize = 0) => {
  return limitSize <= 0 || size < limitSize
}
