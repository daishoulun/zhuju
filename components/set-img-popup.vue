<template>
  <view class="set-img-pop">
    <uni-popup ref="popup"  @maskClick="close">
      <view class="set-img-wrap">
        <view class="set-img-con">
          <view class="item" @click="handleItem('camera')">拍摄</view>
          <view class="item" @click="handleItem('album')">手机相册选择</view>
        </view>
        <view class="cancel item" @click="close">取消</view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: "set-img-popup",
  data() {
    return {
    };
  },
  methods: {
    open() {
      this.$refs.popup.open('bottom')
    },
    close() {
      this.$emit('close')
    },
    handleItem(type) {
      this.$emit('click-item', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.set-img-pop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, .3);

  .set-img-wrap {
    position: relative;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    padding: 0 32rpx 48rpx;
    box-sizing: border-box;
    .set-img-con {
      margin-bottom: 20rpx;
      border-radius: 20rpx;
      background: #fff;
    }
    .item {
      height: 104rpx;
      line-height: 104rpx;
      font-size: 34rpx;
      font-weight: 400;
      color: #201F2C;
      box-sizing: border-box;
      text-align: center;
    }
    .cancel {
      height: 88rpx;
      background: #fff;
      line-height: 88rpx;
      font-weight: 500;
      border-radius: 20rpx;
    }
  }
}
</style>