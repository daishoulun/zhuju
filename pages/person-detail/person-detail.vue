<template>
	<view class="person-center">
    <view class="action-bar" :style="{
      top: tabbarTop + 'px'
    }">
      <image class="back-icon" src="/static/arrow-l.png" @click="handleBack"></image>
      <view class="divider"></view>
      <image class="more-icon" src="/static/more.png" @click="handleMore"></image>
    </view>
		<view class="bg">
    </view>
    <view class="person-main">
      <view class="user-header">
        <view class="avatar">
          <!-- aspectFill -->
          <image :src="avatar" mode="aspectFill"></image>
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
        <view class="user-name">{{ userInfo.nickName }}</view>
        <view class="user-tag">
          <view v-for="(item, index) in (profileInfo.tags || [])" :key="index" v-if="index !== 1" class="user-item">
            <image v-if="index === 0" :src="sex" mode=""></image>
            <text v-if="index === 0">{{ profileInfo.tags[1] }}岁</text>
            <text v-else>{{ item }}</text>
          </view>
        </view>
        <view class="user-desc">{{ userInfo.intro || '' }}</view>
        <button type="default" class="edit-btn" :class="{
          noFollow: [1, 4].includes(profileInfo.followStatus)
        }" @click="handleFollow">
          <image v-if="profileInfo.followStatus === 3" class="another" src="/static/follow.png"></image>
          {{ profileInfo.followStatus | stateFilter }}
        </button>
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
    <person-more-popup
      v-if="personMoreVisible"
      ref="personMorePopup"
      @join-black="handleJoinBlack"
      @report-user="handleReportUser"
      @close="personMoreVisible = false"
    ></person-more-popup>
    <join-black-modal
      v-if="blackModalVisible"
      ref="joinBlackModal"
      @confirm="joinBlack"
      @close="closeBlackModal"
    ></join-black-modal>
    <page-loading-modal v-if="pageLoading"></page-loading-modal>
	</view>
</template>

