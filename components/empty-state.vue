<template>
  <view class="empty-state">
    <image class="empty" src="/static/empty.png"></image>
    <view class="text">{{ msg }}</view>
  </view>
</template>

<script>
  export default {
    name:"empty-state",
    props: {
      msg: {
        type: String,
        default: '这里什么也没有'
      }
    }
  }
</script>

<style lang="scss">
.empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  .empty {
    width: 204rpx;
    height: 204rpx;
  }
  .text {
    font-size: 28rpx;
    font-weight: 400;
    color: #7D7D7D;
    margin-top: 28rpx;
  }
}
</style>