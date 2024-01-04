<template>
  <view class="modal-wrap">
    <view class="modal">
      <view class="title">
        <slot name="title"></slot>
      </view>
      <view class="content">
        <slot></slot>
      </view>
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script>
  export default {
    name:"modal-wrap",
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss" scoped>
.modal-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .6);
  z-index: 9999;
  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 638rpx;
    background: #FFFFFF;
    border-radius: 36rpx;
    box-sizing: border-box;
    padding: 32rpx 40rpx;
    .title {
      font-size: 36rpx;
      font-weight: 500;
      color: #333333;
      margin-bottom: 68rpx;
      text-align: center;
    }
    .content {
      font-size: 28rpx;
      font-weight: 400;
      color: #7D7D7D;
      margin-bottom:  96rpx;
    }
  }
}
</style>