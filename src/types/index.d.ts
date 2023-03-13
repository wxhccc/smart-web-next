declare namespace App {
  /** 选项类型 */
  interface Option {
    label: number | string
    value: number | string | boolean
  }

  /* 对象约束 */
  interface AnyObject {
    [key: string]: any
  }

  /* 函数约束 */
  type AnyFunction<T> = (...args: any[]) => T

  /* 字符串或数字 */
  type StrOrNum = number | string

  /** 只将给定字段修改为非必须 */
  type PartailSome<P, RK extends keyof P> = Partial<Pick<P, RK>> & Omit<P, RK>
  /**  */
  type PartailPick<P, RK extends keyof P> = Partial<Pick<P, RK>>
}
