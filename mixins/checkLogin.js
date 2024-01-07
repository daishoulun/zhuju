import { fetchUserInfo } from '@/api/person-center.js'
export default {
  methods: {
    handleCheckLogin(cb) {
      const token = uni.getStorageSync('T-token')
      if (!token) {
        uni.$emit('login')
      }
      const userId = uni.getStorageSync('userId')
      if (userId) {
        return new Promise((resolve, reject) => {
          fetchUserInfo({ userId }).then(res => {
            if (res.code === 0) {
              cb && cb()
              resolve('success')
            } else {
              uni.$emit('login')
              reject('error')
            }
          })
        })
      }
    }
  }
}