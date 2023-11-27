<template>
  <view class="account-safe">
    <view v-if="type === '1'" class="old-phone">
      <view class="title">手机号</view>
      <view class="con">
        <view class="phone">
          <text>{{ phone | phoneFilter }}</text>
        </view>
        <view class="btn" @click="isChangePhone = !isChangePhone">更换号码</view>
      </view>
      <view class="log-off" @click="handleLogOff">注销账号</view>
    </view>
    <template v-else-if="type === '2'">
      <view class="new-phone">
        <image class="hi" src="/static/hi.png" mode=""></image>
        <view class="tip">输入新的手机号码</view>
        <view class="input-con">
          <view class="label">+86</view>
          <input type="text">
        </view>
        <view class="send-code" @click="handleSendCode">获取短信验证码</view>
      </view>
    </template>
    <view v-else class="verify-code">
      <view class="phone-info">
        <view>已发送至</view>
        <view>{{ phone }}</view>
      </view>
      <VerifyCode></VerifyCode>
      <view class="btn">重新发送（{{count}}s）</view>
    </view>
    <LogOffModal v-if="logOffModalVisible" @close="logOffModalVisible = false" @confirm="handleLogOff"></LogOffModal>
  </view>
</template>

<script>
  import VerifyCode from '@/components/verify-code.vue'
  import LogOffModal from '@/components/log-off-modal.vue'
  export default {
    components: {
      VerifyCode,
      LogOffModal
    },
    filters: {
      phoneFilter(val) {
        return val.slice(0, 3) + '****' + val.slice(-4)
      }
    },
    data() {
      return {
        logOffModalVisible: false,
        type: '1',
        phone: '13315150000',
        count: 60
      };
    },
    methods: {
      handleSendCode() {
        this.type = '3'
      },
      handleLogOff() {
        this.logOffModalVisible = true
      },
      handleLogOff() {}
    }
  }
</script>

<style lang="scss" scoped>
.account-safe {
  height: calc(100vh - 88rpx);
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
      width: 612rpx;
      height: 132rpx;
      padding: 0 28rpx;
      background: #2B2B2B;
      border-radius: 28rpx;
      font-size: 36rpx;
      color: #FFFFFF;
      margin-bottom: 240rpx;
      .label {
        width: 64rpx;
        margin-right: 50rpx;
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
