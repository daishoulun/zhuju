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
        if ([1001, 1006].includes(res.data.code)) {
          uni.clearStorageSync()
          uni.$emit('login')
          reject(res.data || res)
        } else if (res.data.code === 1003) {
          // 注册信息没有填写的状态
          uni.showToast({
            title: res.data.msg,
            icon:'none'
          })
          uni.reLaunch({
            url: '/pages/set-avatar/set-avatar'
          })
          resolve(res.data || res)
        } else if ([1004, 1005].includes(res.data.code)) {
          // 用户被踢下线或顶下线
          uni.showToast({
            title: res.data.msg,
            icon:'none'
          })
          setTimeout(() => {
            uni.reLaunch({
              url: '/pages/login/login'
            })
          }, 300)
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