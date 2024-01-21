<template>
  <view class="preview-view">
    <view class="img-wrap">
      <image class="img" :src="imgUrl" mode="widthFix"></image>
    </view>
    <view class="footer">
      <view class="btn" @click="handleImg">{{ btnText }}</view>
    </view>
    <set-img-popup
      v-if="setImgPopupVisible"
      ref="setImgPopup"
      @click-item="handlePhoto"
      @close="setImgPopupVisible = false"
    ></set-img-popup>
  </view>
</template>

<script>
  import SetImgPopup from '../../components/set-img-popup.vue';
  import { generateRandomString } from '@/utils/index'
  import { getAliInfo } from '@/api/login.js'
  export default {
    components: {
      SetImgPopup
    },
    data() {
      return {
        setImgPopupVisible: false,
        imgUrl: '',
        type: ''
      };
    },
    computed: {
      btnText() {
        if (this.type=== 'rect') {
          return '更换背景'
        } else {
          return '更换头像'
        }
      }
    },
    onLoad(opt) {
      this.imgUrl = opt.src
      this.type = opt.type
    },
    methods: {
      handleImg() {
        this.setImgPopupVisible = true
        this.$nextTick(() => {
          this.$refs.setImgPopup.open()
        })
      },
      handlePhoto(type) {
        uni.chooseImage({
          count: 1,
          mediaType: ['image'],
          sourceType: [type],
          success: async res => {
            console.log(res)
            const authInfo = await getAliInfo({ token: uni.getStorageSync('T-token') })
            const fileName = this.type === 'rect' ? 'setBg' : 'avatar'
            this.uploadFile(authInfo.data, fileName, res.tempFilePaths[0])
          }
        })
      },
      uploadFile(data, fileName, filePath) {
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
            uni.navigateTo({
              url: `/pages/image-crop/image-crop?imageUrl=${urlAnchor + key}&type=${this.type}`
            })
          },
          fail: error => {
            console.log('error', error)
          }
        })
      },
      handleAvatar() {
        uni.navigateTo({
          url: `/pages/image-crop/image-crop?imageUrl=${this.avatar}&type=circular`
        })
      },
      handleBg() {
        uni.navigateTo({
          url: `/pages/image-crop/image-crop?imageUrl=${this.userInfo.bgImage}&type=rect`
        })
      }
    }
  }
</script>

<style lang="scss">
.preview-view {
  width: 100%;
  height: 100vh;
  background: #181818;
  display: flex;
  flex-direction: column;
  .img-wrap {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .img {
    width: 100%;
    height: auto;
  }
  .footer {
    padding: 60rpx 32rpx;
    .btn {
      width: 100%;
      height: 84rpx;
      background: #262626;
      border-radius: 60rpx;
      text-align: center;
      line-height: 84rpx;
      font-size: 28rpx;
      color: #7D7D7D;
    }
  }
}
</style>
