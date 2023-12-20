import request from './request.js'
// 动态详情
export const queryDynamicsDetail = data => {
  return request({
    url: '/moment/detail',
    method: 'POST',
    data
  })
}

