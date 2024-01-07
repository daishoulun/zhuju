<template>
  <view class="person-more-pop">
    <uni-popup ref="popup" background-color="#181818" @maskClick="close">
      <view class="person-more-wrap">
        <view class="person-more-header">
          <image class="close" src="/static/close.png" mode="" @click="close"></image>
        </view>
        <view class="person-more-con">
          <view class="item" @click="joinBlack">拉黑</view>
          <view class="item" @click="reportUser">举报</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: "person-more-popup",
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
    joinBlack() {
      this.$emit('join-black')
    },
    reportUser() {
      this.$emit('report-user')
    }
  }
}
</script>

<style lang="scss" scoped>
.person-more-pop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, .3);

  .person-more-wrap {
    position: relative;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    padding: 0 32rpx;
    box-sizing: border-box;
    .person-more-header {
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      text-align: right;
      .close {
        width: 24rpx;
        height: 24rpx;
      }
    }
    .person-more-con {
      padding: 24rpx 0;
      .item {
        height: 120rpx;
        line-height: 120rpx;
        background: #262626;
        border-radius: 62rpx;
        font-size: 28rpx;
        font-weight: 500;
        color: #FFFFFF;
        margin-bottom: 28rpx;
        padding: 0 44rpx;
        box-sizing: border-box;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>