import { onBeforeUnmount } from 'vue'
import { useAppStore, useUserStore } from '@/store'
import { awaitWrapper } from '@wxhccc/es-util'
import { genUUID, safeJsonParse } from '.'

interface InitOptions {
  /** 连接websocket的地址，如果地址有有需要动态获取的参数，可以使用函数配置 */
  url?: string | (() => string)
  /** websocket连接的心跳间隔时间，单位（ms） */
  heartBeat?: number
}

/** 消息体内容 */
export interface MessagePayload<T extends any = any> {
  type: string
  data?: T
}

export type WsEventListener<T extends any = any> = (data: T) => void

export interface WsInstance {
  /** 原声websocket实例对象，如果链接失败则为空 */
  core: WebSocket | undefined
  /** 当前所有用户监听事件的map对象，key为事件名称，value为响应函数数组 */
  listenersMap: Record<string, WsEventListener<any>[]>
  /** websocket实例链接后的回调函数实例 */
  onReady: (callback: () => any) => void
  /** 添加用户监听事件 */
  on: <T extends unknown = any>(event: string, listener: WsEventListener<T>) => void
  /** 移除用户监听事件 */
  off: (event: string, listener?: WsEventListener<any> | undefined) => void
  /** 发送数据 */
  send: <T extends unknown = any>(eventOrPayload: string | MessagePayload<T>, data?: T | undefined) => void
}

/** 创建实例用于通信 */
const createPmInstance = (options?: InitOptions): WsInstance => {
  const { heartBeat, url = '' } = { heartBeat: 5000, ...options } as InitOptions
  let ws: WebSocket | undefined
  let retryTime = 0
  let ticker = 0
  let connecting = false
  let reconnectTicker = 0
  let onReadyCallback = () => undefined

  // 尝试创建websocket实例，最多重试10次
  const initWebsocket = () => {
    return new Promise((resolve, reject) => {
      try {
        const handleUrl = url instanceof Function ? url() : url
        ws = new WebSocket(handleUrl)
      } catch (error) {
        reject(error)
      }
      if (!ws) {
        reject(new Error('no websocket instance'))
        return
      }
      ws.onopen = () => {
        sendHeartBeat()
        onReadyCallback()
        connecting = false
        retryTime = 0
        resolve(true)
        console.log('websocket connect sucess')
      }
      ws.onclose = (e) => {
        connecting = false
        reconnect()
        reject(e)
      }
      // 这里的错误处理是链接过程中的错误
      ws.onerror = (e) => {
        console.log(`websocket connect failed, retry time ${retryTime}`)
        reconnect()
        reject(e)
      }
      ws.onmessage = (e) => {
        const { type, data } = safeJsonParse<MessagePayload>(e.data, { type: '' })
        const listeners = listenersMap[type]
        if (listeners && listeners.length) {
          try {
            listeners.forEach((listener) => listener(data))
          } catch (e) {
            console.error(e)
          }
        }
      }

      const sendHeartBeat = () => {
        ticker = window.setTimeout(() => {
          if (ws?.readyState === 1) {
            ws.send(JSON.stringify({ type: 'ping', data: 'ping' }))
            sendHeartBeat()
          } else {
            // 重连 reconnect
            reconnect()
            window.clearTimeout(ticker)
          }
        }, heartBeat)
      }
    })
  }

  const listenersMap: Record<string, WsEventListener[]> = {}

  const onReady = (callback: () => any) => {
    onReadyCallback = callback
  }

  const reconnect = () => {
    window.clearTimeout(reconnectTicker)
    reconnectTicker = window.setTimeout(initConnect, 5000)
  }

  const initConnect = async () => {
    if (connecting || retryTime > 10) {
      return
    }
    connecting = true
    const [err] = await awaitWrapper(initWebsocket())
    connecting = false
    if (err) {
      window.setTimeout(initConnect, 5000)
      retryTime++
    }
  }

  initConnect()

  /**
   * 添加自定义监听事件
   * @param event 事件名称
   * @param listener 事件监听函数
   */
  const on = <T extends any = any>(event: string, listener: WsEventListener<T>) => {
    if (!listenersMap[event]) {
      listenersMap[event] = []
    }
    const isExist = listenersMap[event].some((i) => i === listener)
    if (!isExist) {
      listenersMap[event].push(listener)
    }
  }

  const off = (event: string, listener?: WsEventListener) => {
    if (!listenersMap[event]) {
      return
    }
    // 不指定具体移除函数，则移除所有同名事件
    if (!listener) {
      delete listenersMap[event]
      return
    }
    const index = listenersMap[event].findIndex((i) => i === listener)
    if (index >= 0) {
      listenersMap[event].splice(index, 1)
    }
  }

  const send = <T extends any = any>(eventOrPayload: string | MessagePayload<T>, data?: T) => {
    if (ws && ws.readyState !== 1) {
      return
    }
    const payload = typeof eventOrPayload === 'string' ? { type: eventOrPayload, data } : eventOrPayload
    const message = JSON.stringify(payload)
    ws?.send(message)
  }

  return { core: ws, listenersMap, onReady, on, off, send }
}

export interface NsWsInstance extends WsInstance {
  nsOn: <T extends unknown = any>(eventName: string, listener: WsEventListener<T>) => void
  nsOff: (eventName: string, listener?: WsEventListener<any> | undefined) => void
  nsSend: <T extends unknown = any>(eventName: string, data?: T | undefined) => void
}

/**
 * 引入全局websocket的封装实例
 * @param namespace 命名空间
 * @returns
 */
export const useWebsocket = (namespace?: string): NsWsInstance => {
  const store = useAppStore()
  const userStore = useUserStore()
  if (!store.globalWs) {
    const url = import.meta.env.VITE_VUE_APP_WS_URL as string
    const { protocol, host } = window.location
    const handleUrl = () => {
      const { token } = userStore
      return `${protocol.replace('http', 'ws')}//${url || host}/api/ws?Authorization=${token}`
    }
    store.globalWs = createPmInstance({ url: handleUrl })
  }
  const ws = store.globalWs as WsInstance
  const nsName = namespace || genUUID()

  /** 添加当前命名空间内的ws监听事件，添加的事件将在组件被销毁时移除 */
  const nsOn = <T extends any = any>(eventName: string, listener: WsEventListener<T>) => {
    const nsEventName = `${nsName}--${eventName}`
    ws?.on(nsEventName, listener)
  }

  const nsOff = (eventName: string, listener?: WsEventListener) => {
    const nsEventName = `${nsName}--${eventName}`
    ws?.off(nsEventName, listener)
  }

  const nsSend = <T extends any = any>(eventName: string, data?: T) => {
    const nsEventName = `${nsName}--${eventName}`
    ws?.send(nsEventName, data)
  }

  const removeNamespaceListeners = () => {
    if (!ws) {
      return
    }
    const eventNames = Object.keys(ws.listenersMap)
    const nsNames = eventNames.filter((name) => name.startsWith(`${nsName}--`))
    nsNames.forEach((name) => ws?.off(name))
  }

  onBeforeUnmount(removeNamespaceListeners)

  return { ...ws, nsOn, nsOff, nsSend }
}
