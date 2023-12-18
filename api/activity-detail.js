
import request from './request.js'
// 互动详情
export const fetchDetail = data => {
  return request({
    url: '/activity/detail',
    method: 'POST',
    data
  })
}

export const joinActivity = data => {
  return request({
    url: '/user/activity/user/join',
    method: 'POST',
    data
  })
}

// 支付
export const activityPay = data => {
  return request({
    url: '/pay/activity/join',
    method: 'POST',
    data
  })
}

export const queryPayResult = data => {
  return request({
    url: '/pay/activity/create/query',
    method: 'POST',
    data
  })
}