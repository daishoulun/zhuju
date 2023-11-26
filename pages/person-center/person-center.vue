<template>
	<view class="person-center" :class="{
    noLogin: isLogin
  }">
		<view class="bg"></view>
    <view class="person-main">
      <view class="user-header">
        <view class="avatar">
          <image src="../../static/user-header.png"></image>
        </view>
        <view class="user-data">
          <view class="data-item" @click="handleLike('like')">
            <text class="num">0</text>
            <text class="name">关注</text>
          </view>
          <view class="data-item" @click="handleLike('fans')">
            <text class="num">6728</text>
            <text class="name">粉丝</text>
          </view>
          <view class="data-item" @click="handleLike('firend')">
            <text class="num">45</text>
            <text class="name">好友</text>
          </view>
          <view class="data-item">
            <text class="num">14.8w</text>
            <text class="name">获赞</text>
          </view>
        </view>
      </view>
      <view class="user-info">
        <view v-if="isLogin" class="user-name">想吃冰激凌</view>
        <view v-if="isLogin" class="user-tag">
          <text class="sex">
            <image src="../../static/sex-women.png" mode=""></image>
          </text>
          <text>双鱼座</text>
          <text>双鱼座</text>
        </view>
        <view v-else class="login-btn">点击登录</view>
        <view class="user-desc">杭州本地人，想吃冰淇淋杭州本地人，想吃冰淇淋杭州本地人，想吃冰淇淋</view>
        <button type="default" class="edit-btn" @click="handleEdit">编辑资料</button>  
       <!-- <button type="default" class="edit-btn">关注</button>  
        <button type="default" class="edit-btn">已关注</button>  -->
      </view>
      <view class="tabbar">
        <text :class="active === 'active' ? 'active' : ''" @click="handleTabbar('active')">活动</text>
        <text :class="active === 'dynamics' ? 'active' : ''" @click="handleTabbar('dynamics')">动态</text>
      </view>
      <view class="active-wrap">
        <ActiveList v-if="active === 'active'"></ActiveList>
        <DynamicsList v-else-if="active === 'dynamics'"></DynamicsList>
      </view>  
    </view>
	</view>
</template>

<script>
  import ActiveList from '@/components/active-list/active-list'
  import DynamicsList from '@/components/dynamics-list/dynamics-list'
	export default {
    components: {
      ActiveList,
      DynamicsList
    },
		data() {
			return {
        isLogin: false,
				active: 'active'
			};
		},
    methods: {
      handleTabbar(val) {
        this.active = val
      },
      handleEdit() {
        uni.navigateTo({
          url: '/pages/update-info/update-info'
        })
      },
      handleLike(val) {
        uni.navigateTo({
          url: '/pages/fans-list/fans-list?type=' + val
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
.person-center {
  height: calc(100vh - 100rpx);
  position: relative;
  box-sizing: border-box;
  background: #181818;
  overflow-y: auto;
  .bg {
    width: 750rpx;
    height: 446rpx;
    background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
  }
  .person-main {
    position: relative;
    width: 750rpx;
    border-radius: 68rpx 68rpx 0rpx 0rpx;
    background: $bg-color-black;
    padding: 32rpx 32rpx;
    box-sizing: border-box;
    // transform: translateY(-102rpx);
    top: -102rpx;
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
        height: 100%;
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
    .user-info {
      .user-tag {
        text {
          background: $bg-color-main;
          border-radius: $border-radius-lg;
          font-size: $font-size-mini;
          font-weight: $font-weight-base;
          color: $font-color-white;
          line-height: 28rpx;
          padding: $padding-mini $padding-base;
          margin-right: $margin-sm;
          image {
            width: $img-size-mini;
            height: $img-size-mini;
          }
        }
      }
      .login-btn {
        font-size: 36rpx;
        font-weight: 500;
        color: #FFFFFF;
        margin-top: 32rpx
      }
    }
    .user-desc {
      font-size: 26rpx;
      font-weight: 400;
      color: #7D7D7D;
      line-height: 40rpx;
      margin: 32rpx 0 42rpx;
    }
    .edit-btn {
      width: 686rpx;
      height: 80rpx;
      background: #343434;
      border-radius: 16rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 80rpx;
      margin-bottom: 40rpx;
    }
  }
  .tabbar {
    margin-bottom: 36rpx;
    text {
      font-size: 36rpx;
      font-weight: 600;
      color: #7D7D7D;
      margin-right: 36rpx;
      &.active {
        color: #ffffff;
      }
    }
  }
  .active-wrap {
    padding-bottom: 32rpx;
  }
}
</style>
