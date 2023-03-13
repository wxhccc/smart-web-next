declare namespace User {
  interface ModifyPwdParams {
    /** 旧密码 */
    password: string
    newPassword: string
    confirmPassword?: string
  }
  /** 用户账号信息 */
  interface AccountInfo {
    active: boolean
    userId: number
    userName: string
    nickName: string
  }

}
