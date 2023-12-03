<template>
  <view class="image-crop">
    <image-cropping
      v-if="url"
      :src="url"
      :isFixedSize="true"
      :ratioGroup="['4:3', '1:1']"
      @completed="cropCompleted"
      @cancel="cropCancel" >
      </image-cropping>
  </view>
</template>

<script>
  import imageCropping from '@/components/image-crop'
  export default {
    components:{imageCropping},
    data() {
      return {
        url: ''
      };
    },
    onLoad(opt) {
      this.url = opt.imageUrl
    },
    methods: {
      cropCompleted(url) {
        
      },
      cropCancel() {
        uni.navigateBack()
      },
    }
  }
</script>

<style lang="scss">
.image-crop {
  height: 100vh;
  background: #181818;
}
</style>
