
import request from './request.js'
// 互动详情
export const fetchDetail = data => {
  return request({
    url: '/activity/detail',
    method: 'POST',
    data
  })
}
