import fetch from '@/utils/fetch'

export function login(params) {
  return fetch({
    url: '/account/login',
    method: 'post',
    data: params
  })
}

export function perms() {
  return fetch({
    url: '/account/perms',
    method: 'get'
  })
}

export function changePassword(params) {
  return fetch({
    url: '/account/changePassword',
    method: 'post',
    data: params
  })
}

export function logout() {
  return fetch({
    url: '/account/logout',
    method: 'get'
  })
}
