<template>
  <view class="login-page">
    <image src="/static/logo.png"></image>
    <view class="name">煮桔</view>
    <view class="btn-box">
      <button class="btn qucik-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" :disabled="btnDisabled">手机号快捷登录</button>
      <button class="btn code-btn" @click="handleCodeLogin"></button>
    </view>
  </view>
</template>

<script>
  import { fastLogin } from '@/api/login.js'
  export default {
    data() {
      return {
        btnDisabled: false
      }
    },
    methods: {
      getPhoneNumber(e) {
        this.btnDisabled = true
        fastLogin({
          code: e.detail.code
        }).then(res => {
          if (res.code === 0) {
            uni.setStorageSync('T-token', res.data.token)
            uni.setStorageSync('userId', res.data.userId)
            if (res.data.registered) {
              uni.reLaunch({
                url: '/pages/index/index'
              })
            } else {
              uni.navigateTo({
                url: '/pages/set-avatar/set-avatar'
              })
            }
          }
        }).finally(() => {
          this.btnDisabled = false
        })
      },
      handleCodeLogin() {
        uni.navigateTo({
          url: '/pages/login-form/login-form'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  text-align: center;
  background: url('http://atta.juzitang.net/ocbg.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: #181818;
  image {
    width: 176rpx;
    height: 180rpx;
    margin-top: 224rpx;
  }
  .name {
    font-size: 56rpx;
    font-family: YouSheBiaoTiYuan;
    color: #FFFFFF;
    line-height: 72rpx;
    letter-spacing: 2px;
    margin-top: 26rpx;
  }
  .btn-box {
    margin-top: 360rpx;
    .btn {
      width: 686rpx;
      height: 120rpx;
      border-radius: 60rpx;
      line-height: 120rpx;
      font-size: 36rpx;
      font-weight: 600;
    }
    .qucik-btn {
      color: #201F2C;
      background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
      margin-bottom: 40rpx;
    }
    .code-btn {
      position: relative;
      background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
      &:after {
        position: absolute;
        content: '手机验证码登录';
        color: #FFFFFF;
        top: 50%;
        left: 50%;
        width: 678rpx;
        height: 112rpx;
        line-height: 114rpx;
        transform: translate(-50%, -50%);
        border-radius: 60rpx;
        background: #060504;
      }
    }
  }
}
</style>
