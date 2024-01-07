<template>
  <ModalWrap class="join-black-modal">
    <text slot="title">拉黑后将无法查看该用户发布的活动、动态，不会收到对方发来的消息，是否确认？</text>
    <view slot="footer" class="footer">
      <view class="btn cancel-btn" @click="handleConfirm">确认</view>
      <view class="btn confirm-btn" @click="close"></view>
    </view>
  </ModalWrap>
</template>

<script>
  import ModalWrap from './modal-wrap/modal-wrap.vue'
  export default {
    name: "join-black-modal",
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
      handleConfirm() {
        this.$emit('confirm')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .join-black-modal {
    .footer {
      display: flex;
      justify-content: space-between;

      .btn {
        width: 280rpx;
        height: 84rpx;
        border-radius: 42rpx;
        flex: 1;
        text-align: center;
        line-height: 84rpx;
        font-size: 32rpx;
        font-weight: 400;
        color: #201F2C;
        overflow: hidden;
      }

      .cancel-btn {
        background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
        margin-right: 12rpx;
      }

      .confirm-btn {
        position: relative;
        background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
        &:after {
          position: absolute;
          content: '取消';
          top: 50%;
          left: 50%;
          width: 270rpx;
          height: 78rpx;
          transform: translate(-50%, -50%);
          border-radius: 40rpx;
          background: #fff;
        }
      }
    }
  }
</style>