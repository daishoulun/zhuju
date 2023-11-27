<template>
  <view class="active-list">
    <view class="active-item">
      <view class="active-con">
        <text class="status-tag">
          进行中
        </text>
      </view>
      <view class="active-footer">
        <view class="title">今晚有人一起约酒吗？</view>
        <view class="info-bar">
          <view class="user-info">
            <image src="/static/logo.png" mode=""></image>
            <text class="name">张三</text>
          </view>
          <view class="forward">
            <image src="/static/forward-arrow.png"></image>
            <text class="num">88</text>
          </view>
        </view>
      </view>
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
    border-radius: 16rpx;
    margin-right: 10px;
    overflow: hidden;
    &:nth-of-type(2n) {
      margin-right: 0;
    }
    .active-con {
      height: 408rpx;
      background: #D8D8D8;
    }
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
    .active-footer {
      height: 132rpx;
      padding: 24rpx 16rpx 0 20rpx;
      background: #262626;
      .title {
        font-size: 26rpx;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 36rpx;
        margin-bottom: 16rpx;
      }
      .info-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user-info {
          display: flex;
          align-items: center;
          font-size: 22rpx;
          font-weight: 400;
          color: #7D7D7D;
          image {
            width: 36rpx;
            height: 36rpx;
            border-radius: 50%;
            margin-right: 8rpx;
          }
        }
        .forward {
          font-size: 26rpx;
          font-weight: 400;
          color: #FFFFFF;
          image {
            width: 28rpx;
            height: 28rpx;
            margin-right: 8rpx;
          }
        }
      }
    }
  }
}
</style>