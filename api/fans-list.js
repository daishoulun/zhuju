import request from './request.js'
export const fetchFansList = data => {
  return request({
    url: '/user/friend/fans/list',
    method: 'POST',
    data
  })
}

export const cancelFollow = data => {
  return request({
    url: '/user/friend/follow/delete',
    method: 'POST',
    data
  })
}

export const createFollow = data => {
  return request({
    url: '/user/friend/follow/create',
    method: 'POST',
    data
  })
}

export const fetchFollowList = data => {
  return request({
    url: '/user/friend/follow/list',
    method: 'POST',
    data
  })
}

export const fetchFirendList = data => {
  return request({
    url: '/user/friend/list',
    method: 'POST',
    data
  })
}

