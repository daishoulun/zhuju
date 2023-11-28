<template>
  <view class="system-setting">
    <FormItem label="隐私政策" @click-label="handleLabel('privacy')">&nbsp;</FormItem>
    <FormItem label="用户服务" @click-label="handleLabel('userService')">&nbsp;</FormItem>
    <FormItem label="关于我们" @click-label="handleLabel('about')">&nbsp;</FormItem>
  </view>
</template>

<script>
  import FormItem from '@/components/form-item.vue'
  export default {
    components: {
      FormItem
    },
    data() {
      return {
        
      };
    },
    methods: {
      handleLabel(type) {
        uni.navigateTo({
          url: '/pages/protocol-policy/protocol-policy?type=' + type
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.system-setting {
  height: calc(100vh - 88rpx);
  background-color: #181818;
  ::v-deep .form-item .label {
    color: #fff;
  }
}
</style>
