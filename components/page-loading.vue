<template>
  <view class="page-loading">
    <image class="loading" src="http://atta.juzitang.net/mini/BrowserPreview_tmp.gif"></image>
  </view>
</template>

<style lang="scss" scoped>
.page-loading {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .8);
  z-index: 9;

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300rpx;
    height: 300rpx;
  }
}
</style>