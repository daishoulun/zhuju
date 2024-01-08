<template>
  <view class="report-form">
    <view class="title">添加图片材料</view>
    <view class="img-list">
      <template v-for="(item, index) in imgList">
        <view
          v-if="index <= 9"
          class="img-item"
          :key="index"
          @click="handleUpload(item)"
        >
          <template v-if="item.type === 'default'">
            <view class="default-icon">
              <image class="camera" src="@/static/camera-up.png"></image>
            </view>
            <view>{{ imgList.length - 1 }} / 9</view>
          </template>
          <image v-else class="u-img" :src="item.url" mode="aspectFill"></image>
        </view>
      </template>
    </view>
    <view class="title">选填</view>
    <view class="textarea-wrap">
      <textarea class="textarea" v-model="remark" :maxlength="1000" placeholder="填写内容、介绍、全面的内容细节~" placeholder-style="color: #7D7D7D;" />
      <text class="count">{{ remark.length }}</text>
    </view>
    <view class="btn" :class="{ canSubmit: imgList.length > 1 }" @click="handleSubmit">提交</view>
  </view>
</template>

<script>
  import { reportUser } from '@/api/person-center'
  import { getAliInfo } from '@/api/login.js'
  import { generateRandomString } from '@/utils/index'
  export default {
    data() {
      return {
        imgList: [
          { type: 'default', imgUrl: '' }
        ],
        canSubmit: false,
        remark: '',
        userId: '',
        type: ''
      };
    },
    onLoad(opt) {
      this.userId = opt.id
      this.type = opt.type
    },
    methods: {
      handleUpload(item) {
        if (item.type !== 'default') return
        uni.chooseMedia({
          count: 10 - this.imgList.length,
          mediaType: ['image'],
          success: res => {
            res.tempFiles.forEach(img => {
              this.imgList.splice(this.imgList.length - 1, 0, {
                type: 'upload',
                url: img.tempFilePath
              })
            })
            if (this.imgList.length === 10) {
              this.imgList.pop()
            }
          }
        })
      },
      async handleSubmit() {
        const authInfo = await getAliInfo({ token: uni.getStorageSync('T-token') })
        const imgList = this.imgList.filter(item => item.type !== 'default')
        const apis = []
        imgList.forEach((item) => {
          apis.push(this.uploadFile(authInfo.data, 'report', item.url))
        })
        const cdnImgLists = await Promise.all(apis)
        reportUser({
          remark: this.remark,
          reportPicList: cdnImgLists,
          reportType: this.type,
          targetUserId: this.userId
        }).then(res => {
          if (res.code === 0) {
            this.$showToast('举报成功')
            uni.navigateBack({
              delta: 2
            })
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      uploadFile(data, fileName, filePath) {
        return new Promise((resolve, reject) => {
          const {
            accessid,
            dir,
            host,
            policy,
            signature,
            urlAnchor
          } = data
          const key = dir + fileName + generateRandomString()
          uni.uploadFile({
            url: host,
            filePath,
            name: 'file',
            formData: {
              key,
              signature,
              policy,
              ossAccessKeyId: accessid,
            },
            success: (uploadFileRes) => {
              resolve(urlAnchor + key)
            },
            fail: error => {
              reject(error)
            }
          })
        })
      },
    }
  }
</script>

<style lang="scss">
.report-form {
  width: 100%;
  min-height: 100vh;
  background: #181818;
  padding: 40rpx 32rpx 48rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: #FFFFFF;
  box-sizing: border-box;
  overflow-y: auto;
  .btn {
    position: absolute;
    bottom: 48rpx;
    left: 32rpx;
    width: calc(100% - 64rpx);
    height: 92rpx;
    line-height: 92rpx;
    background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
    border-radius: 60rpx;
    text-align: center;
    line-height: 92rpx;
    font-size: 36rpx;
    font-weight: 500;
    color: #201F2C;
    opacity: 0.4;
    &.canSubmit {
      opacity: 1;
    }
  }
  .title {
    margin-bottom: 24rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #FFFFFF;
  }
  .img-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 44rpx;
    .img-item {
      width: 161rpx;
      height: 161rpx;
      background: #262626;
      border-radius: 16rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 20rpx;
      margin-right: 14rpx;
      margin-bottom: 14rpx;
      &:nth-of-type(4n) {
        margin-right: 0;
      }
      .default-icon {
        width: 46rpx;
        height: 46rpx;
        margin-bottom: 12rpx;
        .camera {
          width: 100%;
          height: 100%;
        }
      }
      .u-img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .textarea-wrap {
    position: relative;
    width: 100%;
    height: 362rpx;
    padding: 32rpx 24rpx 64rpx;
    box-sizing: border-box;
    background: #262626;
    border-radius: 20rpx;
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
}
</style>
