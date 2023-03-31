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
  /** 将指定字段外的其他字段设定为非必须 */
  type PartailExclude<P, RK extends keyof P> = Pick<P, RK> & Partial<Omit<P, RK>>
  /** 挑选指定字段并设置为非必须 */
  type PartailPick<P, RK extends keyof P> = Partial<Pick<P, RK>>
}
