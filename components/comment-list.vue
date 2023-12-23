<template>
  <view class="comment-list-main" :class="{ 'comment-list-main-parent': level === 1 }">
    <view class="comment-list">
      <view class="comment-item" v-for="item in list" :key="item.commentId">
        <view class="comment-main">
          <view class="user-avatar">
            <image :src="item.avatar" mode="aspectFill"></image>
          </view>
          <view class="comment-con">
            <view class="user-name">{{ item.nickName }} <text v-if="item.author" class="author">作者</text> </view>
            <view class="comment-text">{{ item.content }}</view>
            <view class="action-bar">
              <text class="time">{{ item.createTime }}</text>
              <text class="reply" @click="handleReply(item)">回复TA</text>
            </view>
            <comment-list v-if="hasSub" class="sub-comment-list" :detail="detail" :level="level + 1" :hasSub="false"
              :list="item.commentList"></comment-list>
          </view>
        </view>
      </view>
    </view>
    <view v-if="level === 1" class="comment-section">
      <input class="comment-input" type="text" :placeholder="placeholder" @blur="handleSendComment" />
    </view>
  </view>
</template>

<script>
import { sendComment } from '@/api/index'
export default {
  name: "comment-list",
  props: {
    hasSub: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 1
    },
    // 活动详情
    detail: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      placeholder: '输入你想说的话…',
      form: {
        content: '',
        momentId: '',
        commentId: '',
        replyUserId: ''
      }
    }
  },
  methods: {
    handleSendComment(e) {
      console.log(this.detail)
      this.form.momentId = this.detail.indexId
      this.form.content = e.detail.value
      sendComment(this.form).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$showToast('评论成功')
          this.$emit('comment-success')
        } else {
          this.$showToast(res.msg)
        }
      })
    },
    handleReply(item) {
      this.placeholder = '回复' + item.nickName
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
}</style>