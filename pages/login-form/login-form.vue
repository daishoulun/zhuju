<template>
  <view class="login-form">
    <image class="hi" src="/static/hi.png" mode=""></image>
    <view class="tip">欢迎来到煮桔</view>
    <view class="form">
      <view class="input-con">
        <view class="label">+86</view>
        <input type="text" v-model="form.phone" placeholder="请输入手机号">
      </view>
      <view class="input-con code-input">
        <input type="text" v-model="form.code" placeholder="输入验证码" :maxlength="6">
        <text class="send-code" @click="handleCode">{{ codeText }}</text>
      </view>
      <view class="policy">
        <checkbox @click="handlePolicy" /> 我已阅读并同意<text @click="handleViewPolicy">《隐私权政策》</text>
      </view>
      <button class="btn" :class="{ canLogin: isCanLogin }" @click="handleLogin">登录</button>
    </view>
    <UserAgreement v-if="userAgreementVisible"></UserAgreement>
  </view>
</template>

<script>
  import UserAgreement from '@/components/user-agreement/user-agreement.vue'
  import { login, getCode } from '@/api/login.js'
  const phoneReg = /^1\d{10,}$/
  export default {
    components: { UserAgreement },
    data() {
      return {
        userAgreementVisible: false,
        checked: false,
        form: {
          phone: '',
          code: ''
        },
        codeText: '发送验证码',
        num: 0
      };
    },
    computed: {
      isCanLogin() {
        if (this.form.phone && this.form.code && this.checked) {
          return true
        }
        return false
      }
    },
    methods: {
      handleLogin() {
        if (!this.checked) {
          this.$showToast('请阅读并同意《隐私权政策》')
          return
        }
        if (!this.form.phone) {
          this.$showToast('请输入手机号')
          return
        }
        if (!phoneReg.test(this.form.phone)) {
          this.$showToast('手机号格式不正确')
          return
        }
        if (!this.form.code) {
          this.$showToast('请输入验证码')
          return
        }
        login(this.form).then(res => {
          if (res.code === 0) {
            uni.setStorageSync('T-token', res.data.token)
            uni.setStorageSync('userId', res.data.userId)
            if (res.data.registered) {
              uni.switchTab({
                url: '/pages/index/index'
              })
            } else {
              uni.navigateTo({
                url: '/pages/set-avatar/set-avatar'
              })
            }
          } else {
            this.$showToast(res.msg)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      async handleCode() {
        if (this.num > 0) {
          return
        }
        if (!this.form.phone) {
          this.$showToast('请输入手机号')
          return
        }
        if (!phoneReg.test(this.form.phone)) {
          this.$showToast('手机号格式不正确')
          return
        }
        const res = await getCode({ phone: this.form.phone })
        if (res.code === 0) {
          this.num = 60
          this.codeText = this.num + 's'
          let timer = setInterval(() => {
            this.num--
            this.codeText = this.num + 's'
            if (this.num <= 0) {
              this.codeText = '重新获取'
              clearInterval(timer)
            }
          }, 1000)
          this.$showToast('发送成功')
          this.form.code = res.data.code
        } else {
          this.$showToast(res.msg)
        }
      },
      handlePolicy(val) {
        this.checked = !this.checked
      },
      handleViewPolicy() {
        uni.navigateTo({
          url: '/pages/protocol-policy/protocol-policy'
        })
      }
    }
  }
</script>

<style lang="scss">
.login-form {
  height: calc(100vh - 88rpx);
  background: #181818;
  padding: 72rpx;
  box-sizing: border-box;
  .hi {
    width: 56rpx;
    height: 44rpx;
  }
  .tip {
    font-size: 52rpx;
    color: #DCAEF4;
    margin-bottom: 56rpx;
  }
  .input-con {
    display: flex;
    align-items: center;
    width: 100%;
    height: 132rpx;
    padding: 0 28rpx;
    background: #2B2B2B;
    border-radius: 28rpx;
    font-size: 36rpx;
    color: #FFFFFF;
    box-sizing: border-box;
    .label {
      width: 64rpx;
      margin-right: 50rpx;
    }
    input {
      flex: 1;
    }
  }
  .code-input {
    position: relative;
    margin: 24rpx 0 124rpx;
    .send-code {
      position: absolute;
      top: 50%;
      right: 28rpx;
      transform: translateY(-50%);
      font-size: 32rpx;
      font-weight: 500;
      color: #DCAEF4;
    }
  }
  ::v-deep .input-placeholder {
    font-size: 36rpx;
    font-weight: 500;
    color: #5C5C5C;
  }
  .policy {
    text-align: center;
    font-size: 24rpx;
    font-weight: 400;
    color: #777777;
    margin-bottom: 26rpx;
    text {
      color: #fff;
    }
    ::v-deep .uni-checkbox-input {
      width: 24rpx;
      height: 24rpx;
      border-radius: 50%;
      border-color: #FFFFFF;
      background: rgba(216,216,216,0.3);
      margin-right: 10rpx;
      &::before {
        font-size: 24rpx;
        color: #fff;
      }
    }
  }
  .btn {
    height: 120rpx;
    line-height: 120rpx;
    background: #5C5C5C;
    border-radius: 60rpx;
    font-size: 36rpx;
    font-weight: 600;
    color: #201F2C;
    &.canLogin {
      background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
    }
  }
}
</style>
