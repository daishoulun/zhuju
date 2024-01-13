<template>
  <view class="start-page">
    <image src="/static/logo.png"></image>
    <view class="name">煮桔</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    onLoad() {
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/index/index'
        })
      }, 1000)
    }
  }
</script>

<style lang="scss" scoped>
.start-page {
  width: 100%;
  height: 100vh;
  text-align: center;
  background: url('http://atta.juzitang.net/ocbg.png');
  background-color: #000000;
  background-size: 100% auto;
  background-repeat: no-repeat;
  image {
    width: 176rpx;
    height: 180rpx;
    margin-top: 500rpx;
  }
  .name {
    font-size: 56rpx;
    font-family: YouSheBiaoTiYuan;
    color: #FFFFFF;
    line-height: 72rpx;
    letter-spacing: 2px;
    margin-top: 26rpx;
  }
}
</style>
