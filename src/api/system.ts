// 通用接口
import { createRequestConfig, defineFetchApi } from '@wxhccc/smartfetch'

// 获取可配置权限项
export const getNonStaticRights = () => {
  return createRequestConfig('/system/rights')
}
// 新增可配置权限项
export const createNonStaticRights = (data: SystemSettings.Rights.AddParams) => {
  return createRequestConfig('/system/rights', data, 'POST')
}
// 更新可配置权限项
export const updateNonStaticRights = (id: number, data: SystemSettings.Rights.EditParams) => {
  return createRequestConfig(`/system/rights/${id}`, data, 'PUT')
}
export const deleteNonStaticRights = (ids: number | number[]) => {
  const [url, data] = Array.isArray(ids) ? ['/system/rights', ids] : [`/system/rights/${ids}`, undefined]
  return createRequestConfig(url, data, 'DELETE')
}
// 获取所有系统配置项
export const getSystemConfigs = () => {
  return createRequestConfig('/system/configs')
}
// 更新可配置权限项
export const updateSystemConfigs = (data: SystemSettings.Configs.EditParamsItem[]) => {
  return createRequestConfig('/system/configs', data, 'PUT')
}

// 获取所有虚拟路由页面
export const getVirtualPages = () => {
  return createRequestConfig('/system/virtual-pages')
}
// 新增虚拟路由页面
export const getVirtualPageDetail = (id: App.StrOrNum) => {
  return createRequestConfig(`/system/virtual-pages/${id}`)
}
// 新增虚拟路由页面
export const createVirtualPage = (data: VirtualRoutes.AddParams) => {
  return createRequestConfig('/system/virtual-pages', data, 'POST')
}
// 更新虚拟路由页面
export const updateVirtualPage = (id: number, data: VirtualRoutes.EditParams) => {
  return createRequestConfig(`/system/virtual-pages/${id}`, data, 'PUT')
}
export const deleteVirtualPage = (id: App.StrOrNum) => {
  return createRequestConfig(`/system/virtual-pages/${id}`, undefined, 'DELETE')
}