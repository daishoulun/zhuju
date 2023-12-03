import request from './request.js'
// 推荐列表
export const fetchUserInfo = data => {
  return request({
    url: '/user/info/detail',
    method: 'POST',
    data
  })
}

export const getProfile = data => {
  return request({
    url: '/user/info/profile',
    method: 'POST',
    data
  })
}

export const editInfo = data => {
  return request({
    url: '/user/info/edit',
    method: 'POST',
    data
  })
}