<template>
  <view class="dynamics-list">
    <view class="dynamics-item">
      <view class="like">
        <image class="like-icon" :src="linkCon"></image>
        100
      </view>
    </view>
    <view class="dynamics-item">
      <view class="like">
        <image class="like-icon" :src="linkCon"></image>
        100
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"dynamics-list",
    data() {
      return {
        isLike: true
      };
    },
    computed: {
      linkCon() {
        if (this.isLike) {
          return '../../static/like-active.png'
        } else {
          return '../../static/like.png'
        }
      }
    }
  }
</script>

<style lang="scss">
.dynamics-list {
  display: flex;
  justify-content: space-between;
  .dynamics-item {
    position: relative;
    width: 338rpx;
    height: 408rpx;
    background: #D8D8D8;
    border-radius: 16rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    &:nth-of-type(2n) {
      margin-right: 0;
    }
    .like {
      position: absolute;
      bottom: 20rpx;
      left: 14rpx;
      display: flex;
      align-items: center;
      font-size: 26rpx;
      font-weight: 400;
      color: #FFFFFF;
      text-shadow: 0px 4px 8px rgba(0,0,0,0.5);
      image {
        width: 28rpx;
        height: 28rpx;
        margin-right: 12rpx;
      }
      &.progress {
        color: #201F2C;
        background-color: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
      }
    }
  }
}
</style>