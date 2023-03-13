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
  ]
})

export type AppConfigs = Record<keyof ReturnType<typeof configs>, App.Option[]>

export default configs as () => AppConfigs
