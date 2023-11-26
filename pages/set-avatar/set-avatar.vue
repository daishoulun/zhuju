<template>
  <view class="set-avatar">
    <view class="avatar">
      <image class="header" src="../../static/avatar-set.png"></image>
      <image class="camera" src="../../static/camera.png" @click="handlePic"></image>
    </view>
    <view class="set-name">
      <text>设置昵称</text>
    </view>
    <view class="nick-input">
      <input type="text" v-model="nickName" placeholder="请输入">
      <view class="tip">中文、数字、字母组合最多15个字符</view>
    </view>
    <view class="btn">继续</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        introduction: '',
        nickName: ''
      };
    },
    computed: {
      count() {
        return `${this.introduction.length}/300`
      }
    },
    methods: {
      handlePic() {
        uni.chooseImage({
          count: 1,
          success: (res) => {
            // this.$SET_USER_IMG(res.tempFilePaths[0])
          }
        })
      },
    }
  }
</script>

<style lang="scss">
.set-avatar {
  height: calc(100vh - 88rpx);
  box-sizing: border-box;
  background: #181818;
  padding: 88rpx 70rpx 0;
  .avatar {
    position: relative;
    width: 192rpx;
    height: 192rpx;
    margin: 0 auto 40rpx;
    .header {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .camera {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 72rpx;
      height: 72rpx;
    }
  }
  .set-name {
    text-align: center;
    font-size: 32rpx;
    font-weight: 500;
    color: #DCAEF4;
    text-shadow: 0px 2px 2px rgba(0,0,0,0.14);
    margin-bottom: 40rpx;
  }
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
  .btn {
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    background: #5C5C5C;
    border-radius: 60rpx;
    font-size: 36rpx;
    font-weight: 600;
    color: #201F2C;
    text-align: center;
    margin-top: 102rpx;
  }
}
</style>
