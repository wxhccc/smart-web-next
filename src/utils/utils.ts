import { isRef, Ref } from 'vue'
import { wp, formParamsSwitchCreator } from '@wxhccc/es-util'
import { mergeWith, cloneDeep, pick, isEqual } from 'lodash-es'
import { dateFormat } from './formatter'

export { safeJsonParse, switchNullToUndefined, filterNullable } from '@wxhccc/es-util'

export { vwp } from '@wxhccc/ue-antd-vue'

export { winFetch as smartfetch } from '@wxhccc/smartfetch'

/***
 ** 使用lodash的mergeWith合并对象,规则为数组自动拼接
 * {object list} args 需要合并的对象序列或数组
 ** 返回值: {object} 合并后的新对象
 ***/
export function mergeObj(...args: Parameters<typeof mergeWith>) {
  return mergeWith(...args, (objValue: unknown, srcValue: unknown) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  })
}

export const genNonDuplicateID = () =>
  `${Date.now().toString(16)}${Math.round(Math.random() * 100000000000).toString(16)}`

/**
 * 用传入的keys生产一个监听函数，函数会对比传入的对象，如果指定的key发生变化，则触发回调函数更新返回值
 * @param keys 需要监听的对象属性值
 */
export function watchCallback<TT extends App.AnyObject = App.AnyObject, RT = void>(
  keys: App.StrOrNum[],
  callback: App.AnyFunction<RT>
) {
  let cache: Record<string, any>
  let saveReturn: RT
  return function (target: TT, ...args: unknown[]) {
    if (!isEqual(cache, pick(target, keys))) {
      cache = cloneDeep(pick(target, keys))
      saveReturn = callback(target, ...args)
    }
    return saveReturn
  }
}

/**
 * 通用下拉选项过滤函数
 * @param key 输入内容
 * @param option 当前选项
 * @returns boolean
 */
export function filterOption(key: string, option: any) {
  const { label } = option || {}
  return !option || `${label}`.toLowerCase().includes(key.toLowerCase())
}

export type ScheduledFn<T extends (...args: any[]) => void> = T & { cancel(): void }
/** 截流函数，控制函数在下一个渲染周期（requestAnimationFrame）执行，用于滚动等动画敏感场景 */
export function nextFrame<T extends (...args: any[]) => void>(fn: T): ScheduledFn<T> {
  let lastArgs = [] as unknown as Parameters<T>
  let frameId: number | undefined

  const wrapperFn = (...args: Parameters<T>) => {
    // Always capture the latest value
    lastArgs = args

    // There is already a frame queued
    if (frameId) {
      return
    }

    // Schedule a new frame
    frameId = requestAnimationFrame(() => {
      frameId = undefined
      fn(...lastArgs)
    })
  }

  // Adding cancel property to result function
  wrapperFn.cancel = () => {
    if (!frameId) {
      return
    }

    cancelAnimationFrame(frameId)
    frameId = undefined
  }

  return wrapperFn as ScheduledFn<T>
}

/**
 * 将搜素条件里的数组字段转换为其他格式，通常用于搜索表单的字段转换
 * @param formData 传入参数
 * @param maps 转换的映射关系，eg：{ date: ['startTime', 'endTime'] }
 */
export const searchFormDateSwitch = formParamsSwitchCreator(dateFormat)

/**
 * 动态加载远程js文件
 * @param src 文件路径
 * @returns
 */
export const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.onload = resolve
    script.onerror = reject
    script.src = src
    document.body.appendChild(script)
  })
}

export const strToUTF8Arr = (sDOMStr: string) => {
  let nChr,
    nArrLen = 0
  const nStrLen = sDOMStr.length

  /* mapping... */

  for (let nMapIdx = 0; nMapIdx < nStrLen; nMapIdx++) {
    nChr = sDOMStr.charCodeAt(nMapIdx)
    nArrLen += nChr < 0x80 ? 1 : nChr < 0x800 ? 2 : nChr < 0x10000 ? 3 : nChr < 0x200000 ? 4 : nChr < 0x4000000 ? 5 : 6
  }

  const aBytes = new Uint8Array(nArrLen)

  /* transcription... */

  for (let nIdx = 0, nChrIdx = 0; nIdx < nArrLen; nChrIdx++) {
    nChr = sDOMStr.charCodeAt(nChrIdx)
    if (nChr < 128) {
      /* one byte */
      aBytes[nIdx++] = nChr
    } else if (nChr < 0x800) {
      /* two bytes */
      aBytes[nIdx++] = 192 + (nChr >>> 6)
      aBytes[nIdx++] = 128 + (nChr & 63)
    } else if (nChr < 0x10000) {
      /* three bytes */
      aBytes[nIdx++] = 224 + (nChr >>> 12)
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63)
      aBytes[nIdx++] = 128 + (nChr & 63)
    } else if (nChr < 0x200000) {
      /* four bytes */
      aBytes[nIdx++] = 240 + (nChr >>> 18)
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63)
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63)
      aBytes[nIdx++] = 128 + (nChr & 63)
    } else if (nChr < 0x4000000) {
      /* five bytes */
      aBytes[nIdx++] = 248 + (nChr >>> 24)
      aBytes[nIdx++] = 128 + ((nChr >>> 18) & 63)
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63)
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63)
      aBytes[nIdx++] = 128 + (nChr & 63)
    } /* if (nChr <= 0x7fffffff) */ else {
      /* six bytes */
      aBytes[nIdx++] = 252 + (nChr >>> 30)
      aBytes[nIdx++] = 128 + ((nChr >>> 24) & 63)
      aBytes[nIdx++] = 128 + ((nChr >>> 18) & 63)
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63)
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63)
      aBytes[nIdx++] = 128 + (nChr & 63)
    }
  }

  return aBytes
}
