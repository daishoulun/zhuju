import request from './request.js'
// 获取修改手机号验证码
export const getCode = data => {
  return request({
    url: '/account/phone/update/code',
    method: 'POST',
    data
  })
}
// 修改登录手机号
export const updatePhone = data => {
  return request({
    url: '/account/phone/update',
    method: 'POST',
    data
  })
}
// 注销账号
export const delAccount = ()=> {
  return request({
    url: '/cancel/account',
    method: 'POST',
  })
}