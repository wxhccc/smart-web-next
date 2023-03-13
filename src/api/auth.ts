/** authentication apis(鉴权相关) */
import { createRequestConfig, returnRequestLink, RequestConfig } from '@wxhccc/smartfetch'

/** login */
export const login = (data: Auth.LoginParams): RequestConfig => {
  return {
    url: '/login',
    method: 'POST',
    data,
    // withCredentials: true
    // credentials: 'include'
  }
  // createRequestConfig(``, data, 'POST')
}

/** 获取数字验证码图片链接地址 */
export const getCaptchaImage = () => {
  return returnRequestLink(`/captcha.svg`, undefined)
}

/** 获取当前用户权限下菜单树 */
export const getMenuRightsTree = async () => {
  const mockMenu: Auth.RightItem[] = [
    {
      id: 1,
      parentId: 0,
      icon: '',
      title: '一级菜单',
      type: 0,
      name: 'Lvl1',
      children: [
        {
          id: 2,
          parentId: 1,
          icon: '',
          title: '二级菜单1',
          name: 'Lvl1-1',
          type: 0,
          children: [
            { id: 4, parentId: 2, icon: '', name: undefined, type: 1, title: '删除', permission: 'delete' }
          ]
        },
        { id: 3, parentId: 1, icon: '', name: 'Lvl1-2', type: 0, title: '二级菜单2' }
      ]
    }
  ]
  return [null, mockMenu]
}

/** logout */
export function logout() {
}
