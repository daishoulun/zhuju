<template>
  <view class="system-setting">
    <FormItem label="隐私政策" @click-label="handleLabel('privacy')" @click-item="handleLabel('privacy')"><text></text></FormItem>
    <FormItem label="用户服务" @click-label="handleLabel('userService')" @click-item="handleLabel('userService')"><text></text></FormItem>
    <FormItem label="关于我们" @click-label="handleLabel('about')" @click-item="handleLabel('about')"><text></text></FormItem>
    <view class="log-out" @click="handleLogOff">退出登录</view>
  </view>
</template>

<script>
import { logout } from '@/api/login'
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
      if (type === 'about') {
        uni.navigateTo({
          url: '/pages/about-us/about-us'
        })
      } else {
        uni.navigateTo({
          url: '/pages/protocol-policy/protocol-policy?type=' + type
        })
      }
    },
    handleLogOff() {
      logout().then(res => {
        if (res.code === 0) {
          this.$showToast('退出成功')
          uni.clearStorageSync()
          uni.reLaunch({
            url: '/pages/index/index'
          })
        } else {
          this.$showToast(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.system-setting {
  position: relative;
  height: 100vh;
  background-color: #181818;

  ::v-deep .form-item .label {
    color: #fff;
  }

  .log-out {
    position: absolute;
    bottom: 60rpx;
    left: 50%;
    width: 686rpx;
    height: 84rpx;
    transform: translateX(-50%);
    background: #262626;
    border-radius: 60rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #7D7D7D;
    line-height: 84rpx;
    text-align: center;
  }
}
</style>
