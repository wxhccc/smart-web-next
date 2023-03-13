import { defineStore } from 'pinia'
import { Storage } from '@/utils'
// import { winFetch } from '@wxhccc/smartfetch'
// import { logout } from '@/api/auth'

export interface UserState {
  isLogin: boolean
  token: string
  refreshToken: string
  routeActions: string[]
  userInfo: Record<string, any>
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLogin: Boolean(Storage.get('TOKEN')),
    token: Storage.get('TOKEN'),
    refreshToken: Storage.get('REFRESHTOKEN'),
    userInfo: Storage.get('USERINFO') || {},
    routeActions: []
  }),
  actions: {
    setLoginIn (token: string) {
      this.isLogin = Boolean(token)
    },
    setToken (token: string) {
      this.token = token
      Storage.set('TOKEN', this.token)
    },
    setRefreshToken (refreshToken: string) {
      this.refreshToken = refreshToken
      Storage.set('REFRESHTOKEN', refreshToken)
    },
    setUserInfo (userInfo: Partial<UserState['userInfo']>) {
      this.userInfo = Object.assign({}, this.userInfo, userInfo)
      Storage.set('USERINFO', this.userInfo)
    },
    setRouteActions (actions: string[]) {
      this.routeActions = Array.isArray(actions) ? actions : []
    },
    loginIn(accessInfo: Auth.AccessInfo) {
      const { token, refreshToken, ...rest } = accessInfo
      this.setToken(token)
      this.setRefreshToken(refreshToken)
      this.setUserInfo(rest)
      this.setLoginIn(token)
    },
    logout() {
      // winFetch(logout())
      this.isLogin = false
      this.token = ''
      this.userInfo = {}
      Storage.clear()
    }
  }
})

export type UserStore = ReturnType<typeof useUserStore>

