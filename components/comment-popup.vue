<template>
  <view class="comment-pop">
    <uni-popup ref="popup" background-color="#181818" @maskClick="close">
      <view class="comment-list-wrap">
        <view class="comment-header">
          {{ total }}条评论
          <image class="close" src="/static/close.png" mode="" @click="close"></image>
        </view>
        <view class="comment-con">
          <CommentList :detail="currentItem" :has-sub="true" :list="commentList" @comment-success="commentSuccess"></CommentList>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import CommentList from './comment-list.vue'
import { fetchCommentList } from '@/api/index'
export default {
  name: "comment-popup",
  components: {
    CommentList
  },
  data() {
    return {
      listQuery: {
        momentId: '',
        current: 1,
        pageSize: 20
      },
      currentItem: null,
      commentList: [],
      total: 0
    };
  },
  methods: {
    open(item) {
      this.$refs.popup.open('bottom')
      this.currentItem = item
      this.listQuery.momentId = item.indexId || item.momentId
      this.getList()
    },
    async getList() {
      const res = await fetchCommentList(this.listQuery)
      if (res.code === 0) {
        this.commentList = res.data.commentList
        this.total = res.data.commentCount || 0
      } else {
        this.$showToast(res.msg)
      }
    },
    commentSuccess() {
      this.listQuery.current = 1
      this.getList()
      this.$emit('comment-success')
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-pop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, .3);

  .comment-list-wrap {
    position: relative;
    height: 70vh;
    border-radius: 48rpx 48rpx 0rpx 0rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #FFFFFF;
    padding-top: 88rpx;

    .comment-header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      background: #181818;

      .close {
        position: absolute;
        right: 32rpx;
        top: 50%;
        width: 24rpx;
        height: 24rpx;
        transform: translateY(-50%);
      }
    }
    .comment-con {
      height: 100%;
    }
  }

  .no-comment {
    text-align: center;
    margin-top: 100rpx;
    color: #7D7D7D;
  }
}
</style>