declare namespace User {
  interface ModifyPwdParams {
    /** 旧密码 */
    password: string
    /** 新密码 */
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
