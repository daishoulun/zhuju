<template>
  <view class="self-introduction">
    <view class="textarea-wrap">
      <textarea class="textarea" v-model="introduction" :maxlength="300" placeholder="描述一下自己" />
      <text class="count">{{ count }}</text>
    </view>
    <view class="btn" @click="handleConfirm">确定</view>
  </view>
</template>

<script>
  import { editInfo } from '@/api/person-center.js'
  export default {
    data() {
      return {
        userInfo: {},
        introduction: ''
      };
    },
    computed: {
      count() {
        return `${this.introduction.length}/300`
      }
    },
    onShow() {
      const userInfo = uni.getStorageSync('userInfo')
      this.userInfo = JSON.parse(userInfo)
      this.introduction = this.userInfo.intro || ''
    },
    methods: {
      handleConfirm() {
        if (!this.introduction) {
          this.$showToast('请输入个人简介')
          return
        }
        editInfo({
          userId: this.userInfo.userId,
          intro: this.introduction
        }).then(res => {
          if (res.code === 0) {
            this.$showToast('修改成功')
            setTimeout(() => {
              uni.navigateBack()
            }, 300)
          } else {
            this.$showToast(res.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
.self-introduction {
  height: 100vh;
  box-sizing: border-box;
  background: #181818;
  padding: 56rpx 32rpx;
  .textarea-wrap {
    position: relative;
    width: 100%;
    height: 486rpx;
    padding: 36rpx 36rpx 64rpx;
    box-sizing: border-box;
    background: #2B2B2B;
    border-radius: 28rpx;
    .textarea {
      width: 100%;
      height: 100%;
      font-size: 28rpx;
      font-weight: 500;
      color: #ffffff;
    }
    .count {
      position: absolute;
      bottom: 32rpx;
      right: 32rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #7D7D7D;
    }
  }
  .btn {
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
    border-radius: 60rpx;
    font-size: 36rpx;
    font-weight: 600;
    color: #201F2C;
    text-align: center;
    margin-top: 40rpx;
  }
}
</style>
