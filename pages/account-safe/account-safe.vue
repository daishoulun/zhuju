<template>
  <view class="account-safe">
    <view v-if="type === '1'" class="old-phone">
      <view class="title">手机号</view>
      <view class="con">
        <view class="phone">
          <text>{{ userInfo.phone | phoneFilter }}</text>
        </view>
        <view class="btn" @click="type = '2'">更换号码</view>
      </view>
      <view class="log-off" @click="handleLogOff">注销账号</view>
    </view>
    <template v-else-if="type === '2'">
      <view class="new-phone">
        <image class="hi" src="/static/hi.png" mode=""></image>
        <view class="tip">输入新的手机号码</view>
        <view class="input-con">
          <view class="label">+86<image class="caret" src="@/static/caret.png"></image></view>
          <input type="text" v-model="newPhone">
        </view>
        <view class="send-code" @click="handleSendCode">{{ codeText }}</view>
      </view>
    </template>
    <view v-else class="verify-code">
      <view class="phone-info">
        <view>已发送至</view>
        <view>{{ newPhone }}</view>
      </view>
      <VerifyCode @change="handleUpdatePhone"></VerifyCode>
      <view class="btn">重新发送<text v-if="num > 0">（{{num}}s）</text></view>
    </view>
    <LogOffModal v-if="logOffModalVisible" @close="logOffModalVisible = false" @confirm="confirmLogOff"></LogOffModal>
  </view>
</template>

<script>
  import VerifyCode from '@/components/verify-code.vue'
  import LogOffModal from '@/components/log-off-modal.vue'
  import { fetchUserInfo } from '@/api/person-center.js'
  import { getCode, updatePhone, delAccount } from '@/api/account-safe.js'
  export default {
    components: {
      VerifyCode,
      LogOffModal
    },
    filters: {
      phoneFilter(val = '') {
        return val.slice(0, 3) + '****' + val.slice(-4)
      }
    },
    data() {
      return {
        isChangePhone: false,
        logOffModalVisible: false,
        type: '1',
        codeText: '获取短信验证码',
        userInfo: {},
        num: 0,
        newPhone: ''
      };
    },
    onShow() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo(userId) {
        fetchUserInfo({ userId: uni.getStorageSync('userId') }).then(res => {
          this.userInfo = res.data || {}
          uni.setStorageSync('userInfo', JSON.stringify(this.userInfo))
        })
      },
      async handleSendCode() {
        const phoneReg = /^1\d{10,}/
        if (this.num > 0) {
          return
        }
        if (!this.newPhone) {
          this.$showToast('请输入手机号')
          return
        }
        if (!phoneReg.test(this.newPhone)) {
          this.$showToast('手机号格式不正确')
          return
        }
        const res = await getCode({ phone: this.newPhone })
        if (res.code === 0) {
          this.num = 60
          this.type = '3'
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
        } else {
          this.$showToast(res.msg)
        }
      },
      handleLogOff() {
        this.logOffModalVisible = true
      },
      confirmLogOff() {
        delAccount().then(res => {
          if (res.code === 0) {
            uni.clearStorageSync()
            uni.reLaunch({
              url: '/pages/index/index'
            })
          }
        })
      },
      handleUpdatePhone(val) {
        updatePhone({ code: val, phone: this.newPhone }).then(res => {
          if (res.code === 0) {
            this.$showToast('修改成功')
            this.type = '1'
            this.getUserInfo()
            this.newPhone = ''
            this.codeText = '获取短信验证码'
          } else {
            this.$showToast(res.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.account-safe {
  height: 100vh;
  background: #181818;
  .old-phone {
    padding: 40rpx 32rpx 60rpx;
    box-sizing: border-box;
    
    .title {
      font-size: 28rpx;
      font-weight: 400;
      color: #7D7D7D;
    }
    .con {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 14rpx;
      .phone {
        font-size: 32rpx;
        font-weight: 500;
        color: #FFFFFF;
      }
      .btn {
        width: 148rpx;
        height: 56rpx;
        background: #262626;
        border-radius: 28rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 56rpx;
        text-align: center;
      }
    }
  }
  .log-off {
    position: absolute;
    bottom: 60rpx;
    width: 686rpx;
    height: 84rpx;
    background: #262626;
    border-radius: 60rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #7D7D7D;
    line-height: 84rpx;
    text-align: center;
  }
  .new-phone {
    padding: 58rpx 68rpx;
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
      margin-bottom: 240rpx;
      box-sizing: border-box;
      .label {
        display: flex;
        align-items: center;
        width: 100rpx;
        margin-right: 50rpx;
        .caret {
          width: 30rpx;
          height: 30rpx;
          margin-left: 6rpx;
        }
      }
      input {
        flex: 1;
      }
    }
    .send-code {
      width: 612rpx;
      height: 120rpx;
      background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
      border-radius: 60rpx;
      text-align: center;
      line-height: 120rpx;
      font-size: 36rpx;
      font-weight: 600;
      color: #201F2C;
    }
  }
  .verify-code {
    .phone-info {
      padding: 48rpx 70rpx 70rpx;
      font-size: 44rpx;
      font-weight: 500;
      color: #DCAEF4;
      line-height: 60rpx;
    }
    .btn {
      width: 612rpx;
      height: 120rpx;
      background: #5C5C5C;
      border-radius: 60rpx;
      margin-top: 252rpx;
      line-height: 120rpx;
      text-align: center;
      font-size: 36rpx;
      font-weight: 600;
      margin: 252rpx auto 0;
      color: #201F2C;
    }
  }
}
</style>
