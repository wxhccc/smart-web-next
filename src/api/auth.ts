/** authentication apis(鉴权相关) */
import { RequestConfig } from '@wxhccc/smartfetch'
import { smartfetch } from '@/utils'

/** login */
export const login = (data: Auth.LoginParams): RequestConfig => {
  return {
    url: '/auth/login',
    method: 'POST',
    data
  }
}

/** 获取当前用户权限下菜单树 */
export const getMenuRightsTree = async () => {
  return smartfetch<Auth.RightItem[]>('/user/rights')
}

/** logout */
export function logout() {
}
