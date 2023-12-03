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