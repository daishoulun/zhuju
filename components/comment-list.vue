<template>
  <view class="comment-list-main" :class="{ 'comment-list-main-parent': level === 1 }">
    <view class="comment-list">
      <view class="comment-item" v-for="ind in 3" :key="ind">
        <view class="comment-main">
          <view class="user-avatar">
            <image src="/static/logo.png" mode=""></image>
          </view>
          <view class="comment-con">
            <view class="user-name">慧慧 <text class="author">作者</text> </view>
            <view class="comment-text">真的ktv内比较黑，我建议大家不要戴墨镜，差点摔成文物，要带就带荧光灯</view>
            <view class="action-bar">
              <text class="time">48分钟前</text>
              <text class="reply" @click="handleReply">回复TA</text>
            </view>
            <comment-list
              v-if="hasSub"
              class="sub-comment-list"
              :level="level + 1"
              :hasSub="false"
            ></comment-list>
          </view>
        </view>
      </view>
    </view>
    <view v-if="level === 1" class="comment-section">
      <input class="comment-input" type="text" :placeholder="placeholder">
    </view>
  </view>
</template>

<script>
  export default {
    name:"comment-list",
    props: {
      hasSub: {
        type: Boolean,
        default: false
      },
      level: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        placeholder: '输入你想说的话…'
      }
    },
    methods: {
      handleReply(val) {
        this.placeholder = '回复慧慧'
      },
      open() {
        this.$refs.popup.open('bottom')
      },
      close() {
        this.$emit('close')
      }
    }
  }
</script>
<style lang="scss" scoped>
.comment-list-main {
  position: relative;
  &.comment-list-main-parent {
    padding-bottom: 160rpx;
    height: calc(100% - 88rpx);
  }
  .comment-list {
    height: 100%;
    overflow-y: auto;
    padding: 0 32rpx;
    .comment-main {
      display: flex;
      .user-avatar {
        width: 88rpx;
        height: 88rpx;
        margin-right: 12rpx;
        image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .comment-con {
        flex: 1;
        .user-name {
          font-size: 24rpx;
          font-weight: 500;
          color: #7D7D7D;
          .author {
            padding: 4rpx 12rpx;
            background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
            border-radius: 16rpx;
            font-size: 16rpx;
            font-weight: 500;
            color: #201F2C;
            margin-left: 12rpx;
          }
        }
        .comment-text {
          font-size: 26rpx;
          font-weight: 400;
          color: #FFFFFF;
          margin: 16rpx 0;
          line-height: 36rpx;
        }
        .action-bar {
          font-size: 24rpx;
          font-weight: 400;
          color: #7D7D7D;
          .reply {
            font-weight: 500;
            margin-left: 12rpx;
          }
        }
      }
    }
  }
  .sub-comment-list {
    margin-top: 32rpx;
    padding-left: 0;
  }
  .comment-section {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 120rpx;
    padding: 20rpx 32rpx;
    background: #0A0A0A;
    box-sizing: border-box;
    .comment-input {
      width: 100%;
      height: 80rpx;
      background: #181818;
      border-radius: 100rpx;
      padding-left: 36rpx;
      box-sizing: border-box;
    }
  }
}
</style>