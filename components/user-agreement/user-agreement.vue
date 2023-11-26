<template>
  <ModalWrap class="user-agreement">
    <text slot="title">用户使用协议</text>
    <view class="content">
      我们非常重视保护您的个人信息和隐私，使用煮橘小程序前需您务必审慎阅读<text class="agrement">《用户服务协议》</text>和<text class="agrement">《隐私权政策》</text>并充分理解相关协议条款以了解我们是如何收集和使用您的个人信息。
    </view>
    <view slot="footer">
      <view class="btn">同意</view>
      <view class="no-agree">
        <text class="no-agree-btn">暂不同意</text>
      </view>
    </view>
  </ModalWrap>
</template>

<script>
  import ModalWrap from '../modal-wrap/modal-wrap.vue'
  export default {
    name:"user-agreement",
    components: {
      ModalWrap
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss" scoped>
.user-agreement {
  .agrement {
    color: #DCAEF4;
  }
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