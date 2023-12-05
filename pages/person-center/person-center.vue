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
          <view v-for="(item, index) in (profileInfo.tags || [])" v-if="index !== 1" class="user-item">
            <image v-if="index === 0" :src="sex" mode=""></image>
            <text v-if="index === 0">{{ profileInfo.tags[1] }}岁</text>
            <text v-else>{{ item }}</text>
          </view>
          <!-- <text class="user-item" v-for="item in (profileInfo.tags || [])">{{ item }}</text> -->
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
        <template v-if="total > 0">
          <ActiveList v-if="active === 'active'" :list="list"></ActiveList>
          <DynamicsList v-else-if="active === 'dynamics'" :list="list" @click-like="handleLike"></DynamicsList>
        </template>
        <view v-else class="empty-state">
          <image src="/static/empty.png" mode=""></image>
        </view>
        
      </view>
    </view>
    <AccountSetting ref="accountSet"></AccountSetting>
	</view>
</template>

<script>
  import ActiveList from '@/components/active-list/active-list'
  import DynamicsList from '@/components/dynamics-list/dynamics-list'
  import AccountSetting from '@/components/account-setting.vue'
  import { fetchUserInfo, getProfile, getActivityList, getMomentList, createLike, cancelLike } from '@/api/person-center.js'
  // import PinyinUtils from '@/utils/pinUtils.js'
  // // 获取拼音
  // console.log(PinyinUtils.chineseToPinYin('张三'))
  // // ZHANGSAN
  // // ===============
  // // 获取首字母
  // console.log(PinyinUtils.chineseToPinYinFirst('安庆市'))
  // ZS
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
        listQuery: {
          current: 1,
          pageSize: 10,
          userId: ''
        },
        profileInfo: {},
        total: 0,
        list: [],
        loading: false
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
        this.listQuery.userId = userId
        this.getUserInfo(userId)
        this.getProfile(userId)
        this.getList()
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
      getList() {
        uni.showLoading({
        	title: '加载中'
        });
        if (this.active === 'active') {
          this.getActivity()
        } else {
          this.getMomentList()
        }
      },
      getActivity() {
        getActivityList(this.listQuery).then(res => {
          if (res.code === 0) {
            this.total = res.data.total
            if (this.listQuery.current === 1) {
              this.list = res.data.list || []
            } else {
              this.list = this.list.concat(res.data.list || [])
            }
          } else {
            this.$showToast(res.msg)
          }
        }).finally(() => {
          this.loading = false
          uni.stopPullDownRefresh()
          uni.hideLoading();
        })
      },
      getMomentList() {
        getMomentList(this.listQuery).then(res => {
          if (res.code === 0) {
            this.total = res.data.total
            if (this.listQuery.current === 1) {
              this.list = res.data.list || []
            } else {
              this.list = this.list.concat(res.data.list || [])
            }
          } else {
            this.$showToast(res.msg)
          }
        }).finally(() => {
          this.loading = false
          uni.stopPullDownRefresh()
          uni.hideLoading();
        })
      },
      handleTabbar(val) {
        this.active = val
        this.listQuery.current = 1
        this.getList()
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
      },
      handleLike(item) {
        if (item.liked) {
          this.cancelLike(item.momentId)
        } else {
          this.createLike(item.momentId)
        }
      },
      createLike(momentId) {
        createLike({ momentId }).then(res => {
          if (res.code === 0) {
            this.listQuery.current = 1
            this.getList()
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      cancelLike(momentId) {
        cancelLike({ momentId }).then(res => {
          if (res.code === 0) {
            this.listQuery.current = 1
            this.getList()
          } else {
            this.$showToast(res.msg)
          }
        })
      }
    },
    onPullDownRefresh() {
      this.listQuery.current = 1
      this.getList()
    },
    onReachBottom() {
      if (this.loading) {
        return
      }
      this.loading = true
      if (this.total > this.list.length) {
        this.listQuery.current++
        this.getList()
      } else {
        this.loading = false
        // this.$showToast('没有更多数据了')
      }
    },
  }
</script>

<style lang="scss" scoped>
.person-center {
  width: 100%;
  min-height: calc(100vh - 100rpx);
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
    .empty-state {
      text-align: center;
      margin-top: 86rpx;
      image {
        width: 204rpx;
        height: 204rpx;
      }
    }
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
        display: flex;
        .user-item {
          background: $bg-color-main;
          border-radius: $border-radius-lg;
          font-size: $font-size-mini;
          font-weight: $font-weight-base;
          color: $font-color-white;
          line-height: 28rpx;
          padding: $padding-mini $padding-base;
          margin-right: $margin-sm;
        }
        image {
          width: $img-size-mini;
          height: $img-size-mini;
          margin-right: 4rpx;
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
