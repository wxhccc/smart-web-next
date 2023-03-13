/**
 * 本系统中用于表单验证所需要的方法
 */
import { ChinaIdCardValid, checkoutBy } from '@wxhccc/es-util'
import { RuleObject } from 'ant-design-vue/es/form/interface'
/** 表单通用验证规则 **/
export const regexMap = {
  /* 手机号正则 */
  telphone: /^1\d{10}$/,
  /* 身份证正则 */
  idCard: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,
  /* 字母加数字 */
  alphanumeric: /^[A-Za-z0-9]+$/,
  /* 字母 */
  alpha: /^[A-Za-z]+$/,
  /* 整数正则函数，根据参数决定正负整数 */
  integerFn: (positive?: boolean) => new RegExp(`${!positive && '-'}^[1-9]\\d*$`),
  /* 整数 */
  integer: /^-?[1-9]\d*$/,
  /* 浮点数 */
  float: /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/,
  /* 字符串数组验证 */
  alphaArrStr: /^([a-zA-Z]+)+(,[a-zA-Z]+)*$/,
  /* 密码规则验证 */
  password: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^0-9a-zA-Z]).{8,32}$/,
  md5: /^[a-fA-F\d]{32}$/,
  version: /^\d{0,2}\.\d{0,2}\.\d{0,2}/
}

/** 正则规则创建 **/
export function regexRuleCreator(
  key: keyof typeof regexMap,
  message = '内容格式有误',
  trigger = 'blur',
  regexFnArgs = [],
  transform = (val = '') => val.trim()
) {
  const regexItem = regexMap[key]
  const pattern = regexItem instanceof Function ? regexItem(...regexFnArgs) : (regexMap[key] as RegExp)
  return { pattern, message, trigger, transform } as RuleObject
}

const commonRules = {
  require: { required: true, message: '请输入有效内容', trigger: 'blur' },
  integer: {
    type: 'integer',
    message: '请输正整数',
    trigger: 'blur',
    transform: (val: string) => (val ? Number.parseFloat(val) : 0)
  },
  float: {
    type: 'float',
    message: '请输入浮点数',
    trigger: 'blur',
    transform: (val: string) => (val ? Number.parseFloat(val) : 0.1)
  },
  number: {
    type: 'number',
    message: '请输入有效数字',
    trigger: 'blur',
    transform: (val: string) => (val ? Number.parseFloat(val) : 0)
  },
  notLessZero: {
    type: 'number',
    min: 0,
    message: '输入数值必须大于0',
    trigger: 'blur',
    transform: (val: string) => (val ? Number.parseFloat(val) : 0)
  }
}
/** 通用验证规则 **/
export function checkoutCommonRules(keys: (keyof typeof commonRules)[]) {
  return checkoutBy(commonRules, keys)
}

/* 身份证合法性验证 */
export function idCardValidate(rule: any, value: string, callback: (e?: Error) => never) {
  return ChinaIdCardValid(value) ? callback() : callback(new Error('身份证号码不合法'))
}