<script>
  import ActiveList from '@/components/active-list/active-list'
  import DynamicsList from '@/components/dynamics-list/dynamics-list'
  import PersonMorePopup from '@/components/person-more-popup.vue'
  import JoinBlackModal from '@/components/join-black-modal.vue'
  import { fetchUserInfo, getProfile, getActivityList, getMomentList, joinBlack } from '@/api/person-center.js'
  import { cancelFollow, createFollow } from '@/api/fans-list.js'
  import disTopHeight from '@/mixins/disTopHeight'
  import PageLoadingModal from '@/components/page-loading.vue'
	export default {
    components: {
      ActiveList,
      DynamicsList,
      PersonMorePopup,
      JoinBlackModal,
      PageLoadingModal
    },
    mixins: [disTopHeight],
    filters: {
      stateFilter(val) {
        const map = {
          1: '+ 关注',
          2: '已关注',
          3: '互相关注',
          4: '回关'
        }
        return map[val]
      }
    },
		data() {
			return {
        personMoreVisible: false,
        blackModalVisible: false,
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
        pageLoading: false,
        actionBarHeight: 0
			};
		},
    computed: {
      tabbarTop() {
        const space = (this.navBarHeight - this.actionBarHeight) / 2
        return space + this.statusBarHeight
      },
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
    onLoad(opt) {
      if (opt.id) {
        this.listQuery.userId = opt.id
        this.getUserInfo(opt.id)
        this.getProfile(opt.id)
        this.getList()
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    onReady() {
      const query = uni.createSelectorQuery().in(this);
      query.select('.action-bar').boundingClientRect(data => {
        this.arrowHeight = data.height
      }).exec();
    },
    methods: {
      getUserInfo(userId) {
        fetchUserInfo({ userId }).then(res => {
          this.userInfo = res.data || {}
        })
      },
      getProfile(userId) {
        getProfile({ userId }).then(res => {
          this.profileInfo = res.data || {}
        })
      },
      getList() {
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
          this.pageLoading = false
          uni.stopPullDownRefresh()
        })
      },
      getMomentList() {
        getMomentList(this.listQuery).then(res => {
          if (res.code === 0) {
            this.total = res.data.total
            if (this.listQuery.current === 1) {
              this.list = res.data.momentList || []
            } else {
              this.list = this.list.concat(res.data.momentList || [])
            }
          } else {
            this.$showToast(res.msg)
          }
        }).finally(() => {
          this.pageLoading = false
          uni.stopPullDownRefresh()
        })
      },
      handleTabbar(val) {
        this.active = val
        this.listQuery.current = 1
        this.getList()
      },
      handleFollow() {
        switch(this.profileInfo.followStatus) {
          case 1:
          case 4:
            // 关注
            this.handleCreateFollow()
            break
          case 2:
          case 3:
            // 取消关注
            this.handleCancelFollow()
            break
          default:
            break
        }
      },
      handleCreateFollow() {
        createFollow({ userId: this.profileInfo.userId }).then(res => {
          if (res.code === 0) {
            this.$showToast('关注成功')
            this.getProfile(this.profileInfo.userId)
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      handleCancelFollow() {
        cancelFollow({ userId: this.profileInfo.userId }).then(res => {
          if (res.code === 0) {
            this.$showToast('取关成功')
            this.getProfile(this.profileInfo.userId)
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      handleLike(val) {
        uni.navigateTo({
          url: `/pages/fans-list/fans-list?from=other&type=${val}&id=${this.profileInfo.userId}`
        })
      },
      handleBack() {
        uni.navigateBack()
      },
      handleMore() {
        this.personMoreVisible = true
        this.$nextTick(() => {
          this.$refs.personMorePopup.open()
        })
      },
      handleJoinBlack() {
        this.personMoreVisible = false
        this.blackModalVisible = true
      },
      joinBlack() {
        joinBlack({
          blocked: true,
          userId: this.listQuery.userId
        }).then(res => {
          if (res.code === 0) {
            this.getUserInfo(this.profileInfo.userId)
            this.getProfile(this.profileInfo.userId)
            this.$showToast('已成功加入黑名单')
            this.blackModalVisible = false
            this.handleMore()
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      handleReportUser() {
        uni.navigateTo({
          url: '/pages/report-list/report-list?id=' + this.profileInfo.userId
        })
      },
      closeBlackModal() {
        this.blackModalVisible = false
        this.handleMore()
      }
    },
    onPullDownRefresh() {
      this.listQuery.current = 1
      this.getList()
    },
    onReachBottom() {
      if (this.pageLoading) {
        return
      }
      this.pageLoading = true
      if (this.total > this.list.length) {
        this.listQuery.current++
        this.getList()
      } else {
        this.pageLoading = false
        // this.$showToast('没有更多数据了')
      }
    },
  }
</script>

<style lang="scss" scoped>
.person-center {
  width: 100%;
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
  background: #181818;
  overflow-y: auto;
  .action-bar {
    position: fixed;
    left: 32rpx;
    z-index: 999;
    display: flex;
    align-items: center;
    .back-icon {
      width: 44rpx;
      height: 44rpx;
    }
    .more-icon {
      width: 48rpx;
      height: 48rpx;
    }
    .divider {
      width: 2rpx;
      height: 40rpx;
      background: #FFFFFF;
      border-radius: 2rpx;
      opacity: 0.34;
      margin: 0 20rpx;
    }
  }
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
      display: flex;
      align-items: center;
      justify-content: center;
      width: 686rpx;
      height: 80rpx;
      background: #343434;
      border-radius: 16rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #7D7D7D;
      line-height: 80rpx;
      margin-bottom: 40rpx;
      &.noFollow {
        background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
        color: #201F2C;
      }
      .another {
        width: 28rpx;
        height: 28rpx;
        margin-right: 10rpx;
      }
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
