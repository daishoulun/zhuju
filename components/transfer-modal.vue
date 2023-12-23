<template>
  <view class="transfer-pop">
    <uni-popup ref="popup" @maskClick="close">
      <view class="transfer-wrap">
        <view class="transfer-header">
          分享至
          <image class="close" src="/static/close.png" mode="" @click="close"></image>
        </view>
        <view class="share-list">
          <button class="share-item" open-type="share">
            <view class="share-icon">
              <image src="/static/wx.png" mode=""></image>
            </view>
            <view class="share-text">微信好友</view>
          </button>
          <button class="share-item" open-type="share">
            <view class="share-icon">
              <image src="/static/wx-firend.png" mode=""></image>
            </view>
            <view class="share-text">朋友圈</view>
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import CommentList from './comment-list.vue'
export default {
  name: "transfer-popup",
  components: {
    CommentList
  },
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
    }
  },
}
</script>

<style lang="scss" scoped>
.transfer-pop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: red;
  z-index: 999;
  background: rgba(0, 0, 0, .3);

  .transfer-wrap {
    position: relative;
    width: 750rpx;
    background: #181818;
    border-radius: 48rpx 48rpx 0rpx 0rpx;
    font-size: 32rpx;
    font-weight: 500;
    padding: 32rpx 32rpx 160rpx;
    box-sizing: border-box;
    color: #FFFFFF;

    .transfer-header {
      position: relative;
      text-align: center;
      margin-bottom: 128rpx;

      .close {
        float: right;
        width: 24rpx;
        height: 24rpx;
        margin-top: 8rpx;
      }
    }

    .share-list {
      display: flex;

      .share-item {
        width: 100rpx;
        margin-right: 78rpx;
        font-size: 24rpx;
        font-weight: 500;
        padding-left: 0;
        padding-right: 0;
        background: transparent;
        color: #FFFFFF;
        text-align: center;
        margin-left: 0;
        border: none;
        border-radius: 0;

        .share-icon {
          width: 98rpx;
          height: 98rpx;
          margin-bottom: 20rpx;
          margin: 0 auto 20rpx;

          image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>