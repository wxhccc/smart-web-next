declare namespace User {
  interface ModifyPwdParams {
    /** 旧密码 */
    password: string
    /** 新密码 */
    newPassword: string
    confirmPassword?: string
  }
  /** 用户账号信息 */
  interface AccountInfo
    extends Pick<Item, 'id' | 'account' | 'state' | 'nick' | 'avatar' | 'createdAt'> {
    isSA: boolean
  }

  /** 个人信息编辑参数 */
  type ProfileEditParams = App.PartailPick<AccountInfo, 'nick' | 'avatar'>

  /** 用户信息基础属性 */
  interface Base {
    /** 账号名 */
    account: string
    /** 密码 */
    password: string
    /** 昵称 */
    nick: string
    /** 头像地址 */
    avatar: string
    /** 用户手机号 */
    telphone: string
    /** 角色id数组 */
    roleIds: ('SA' | number)[]
    /** 数据权限 */
    dataStrategy: number
    /** 所属用户组id, 目前系统设计为用户只能属于一个组 */
    groupId: number
    /** 账号状态 */
    state: number
  }

  type Item = Base & Common.RecordBase

  type SearchParams = Search.ListParam & App.PartailPick<Base, 'account' | 'state'>

  type AddParams = App.PartailSome<
    Pick<Base, 'account' | 'nick' | 'password' | 'dataStrategy' | 'telphone' | 'roleIds' | 'state' | 'groupId'>,
    'nick' | 'telphone' | 'roleIds' | 'groupId' | 'state'
  >

  type EditParams = Partial<AddParams>
}
