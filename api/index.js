import request from './request.js'
// 推荐列表
export const fetchRecommendList = data => {
  return request({
    url: '/home/activity/list',
    method: 'POST',
    data
  })
}
// 关注列表
export const fetchFollowList = data => {
  return request({
    url: '/home/follow/list',
    method: 'POST',
    data
  })
}
// 动态列表
export const fetchMomentList = data =>  {
  return request({
    url: '/home/moment/list',
    method: 'POST',
    data
  })
}

export const fetchCommentList = data => {
  return request({
    url: '/moment/comment/list',
    method: 'POST',
    data
  })
}

export const sendComment = data => {
  return request({
    url: '/moment/comment/create',
    method: 'POST',
    data
  })
}