<template>
  <ModalWrap class="login-modal">
    <text slot="title">请先登录后查看更多精彩内容</text>
    <view slot="footer">
      <view class="btn" @click="handleLogin">去登录</view>
      <view class="no-agree">
        <text class="no-agree-btn" @click="close">取消</text>
      </view>
    </view>
  </ModalWrap>
</template>

<script>
  import ModalWrap from './modal-wrap/modal-wrap.vue'
  export default {
    name:"login-modal",
    components: {
      ModalWrap
    },
    data() {
      return {
        
      };
    },
    methods: {
      close() {
        this.$emit('close')
      },
      handleLogin() {
        uni.navigateTo({
          url: '/pages/login/login'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.login-modal {
  .btn {
    width: 576rpx;
    height: 84rpx;
    background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
    border-radius: 42rpx;
    text-align: center;
    line-height: 84rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #201F2C;
    margin-bottom: 28rpx
  }
  .no-agree {
    text-align: center;
    .no-agree-btn {
      font-size: 28rpx;
      font-weight: 400;
      color: #7D7D7D;
    }
  }
}
</style>