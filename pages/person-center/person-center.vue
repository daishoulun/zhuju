<template>
	<view class="person-center" :class="{
    noLogin: isLogin
  }">
		<view class="bg">
      <image class="draw-list" src="/static/list.png" @click="handleSetting"></image>
    </view>
    <view class="person-main">
      <view class="user-header">
        <view class="avatar">
          <image :src="avatar"></image>
        </view>
        <view class="user-data">
          <view class="data-item" @click="handleLike('like')">
            <text class="num">{{ profileInfo.followNum }}</text>
            <text class="name">关注</text>
          </view>
          <view class="data-item" @click="handleLike('fans')">
            <text class="num">{{ profileInfo.fansNum }}</text>
            <text class="name">粉丝</text>
          </view>
          <view class="data-item" @click="handleLike('firend')">
            <text class="num">{{ profileInfo.friendNum }}</text>
            <text class="name">好友</text>
          </view>
          <view class="data-item">
            <text class="num">{{ profileInfo.likeNum }}</text>
            <text class="name">获赞</text>
          </view>
        </view>
      </view>
      <view class="user-info">
        <view v-if="isLogin" class="user-name">{{ userInfo.nickName }}</view>
        <view v-if="isLogin" class="user-tag">
          <text class="sex">
            <image :src="sex" mode=""></image>
            {{ profileInfo.age }}岁
          </text>
          <text v-for="item in (profileInfo.tags || [])">
            {{ item }}
          </text>
        </view>
        <view v-else class="login-btn" @click="handleLogin">点击登录</view>
        <view class="user-desc">{{ userInfo.intro }}</view>
        <button type="default" class="edit-btn" @click="handleEdit">编辑资料</button>
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
    <AccountSetting ref="accountSet"></AccountSetting>
	</view>
</template>

<script>
  import ActiveList from '@/components/active-list/active-list'
  import DynamicsList from '@/components/dynamics-list/dynamics-list'
  import AccountSetting from '@/components/account-setting.vue'
  import { fetchUserInfo, getProfile } from '@/api/person-center.js'
	export default {
    components: {
      ActiveList,
      DynamicsList,
      AccountSetting
    },
		data() {
			return {
        isLogin: false,
				active: 'active',
        userInfo: {
          avatar: '',
          birthday: '',
          gender: '',
          intro: ''
        },
        profileInfo: {}
			};
		},
    computed: {
      avatar() {
        if (this.isLogin) {
          return this.userInfo.avatar
        } else {
          return '../../static/user-header.png'
        }
      },
      sex() {
        if (this.userInfo.gender === 1) {
          return '../../static/sex-women.png'
        } else {
          return '../../static/sex-man.png'
        }
      }
    },
    onLoad() {
      const userId = uni.getStorageSync('userId')
      if (userId) {
        this.getUserInfo(userId)
        this.getProfile(userId)
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    methods: {
      getUserInfo(userId) {
        fetchUserInfo({ userId }).then(res => {
          this.userInfo = res.data || {}
          uni.setStorageSync('userInfo', JSON.stringify(this.userInfo))
        })
      },
      getProfile(userId) {
        getProfile({ userId }).then(res => {
          this.profileInfo = res.data || {}
        })
      },
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
      },
      handleSetting() {
        this.$refs.accountSet.showDrawer()
      },
      handleLogin() {
        uni.navigateTo({
          url: '/pages/login/login'
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
.person-center {
  width: 100%;
  height: calc(100vh - 100rpx);
  position: relative;
  box-sizing: border-box;
  background: #181818;
  overflow-y: auto;
  .bg {
    width: 750rpx;
    height: 446rpx;
    background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
    .draw-list {
      position: absolute;
      left: 32rpx;
      top: 100rpx;
      width: 56rpx;
      height: 56rpx;
    }
  }
  .person-main {
    position: relative;
    width: 100%;
    border-radius: 68rpx 68rpx 0rpx 0rpx;
    background: $bg-color-black;
    padding: 32rpx 32rpx;
    box-sizing: border-box;
    margin-top: -102rpx;
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
      .user-name {
        margin-top: 48rpx;
        font-size: 36rpx;
        font-weight: 500;
        color: #FFFFFF;
        margin-bottom: 28rpx;
      }
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
            margin-right: 4rpx;
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
