import smartfetch, { CodeErrorHandler, ErrorHandler, SmartFetchMixedRootOptions, StatusErrorHandler } from '@wxhccc/smartfetch'
import { notification } from 'ant-design-vue'
import { useUserStore } from '@/store'

const notifyQueue: string[] = []
export function notifyMsg(msg: string) {
  if (notifyQueue.includes(msg)) {
    return
  }
  notifyQueue.push(msg)
  notification.error({
    message: '系统提示',
    description: msg,
    class: 'system-api-message',
    onClose: () => {
      const msgIndex = notifyQueue.indexOf(msg)
      msgIndex >= 0 && notifyQueue.splice(msgIndex, 1)
    }
  })
}
const statusWarn = {
  '404': '请求地址不存在',
  '405': '请求方式错误',
  '500': '服务器连接异常，请稍后再试'
}

/** 刷新token的逻辑
const refreshToken = (key: string) => {
  return {}
}

// 防止逻辑有问题时进入死循环
let tokenRefreshTime = 0

const getTokenByRefreshToken = async () => {
  const reToken = ''
  // token过期需先刷新token，刷新无效再跳转登陆
  const [err, data] = await smartfetch.fetch<App.AnyObject>(refreshToken(reToken), {
    needCodeCheck: false,
    ignoreStatusHandle: true
  })
  if (err) {
    // 
  }
  if (data) {
    tokenRefreshTime = 0
    // await store.dispatch('loginIn', data)
  }
}
 */

const statusHandler: StatusErrorHandler = (status) => {
  // 处理需要refresh刷新token的情况
  // const refreshToken = ''
  // if (status === 401 && refreshToken && tokenRefreshTime < 100) {
  //   tokenRefreshTime++
  //   return getTokenByRefreshToken()
  // }
  switch (status) {
    case 401:
      const store = useUserStore()
      store.logout()
      break
    default:
      break
  }
}

export const errorHandler: ErrorHandler<Response> = async (
  msg,
  error,
  response,
  curtomHandler?: App.AnyFunction<void>
) => {
  const resJson = await response?.json()
  const { code = 0, message = '' } = { ...resJson }
  console.log(msg, error, response, resJson)
  msg = message || msg
  curtomHandler ? curtomHandler(code, notifyMsg) : notifyMsg(msg as string)
}

export const options: SmartFetchMixedRootOptions = {
  baseConfigs: [
    {
      key: 'default',
      baseURL: 'http://localhost:8800',
      headers: () => {
        const { token } = useUserStore()
        return (token ? { Authorization: token } : {}) as any
      }
    }
  ],
  statusHandler,
  errorHandler,
  responseCodeCheck: (resjson) => resjson.code === 0,
  dataKey: 'data',
  statusWarn,
  switchDataNull: true,
  paramsFilterNullable: true
}

smartfetch.resetOptions(options)

