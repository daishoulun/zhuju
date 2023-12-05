import request from './request.js'
// 我参与的活动
export const fetchList = data => {
  return request({
    url: '/user/activity/participation/list',
    method: 'POST',
    data
  })
}
