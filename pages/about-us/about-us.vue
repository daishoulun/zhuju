<template>
  <view class="about-us">
    <view class="content">
      <view class="logo-box">
        <image class="logo" src="/static/about-us.png"></image>
      </view>
      <view class="version">版本号:V{{ version }}</view>
    </view>
    <view class="company">杭州桔子糖科技有限公司</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        version: ''
      };
    },
    onLoad() {
      const _this = this
      uni.getSystemInfo({
        success(res) {
          console.log(res)
          _this.version = res.appVersion
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
.about-us {
  height: 100vh;
  background: #181818;
  font-size: 24rpx;
  font-weight: 400;
  color: #7D7D7D;
  .content {
    position: absolute;
    top: 186rpx;
    left: 50%;
    transform: translate(-50%);
    text-align: center;
    .logo-box {
      margin-bottom: 28rpx;
      .logo {
        width: 140rpx;
        height: 240rpx;
      }
    }
  }
  .company {
    position: absolute;
    bottom: 76rpx;
    width: 100%;
    text-align: center;
  }
}
</style>
