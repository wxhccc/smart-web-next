import { createRequestConfig } from '@wxhccc/smartfetch'
import { smartfetch } from '@/utils'
/**
 * 用户相关模块
 */

/** modify user's password */
export function modifyPwd(data: User.ModifyPwdParams) {
  return smartfetch('/user/password', data, 'PUT')
}
