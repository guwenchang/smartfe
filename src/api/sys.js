import fetch from '@/utils/fetch'

// 菜单列表
export function getMenuList() {
  return fetch({
    url: '/sysMenu/list',
    method: 'get'
  })
}
// 菜单详情
export function getMenuDetail(params) {
  return fetch({
    url: '/sysMenu/detail/' + params,
    method: 'get'
  })
}
// 菜单保存
export function saveMenu(params) {
  return fetch({
    url: '/sysMenu/save',
    method: 'post',
    data: params
  })
}

// 角色列表
export function getRoleList() {
  return fetch({
    url: '/sysRole/list',
    method: 'get'
  })
}
// 角色详情
export function getRoleDetail(params) {
  return fetch({
    url: '/sysRole/detail/' + params,
    method: 'get'
  })
}
// 角色保存
export function saveRole(params) {
  return fetch({
    url: '/sysRole/save',
    method: 'post',
    data: params
  })
}

// 系统用户列表
export function getUserList(params) {
  return fetch({
    url: '/sysUser/list',
    method: 'post',
    data: params
  })
}
// 系统用户详情
export function getUserDetail(params) {
  return fetch({
    url: '/sysUser/detail/' + params,
    method: 'get'
  })
}
// 系统用户保存
export function saveUser(params) {
  return fetch({
    url: '/sysUser/save',
    method: 'post',
    data: params
  })
}
// 字典列表
export function getDicList(params) {
  return fetch({
    url: '/dic/list',
    method: 'post',
    data: params
  })
}
// 字典详情
export function getDicDetail(params) {
  return fetch({
    url: '/dic/detail/' + params,
    method: 'get'
  })
}
// 字典保存
export function saveDic(params) {
  return fetch({
    url: '/dic/save',
    method: 'post',
    data: params
  })
}

