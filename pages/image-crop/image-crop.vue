<template>
  <view class="image-crop" :style="{ paddingTop: pt + 'px' }">
    <img-cropping
      v-if="url"
      :src="url"
      :isFixedSize="true"
      :ratioGroup="['4:3', '1:1']"
      :cropShape="cropShape"
      :top="pt"
      @completed="cropCompleted"
      @cancel="cropCancel"
    >
    </img-cropping>
  </view>
</template>

<script>
import disTopHeight from '@/mixins/disTopHeight'
import ImgCropping from '@/components/img-crop'
import { getAliInfo } from '@/api/login.js'
import { editInfo } from '@/api/person-center.js'
import { generateRandomString } from '@/utils/index'
export default {
  components: { ImgCropping },
  mixins: [disTopHeight],
  data() {
    return {
      url: '',
      fromUrl: '',
      cropShape: ''
    };
  },
  computed: {
    pt() {
      return this.statusBarHeight + this.navBarHeight
    }
  },
  onLoad(opt) {
    this.cropShape = opt.type
    this.fromUrl = opt.fromUrl || ''
    this.url = opt.imageUrl
  },
  methods: {
    async cropCompleted(url) {
      const authInfo = await getAliInfo({ token: uni.getStorageSync('T-token') })
      let fileName = 'bg-img'
      if (this.cropShape === 'circular') {
        fileName = 'avatar'
      }
      this.uploadFile(authInfo.data, fileName, url)
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
          if (this.fromUrl === 'registry') {
            this.cropCancel()
            uni.$emit('setAvatar', urlAnchor + key)
            return
          }
          this.edit(urlAnchor + key)
        },
        fail: error => {
          console.log('error', error)
        }
      })
    },
    edit(url) {
      const params = {
        userId: uni.getStorageSync('userId')
      }
      if (this.cropShape === 'rect') {
        params.bgImage = url
      } else {
        params.avatar = url
      }
      editInfo(params).then(res => {
        if (res.code === 0) {
          this.$showToast('修改成功')
          this.cropCancel()
        } else {
          this.$showToast(res.msg)
        }
      })
    },
    cropCancel() {
      uni.navigateBack()
    },
  }
}
</script>

<style lang="scss">
.image-crop {
  width: 100vw;
  height: 100vh;
  background: #181818;
  box-sizing: border-box;
}
</style>
