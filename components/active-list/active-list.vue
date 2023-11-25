<template>
  <view class="active-list">
    <view class="active-item">
      <text class="status-tag">
        进行中
      </text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"active-list",
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
.active-list {
  display: flex;
  justify-content: space-between;
  .active-item {
    position: relative;
    width: 338rpx;
    height: 408rpx;
    background: #D8D8D8;
    border-radius: 16rpx;
    margin-right: 10px;
    .status-tag {
      position: absolute;
      top: 16rpx;
      left: 12rpx;
      width: 96rpx;
      height: 40rpx;
      border-radius: 20rpx;
      text-align: center;
      line-height: 40rpx;
      background-color: #343434;
      font-size: 20rpx;
      font-weight: 500;
      color: #FFFFFF;
      &.progress {
        color: #201F2C;
        background-color: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
      }
    }
  }
}
</style>