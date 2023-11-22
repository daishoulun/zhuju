<template>
	<view class="person-center">
		<view class="bg"></view>
    <view class="person-main">
      <view class="user-header">
        <view class="avatar">
          <image src="../../static/logo.png"></image>
        </view>
        <view class="user-data">
          <view class="data-item">
            <text class="num">0</text>
            <text class="name">关注</text>
          </view>
          <view class="data-item">
            <text class="num">6728</text>
            <text class="name">粉丝</text>
          </view>
          <view class="data-item">
            <text class="num">45</text>
            <text class="name">好友</text>
          </view>
          <view class="data-item">
            <text class="num">14.8w</text>
            <text class="name">获赞</text>
          </view>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.person-center {
  position: relative;
  .bg {
    width: 750rpx;
    height: 622rpx;
    background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
  }
  .person-main {
    width: 750rpx;
    position: absolute;
    top: 344rpx;
    border-radius: 68rpx 68rpx 0rpx 0rpx;
    background: $bg-color-black;
    padding: 32rpx;
    box-sizing: border-box;
    .avatar {
      position: absolute;
      top: -88rpx;
      left: 32rpx;
      width: 176rpx;
      height: 176rpx;
      border-radius: 50%;
      overflow: hidden;
      image{
        width: 100%;
      }
    }
    .user-header {
      .user-data {
        display: flex;
        width: 498rpx;
        font-size: $font-size-base;
        margin-left: 188rpx;
        color: $font-color-white;
        .data-item {
          margin-right: $margin-sm;
          .name {
            color: $font-color-grey;
            font-size: $font-size-sm;
            margin-left: $margin-mini;
          }
        }
      }
    }
  }
}
</style>
