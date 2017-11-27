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

