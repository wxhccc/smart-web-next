import SparkMD5 from 'spark-md5'
import { safeJsonParse } from '@wxhccc/es-util'

interface Md5FileOptions {
  chunkSize: number
}
/**
 * 计算上传文件的md5值
 * @param file 本地上传文件文件对象
 * @param options 可选参数对象
 * @returns
 */
export function md5File(file: File, options?: Md5FileOptions): Promise<string> {
  const { chunkSize } = { chunkSize: 2097152, ...options }
  return new Promise((resolve, reject) => {
    const blobSlice = File.prototype.slice
    const chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()

    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      const { result } = event.target || {}
      if (!result) {
        return
      }
      spark.append(result as ArrayBuffer)
      currentChunk++

      if (currentChunk < chunks) {
        loadNext()
      } else {
        resolve(spark.end())
      }
    }

    fileReader.onerror = reject

    const loadNext = () => {
      const start = currentChunk * chunkSize
      const end = start + chunkSize >= file.size ? file.size : start + chunkSize

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }

    loadNext()
  })
}

export function saveFileContent(content: ArrayBuffer, fileName: string) {
  const downLink = document.createElement('a')
  downLink.download = fileName
  //字符内容转换为blod地址
  const blob = new Blob([content])
  downLink.href = URL.createObjectURL(blob)
  // 链接插入到页面
  document.body.appendChild(downLink)
  downLink.click()
  // 移除下载链接
  document.body.removeChild(downLink)
}

/**
 * 从file input中选择的文件读取json字符串
 * @param file 文件对象
 */
export function readJsonFile<T = any>(file: File): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (evt) => {
      const { result } = evt.target || {}
      resolve(safeJsonParse<T>((result as string) || ''))
    }
    reader.onerror = reject
    reader.readAsText(file)
  })
}
