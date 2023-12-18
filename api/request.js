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
          uni.showToast({
            title: '登录信息已过期'
          })
          setTimeout(() => {
            uni.reLaunch({
              url: '/pages/login/login'
            })
          }, 300)
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