<template>
	<view class="attention">
    <view class="tabbar">
      <view class="tabbar-item" :class="tabbarInd === 'attention' ? 'active' : ''" @click="handleTabbar('attention')">关注</view>
      <view class="tabbar-item" :class="tabbarInd === 'fans' ? 'active' : ''" @click="handleTabbar('fans')">粉丝</view>
    </view>
		<view class="list">
      <view class="list-item">
        <view class="avatar">
          <image src="../../static/logo.png" mode=""></image>
        </view>
        <view class="content">
          <view class="name">张三</view>
          <view class="info">21岁双鱼座</view>
        </view>
        <view class="rig-con">
          <button class="btn">互相关注</button>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbarInd: 'attention'
			};
		},
    methods: {
      handleTabbar(val) {
        uni.setNavigationBarTitle({
        	title: val === 'fans' ? '粉丝列表' : '关注列表'
        });
        this.tabbarInd = val
      }
    }
	}
</script>

<style lang="scss">
.attention {
  height: $app-height;
  background: $bg-color-black;
  .tabbar {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $font-color-grey;
    padding: 0 $spacing-col-base;
    .tabbar-item {
      padding: $spacing-col-base 0;
      border-bottom: 4rpx solid transparent;
      transition: all .5s;
      &:first-of-type {
        margin-right: $spacing-row-base;
      }
      &.active {
        color: $font-color-white;
        border-bottom: $border-bold;
      }
    }
  }
  .list {
    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      .avatar {
        width: $avatar-size;
        height: $avatar-size;
        border-radius: 50%;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        flex: 1;
        margin: 0 10px;
        border-radius: 12px;
        .name {
          margin-bottom: $spacing-col-base;
          font-size: $font-size-base;
          color: $font-color-white;
        }
        .info{
          color: $font-color-grey;
          font-size: $font-size-sm;
        }
      }
      .btn {
        width: $btn-width;
        height: $btn-height;
        line-height: $btn-height;
        border-radius: $btn-height;
        font-size: 12px;
        padding: 0;
        background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
        color: #201F2C;
        // 已关注 \ 相互关注
        &.already-attion-btn {
          font-weight: 500;
          color: #7D7D7D;
          background: #343434;          
        }
      }
    }
  }
}
</style>
