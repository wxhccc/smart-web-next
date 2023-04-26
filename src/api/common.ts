/** 通用接口 */
import { createRequestConfig } from '@wxhccc/smartfetch'
import { smartfetch } from '@/utils'

/** 获取数据 */
export function getDemoData() {
  return createRequestConfig('/xxx')
}

// get ali-oss access token
export const getOssAccessToken = () => {
  return smartfetch('/oss/access')
}

export const getAppBaseConfig = () => {
  return createRequestConfig('/base/configs')
}