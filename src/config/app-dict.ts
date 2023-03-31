const configs = () => ({
  /*** 以下部分从接口获取，可以先占位以获得TS提示 ****/
  /*** 以下部分为本地定义，也可以用字典接口内同含义数据覆盖 ****/
  enable: [
    { value: 0, label: '禁用' },
    { value: 1, label: '启用' }
  ],
  /** 真假值 */
  boolean: [
    { value: true, label: '是' },
    { value: false, label: '否' }
  ],
  /** 数字表示的真假 */
  numBoolean: [
    { value: 1, label: '是' },
    { value: 0, label: '否' }
  ],
  /** 数据类型 */
  dataType: [
    { value: 0, label: 'String' },
    { value: 1, label: 'Number' }
  ],
  /** 通用状态 */
  commonState: [
    { value: 1, label: '正常' },
    { value: 0, label: '禁用' }
  ],
  /** 账号状态 */
  accountState: [
    { value: -1, label: '未激活' },
    { value: 0, label: '冻结' },
    { value: 1, label: '正常' }
  ],
  /** 数据权限类型 */
  dataStrategy: [
    { value: 0, label: '个人数据策略' },
    { value: 1, label: '组内数据策略' },
    { value: 2, label: '管理员数据策略' }
  ]
})

export type AppConfigs = Record<keyof ReturnType<typeof configs>, App.Option[]>

export const getAppConfig = configs as () => AppConfigs
