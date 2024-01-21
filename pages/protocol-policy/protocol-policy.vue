<template>
	<view class="protocol-policy">
		<!-- <view class="private">
      根据业务开展的实际情况，煮桔近期更新了《用户隐私政策》中的相关内容。您可以前往插件更新后的协议全文，有意见可到zhuju@163.com邮箱，反馈对本次隐私政策更新的任何疑问以及意见。根据业务开展的实际情况，煮桔近期更新了《用户隐私政策》中的相关内容。您可以前往插件更新后的协议全文，有意见可到zhuju@163.com邮箱，反馈对本次隐私政策更新的任何疑问以及意见。根据业务开展的实际情况，煮桔近期更新了《用户隐私政策》中的相关内容。您可以前往插件更新后的协议全文，有意见可到zhuju@163.com邮箱，反馈对本次隐私政策更新的任何疑问以及意见。根据业务开展的实际情况，煮桔近期更新了《用户隐私政策》中的相关内容。您可以前往插件更新后的协议全文，有意见可到zhuju@163.com邮箱，反馈对本次隐私政策更新的任何疑问以及意见。根据业务开展的实际情况，煮桔近期更新了《用户隐私政策》中的相关内容。您可以前往插件更新后的协议全文，有意见可到zhuju@163.com邮箱，反馈对本次隐私政策更新的任何疑问以及意见。
      </view> -->
      <web-view :src="webUrlMap[type]"></web-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
        type: '',
				webUrlMap: {
          privacy: 'http://test-h5.51zhuju.com/secret.html',
          userService: 'http://test-h5.51zhuju.com/agreement.html'
        }
			};
		},
    onLoad(opt) {
      this.type = opt.type
    }
	}
</script>

<style lang="scss" scoped>
.protocol-policy {
  height: 100vh;
  background-color: #181818;
  padding: 24rpx 32rpx;
  box-sizing: border-box;
  .private {
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(255,255,255,0.7);
    line-height: 52rpx;
  }
}
</style>
