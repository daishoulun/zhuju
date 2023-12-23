<template>
  <view class="dy-pop">
    <uni-popup
      ref="popup"
      background-color="#181818"
      @maskClick="close"
    >
      <view class="dy-content">
        <view class="dy-header">
          <view class="user-info">
            <image class="avatar" mode="aspectFill" :src="item.avatar"></image>
            <text class="name">{{ item.nickName }}</text>
          </view>
          <view class="btn" :class="{ hasFollow: hasFollow }" @click="clickFollow">
            {{ hasFollow ? '已关注' : '关注' }}
          </view>
        </view>
        <view class="title">{{ title }}</view>
        <view class="content">{{ content }}</view>
        <view v-if="item.location" class="content loc">
          <image src="/static/location.png"></image>
          <text>{{ item.location }}</text>
        </view>
        <view class="dy-footer">
          <view class="comment">
            <input type="text" placeholder="说点什么...">
          </view>
          <view class="fun-list">
            <view class="fun-item" @click="clickLiked">
              <view>
                <image v-if="item.moment.liked" src="/static/heart-active.png"></image>
                <image v-else src="/static/heart.png"></image>
              </view>
              <text>{{ item.moment.likeNum || 0 }}</text>
            </view>
            <view class="fun-item" @click="clickComment">
              <view>
                <image src="/static/comment.png"></image>
              </view>
              <text>{{ item.commentNum || 0 }}</text>
            </view>
            <view class="fun-item" @click="clickTransfer">
              <view>
                <image src="/static/forward-arrow.png"></image>
              </view>
              <text>{{ item.shareNum || 0 }}</text>
            </view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: "dy-popup",
  props: {
    item: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    title() {
      return this.item.moment && this.item.moment.title || ''
    },
    content() {
      return this.item.moment && this.item.moment.content || ''
    },
    hasFollow() {
      return this.item.followed
    },
  },
  methods: {
    open() {
      this.$refs.popup.open('bottom')
    },
    clickLiked() {
      if (this.item.moment.liked) {
        this.$emit('cancel-liked', this.item)
      } else {
        this.$emit('create-liked', this.item)
      }
    },
    clickComment() {
      this.$emit('click-comment', this.item)
    },
    clickTransfer() {
      this.$emit('click-transfer', this.item)
    },
    clickFollow() {
      if (this.item.followed) {
        this.$emit('cancel-follow', this.item)
      } else {
        this.$emit('create-follow', this.item)
      }
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.dy-pop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: red;
  z-index: 999;
  background: rgba(0, 0, 0, .3);

  .dy-content {
    padding: 0 32rpx 46rpx;
    background-color: #181818;
    color: #FFFFFF;
    line-height: 40rpx;
  }

  .dy-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 0;
    font-size: 30rpx;
    font-weight: 500;

    .user-info {
      display: flex;
      align-items: center;
    }

    .avatar {
      width: 72rpx;
      height: 72rpx;
      border-radius: 50%;
      margin-right: 16rpx;
    }

    .btn {
      width: 156rpx;
      height: 56rpx;
      line-height: 56rpx;
      background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
      border-radius: 28rpx;
      text-align: center;
      font-size: 26rpx;
      font-weight: 500;
      color: #201F2C;

      &.hasFollow {
        background: #343434;
        color: #7D7D7D;
      }
    }
  }

  .title {
    font-size: 32rpx;
    font-weight: 500;
    margin: 8rpx 0 20rpx;
  }

  .content {
    font-size: 28rpx;
    font-weight: 400;

    image {
      width: 32rpx;
      height: 32rpx;
    }
  }

  .loc {
    display: flex;
    align-items: center;
    margin-top: 24rpx;
    color: #CECECE;
  }

  .dy-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 158rpx;

    .comment {
      flex: 1;
      margin-right: 68rpx;

      input {
        height: 80rpx;
        background: #262626;
        border-radius: 100rpx;
        padding-left: 36rpx;
        font-size: 28rpx;
        box-sizing: border-box;
      }
    }

    .fun-list {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .fun-item {
        text-align: center;
        margin-right: 80rpx;

        &:last-of-type {
          margin-right: 0;
        }

        image {
          display: block;
          width: 44rpx;
          height: 44rpx;
        }

        text {
          font-size: 22rpx;
          font-weight: 400;
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>