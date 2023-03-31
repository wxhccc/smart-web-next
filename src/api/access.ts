// user manage module apis
import { createRequestConfig } from '@wxhccc/smartfetch'

// get users list
export function getUserList (data: User.SearchParams) {
  return createRequestConfig('/access/users', data)
}
// get user detail info
export function getUserInfo (id, data) {
  return createRequestConfig(`/access/users/${id}`, data)
}
// create new user
export function addUser (data: User.AddPrams) {
  return createRequestConfig('/access/users', data, 'POST')
}
// update user's info
export function updateUser (id: App.StrOrNum, data: User.EditParams) {
  return createRequestConfig(`/access/users/${id}`, data, 'PUT')
}
// get the access roles options list of current user
export function getAcessRoleOptions () {
  return createRequestConfig('/access/options/roles')
}
// get group list by cascade
export function searchLevelGroupList (data) {
  return createRequestConfig('/access/options/groups', data)
}
// get groups list
export function getGroupsList (data) {
  return createRequestConfig('/access/groups', data)
}
// add new group
export function addUserGroup (data) {
  return createRequestConfig('/access/groups', data, 'POST')
}
// update group info
export function updateUserGroup (gid, data) {
  return createRequestConfig(`/access/groups/${gid}`, data, 'PUT')
}
// delete groups
export function deleteGroups (id, data) {
  return createRequestConfig(`/access/groups/${id}`, data, 'DELETE')
}
// get roles list
export function getRolesList (data) {
  return createRequestConfig('/access/roles', data)
}
// add new role
export function addRole (data) {
  return createRequestConfig('/access/roles', data, 'POST')
}
// update role info
export function updateRole (rid, data) {
  return createRequestConfig(`/access/roles/${rid}`, data, 'PUT')
}
// delete roles
export function deleteRoles (id, data) {
  return createRequestConfig(`/access/roles/${id}`, data, 'DELETE')
}
// get access right points
export function getAccessRights (data) {
  return createRequestConfig('/access/rights', data)
}
