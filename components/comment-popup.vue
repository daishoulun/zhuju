<template>
  <view class="comment-pop">
    <uni-popup
      ref="popup"
      background-color="#181818"
    >
      <view class="comment-list-wrap">
        <view class="comment-header">
          87888条评论
          <image class="close" src="/static/close.png" mode="" @click="close"></image>
        </view>
        <CommentList :has-sub="true"></CommentList>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import CommentList from './comment-list.vue'
  export default {
    name:"comment-popup",
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
    background: red;
    z-index: 999;
    background: rgba(0, 0, 0, .3);
    .comment-list-wrap {
      position: relative;
      height: 70vh;
      border-radius: 48rpx 48rpx 0rpx 0rpx;
      overflow-y: auto;
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
    
    }
  }
</style>