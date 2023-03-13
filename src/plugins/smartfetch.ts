import smartfetch, { CodeErrorHandler, ErrorHandler, SmartFetchMixedRootOptions, StatusErrorHandler } from '@wxhccc/smartfetch'
import { notification } from 'ant-design-vue'
import { AxiosResponse } from 'axios'

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

const statusHandler: StatusErrorHandler = (status, error) => {
  const refreshToken = ''
  if (status === 401 && refreshToken && tokenRefreshTime < 100) {
    tokenRefreshTime++
    return getTokenByRefreshToken()
  }
}

export const errorHandler: ErrorHandler<AxiosResponse> = (
  msg,
  error,
  response,
  curtomHandler?: App.AnyFunction<void>
) => {
  const { code = 0, message = '' } =
    response && response.data ? response.data : {}
  msg = message || msg
  curtomHandler ? curtomHandler(code, notifyMsg) : notifyMsg(msg as string)
}

export const codeErrorHandler: CodeErrorHandler = (resJson) => {
  const { message } = resJson as unknown as App.ApiRes
  notifyMsg(message)
}

export const options: SmartFetchMixedRootOptions = {
  baseConfigs: [
    {
      key: 'default',
      // baseURL: 'http://localhost:3000'
      baseURL: 'http://nas.dustai.com:13001'
    }
  ],
  statusHandler,
  codeErrorHandler,
  errorHandler,
  responseCodeCheck: (resjson) => resjson.code === 200,
  dataKey: 'data',
  statusWarn,
  switchDataNull: true,
  paramsFilterNullable: true
}

smartfetch.resetOptions(options)

