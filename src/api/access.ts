// user manage module apis
import { createRequestConfig } from '@wxhccc/smartfetch'

// get users list
export function getUserList (data: User.SearchParams) {
  return createRequestConfig('/access/users', data)
}
// get user detail info
export function getUserInfo (id: App.StrOrNum) {
  return createRequestConfig(`/access/users/${id}`)
}
// create new user
export function addUser (data: User.AddParams) {
  return createRequestConfig('/access/users', data, 'POST')
}
// update user's info
export function updateUser (id: App.StrOrNum, data: User.EditParams) {
  return createRequestConfig(`/access/users/${id}`, data, 'PUT')
}
// update user's info
export function deleteUser (id: App.StrOrNum) {
  return createRequestConfig(`/access/users/${id}`, undefined, 'DELETE')
}
// get the access roles options list of current user
export function getAcessRoleOptions () {
  return createRequestConfig('/access/options/roles')
}
// get group list by cascade
export function getGroupOptions (data?: Group.OptionSearchParams) {
  return createRequestConfig('/access/options/groups', data)
}
// get groups list
export function getGroupsList (data: Group.SearchParams) {
  return createRequestConfig('/access/groups', data)
}
// get all groups list
export function getAllGroups () {
  return createRequestConfig('/access/groups/all')
}
// add new group
export function addUserGroup (data: Group.AddParams) {
  return createRequestConfig('/access/groups', data, 'POST')
}
// update group info
export function updateUserGroup (id: App.StrOrNum, data: Group.EditParams) {
  return createRequestConfig(`/access/groups/${id}`, data, 'PUT')
}
// delete groups
export function deleteGroups (id: App.StrOrNum) {
  return createRequestConfig(`/access/groups/${id}`, undefined, 'DELETE')
}
// get roles list
export function getRoleList (data: Role.SearchParams) {
  return createRequestConfig('/access/roles', data)
}
// add new role
export function addRole (data: Role.AddParams) {
  return createRequestConfig('/access/roles', data, 'POST')
}
// update role info
export function updateRole (id: App.StrOrNum, data: Role.EditParams) {
  return createRequestConfig(`/access/roles/${id}`, data, 'PUT')
}
// delete roles
export function deleteRole (id: App.StrOrNum) {
  return createRequestConfig(`/access/roles/${id}`, undefined, 'DELETE')
}
// get access right points
export function getRightsTreeOptions () {
  return createRequestConfig('/access/options/rights')
}
