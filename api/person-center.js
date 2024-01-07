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
// 获取我参与的活动
export const getActivityList = data => {
    return request({
      url: '/activity/list',
      method: 'POST',
      data
    })
}

// 获取个人动态
export const getMomentList = data => {
  return request({
    url: '/moment/list',
    method: 'POST',
    data
  })
}

// 取消点赞
export const cancelLike = data => {
  return request({
    url: '/moment/like/cancel',
    method: 'POST',
    data
  })
}
// 点赞
export const createLike = data => {
  return request({
    url: '/moment/like/create',
    method: 'POST',
    data
  })
}

// 拉黑
export const joinBlack = data => {
  return request({
    url: '/user/chat/blacklist/setting',
    method: 'POST',
    data
  })
}

// 举报
export const reportUser = data => {
  return request({
    url: '/user/chat/report',
    method: 'POST',
    data
  })
}