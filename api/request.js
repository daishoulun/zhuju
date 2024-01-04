// const BASE_URL = 'http://120.26.109.150:8080'
const BASE_URL = window ? '/api' : 'http://120.26.109.150:8080'
const request = (opt) => {
  const token = uni.getStorageSync('T-token');
  const header = opt.header || {}
  header.client = 'mini'
  if (token) {
    header.token = token
  }
  opt.header = header
  opt.url = BASE_URL + opt.url
  return new Promise((resolve, reject) => {
    uni.request({
      ...opt,
      success(res) {
        if (res.data.code === 1001) {
          resolve(res.data || res)
          uni.clearStorageSync()
        } else if (res.data.code === 1003) {
          uni.showToast({
            title: res.data.msg,
            icon:'none'
          })
          uni.reLaunch({
            url: '/pages/set-avatar/set-avatar'
          })
          resolve(res.data || res)
        } else {
          resolve(res.data || res)
        }
      },
      fail(error) {
        reject(error)
      }
    })
  })
}

export default request