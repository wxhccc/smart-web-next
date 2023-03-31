import { createRequestConfig, defineFetchApi, RequestConfig } from '@wxhccc/smartfetch'
import { smartfetch } from '@/utils'
/**
 * 用户相关模块
 */

/** modify user's password */
export const modifyPwd = (data: User.ModifyPwdParams) => {
  return smartfetch('/user/password', data, 'PUT')
}

// modify user's profile info
export const modifyUserProfile = (data: User.ProfileEditParams) => {
  return createRequestConfig('/user/profile', data, 'PUT')
}
