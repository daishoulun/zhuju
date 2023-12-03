import request from './request.js'
// 验证码登录
export const login = data => {
  return request({
    url: '/code/login',
    method: 'POST',
    data
  })
}
export const getCode = data => {
  return request({
    url: '/login/code',
    method: 'POST',
    data
  })
}
// 一键登录
export const fastLogin = data =>  {
  return request({
    url: '/fast/login',
    method: 'POST',
    data
  })
}

export const register = data => {
  return request({
    url: '/finish/register',
    method: 'POST',
    data
  })
}

export const getAliInfo = data => {
  return request({
    url: '/alioss/signature',
    method: 'POST',
    data
  })
}