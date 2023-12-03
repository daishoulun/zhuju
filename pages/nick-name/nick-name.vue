<template>
  <view class="set-info">
    <view class="nick-input">
      <input type="text" v-model="nickName" maxlength="15" placeholder="请输入">
      <view class="tip">可输入2-10字中文，4-20字符</view>
    </view>
    <view class="btn" @click="handleConfirm">确定</view>
  </view>
</template>

<script>
  import { editInfo } from '@/api/person-center.js'
  export default {
    data() {
      return {
        nickName: '',
        userInfo: {}
      };
    },
    onShow() {
      const userInfo = uni.getStorageSync('userInfo')
      this.userInfo = JSON.parse(userInfo)
      this.nickName = this.userInfo.nickName
    },
    methods: {
      handleConfirm() {
        if (!this.nickName) {
          this.$showToast('请输入昵称')
          return
        }
        const han = /^[\u4e00-\u9fa5]$/
        const strs = this.nickName.split('')
        let len = 0
        strs.forEach((item) => {
          if (han.test(item)) {
            len += 2
          } else {
            len += 1
          }
        })
        if (len > 10) {
          this.$showToast('昵称长度过长')
          return
        }
        editInfo({
          userId: this.userInfo.userId,
          nickName: this.nickName
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

<style lang="scss" scoped>
.set-info {
  height: calc(100vh - 88rpx);
  background: #181818;
  padding: 88rpx 70rpx 0;
  box-sizing: border-box;
  .nick-input {
    input {
      width: 100%;
      height: 132rpx;
      background: #2B2B2B;
      border-radius: 28rpx;
      padding-left: 40rpx;
      color: #fff;
    }
    .tip {
      margin-top: 24rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #5C5C5C;
      text-align: center;
    }
  }
}
.btn {
  width: 612rpx;
  height: 120rpx;
  margin: 0 auto;
  line-height: 120rpx;
  background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
  border-radius: 60rpx;
  font-size: 36rpx;
  font-weight: 600;
  color: #201F2C;
  text-align: center;
  margin-top: 102rpx
}
</style>
