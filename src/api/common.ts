/** 通用接口 */
import { createRequestConfig } from '@wxhccc/smartfetch'
import { smartfetch } from '@/utils'

/** 获取虚拟页面（模板页面）的数据。可根据需要实现 */
export const getVirtualTplMap = async () => {
  const result: VirtualRoutes.RouteTplMap = {
    // LogsVirtual: { component: 'PagedTablePage', path: '/system/logs-virtual' }
  }
  return [null, result] as [null, VirtualRoutes.RouteTplMap] | [Error, undefined]
}


/** 获取数据 */
export function getDemoData() {
  return createRequestConfig('/xxx')
}

// get ali-oss access token
export const getOssAccessToken = () => {
  return smartfetch('/oss/access')
}