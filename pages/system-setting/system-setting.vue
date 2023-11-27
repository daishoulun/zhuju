<template>
  <view class="system-setting">
    <FormItem label="隐私政策" @click-label="handleLabel">&nbsp;</FormItem>
    <FormItem label="用户服务">&nbsp;</FormItem>
    <FormItem label="关于我们">&nbsp;</FormItem>
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
      handleLabel() {
          console.log(12)
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
