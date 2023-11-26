<template>
  <view class="activity-card">
    <view class="activity-cover">
      <image src="/static/cover.jpg"></image>
    </view>
    <view class="activity-con">
      <view class="title">跳海 酒局聚乐会</view>
      <view class="time">12月10日 22:00-24:00备份</view>
      <view class="btn-state">进行中</view>
    </view>
    <view class="activity-footer">
      <view class="local">
        <image src="/static/location.png" mode=""></image>
        <text>皇后商务会所</text>
      </view>
      <view>
        <text class="label">距离开始时间：</text>
        <text class="time">06分43秒</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"activity-card",
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss" scoped>
.activity-card {
  position: relative;
  width: 100%;
  height: 258rpx;
  padding: 24rpx 20rpx;
  border-top: 18rpx solid #181818;
  background-color: #262626;
  box-sizing: border-box;
  .activity-cover {
    position: absolute;
    top: -18rpx;
    left: 12rpx;
    width: 120rpx;
    height: 163rpx;
    border-radius: 20rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .activity-con {
    position: relative;
    margin-left: 156rpx;
    .title {
      font-size: 28rpx;
      font-weight: 500;
      color: #FFFFFF;
    }
    .time {
      font-size: 22rpx;
      font-weight: 400;
      color: #7D7D7D;
      margin-top: 14rpx;
    }
    .btn-state {
      position: absolute;
      top: 0;
      right: 0;
      width: 132rpx;
      height: 68rpx;
      background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
      border-radius: 32rpx;
      line-height: 68rpx;
      text-align: center;
      font-size: 24rpx;
      font-weight: 600;
      color: #201F2C;
      &.btn-end {
        background: #4A4A4A;
      }
    }
  }
  .activity-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 66rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #7D7D7D;
    .local {
      display: flex;
      align-items: center;
      image {
        width: 24rpx;
        height: 24rpx;
      }
    }
    .time {
      color: #FFFFFF;
    }
  }
}
</style>