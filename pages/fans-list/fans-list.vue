<template>
  <view class="fans-list">
    <view class="tabbar" :style="{ top: tabbarTop + 'px' }">
      <image class="arrow-l" src="/static/arrow-l.png" mode="" @click="handleBack"></image>
      <view class="tabbar-con">
        <text
          v-for="item in tabbarList"
          :key="item.value"
          :class="{
            'tabbar-item': true,
            'tabbar-active': item.value === type
          }"
          @click="handleTabbar(item)"
        >{{ item.name }}</text>
      </view>
    </view>
    <view class="fans-main" :style="{ marginTop: tabbarTop + 'px' }">
      <view class="search-bar">
        <image class="search-icon" src="/static/search.png"></image>
        <input v-model="listQuery.keyword" type="text" confirm-type="search" :placeholder="placeholder" @confirm="searchList" />
      </view>
      <view v-if="list.length > 0" class="list">
        <view
          class="list-item"
          v-for="(item, index) in list"
          :key="index"
        >
          <view class="avatar">
            <image :src="item.avatar" mode="aspectFill"></image>
          </view>
          <view class="content">
            <view class="name">{{ item.nickName }}</view>
            <view class="info">21岁双鱼座</view>
          </view>
          <view class="rig-con">
            <button v-if="type === 'fans'" class="btn" @click="handleLike(item.userId)">回关</button>
            <button v-if="type === 'like'" class="btn already-attion-btn" @click="handleCancelLike(item.userId)">已关注</button>
          </view>
        </view>
      </view>
      <view v-else class="no-con">
        <image class="empty" src="/static/empty.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
  import { fetchFansList, fetchFollowList, fetchFirendList, createFollow, cancelFollow } from '@/api/fans-list.js'
  import disTopHeight from '@/mixins/disTopHeight'
  export default {
    mixins: [disTopHeight],
    data() {
      return {
        type: '',
        tabbarList: [
          { value: 'like', name: '关注' },
          { value: 'fans', name: '粉丝' },
          { value: 'firend', name: '好友' }
        ],
        listQuery: {
          current: 1,
          keyword: '',
          pageSize: 20,
          userId: ''
        },
        list: [],
        total: 0,
        loading: false,
        timer: null,
        placeholder: '搜索粉丝'
      };
    },
    computed: {
      tabbarTop() {
        const space = (this.navBarHeight - 44) / 2
        return space + this.statusBarHeight
      }
    },
    async onLoad(opt) {
      this.type = opt.type
      const data = this.tabbarList.find(item => item.value === opt.type)
      this.placeholder = '搜索' + data.name
      this.listQuery.userId = uni.getStorageSync('userId')
      this.getList()
    },
    methods: {
      getList() {
        uni.showLoading({
        	title: '加载中'
        });
        if (this.type === 'like') {
          this.getFollowList()
        } else if (this.type === 'fans') {
          this.getFansList()
        } else {
          this.getFirendList()
        }
      },
      searchList() {
        this.listQuery.current = 1
        this.getList()
      },
      getFollowList() {
        fetchFollowList(this.listQuery).then(res => {
          this.total = res.data.totalNum
          if (this.listQuery.current === 1) {
            this.list = res.data.list || []
          } else {
            this.list = this.list.concat(res.data.list || [])
          }
        }).finally(() => {
          this.loading = false
          uni.stopPullDownRefresh()
          uni.hideLoading();
        })
      },
      getFansList() {
        fetchFansList(this.listQuery).then(res => {
          this.total = res.data.totalNum
          if (this.listQuery.current === 1) {
            this.list = res.data.list || []
          } else {
            this.list = this.list.concat(res.data.list || [])
          }
        }).finally(() => {
          this.loading = false
          uni.stopPullDownRefresh()
          uni.hideLoading();
        })
      },
      getFirendList() {
        fetchFirendList(this.listQuery).then(res => {
          this.total = res.data.totalNum
          if (this.listQuery.current === 1) {
            this.list = res.data.list || []
          } else {
            this.list = this.list.concat(res.data.list || [])
          }
        }).finally(() => {
          this.loading = false
          uni.stopPullDownRefresh()
          uni.hideLoading();
        })
      },
      handleTabbar(item) {
        this.list = []
        this.type = item.value
        this.listQuery.current = 1
        this.placeholder = '搜索' + item.name
        this.getList()
      },
      handleLike(userId) {
        createFollow({ userId }).then(res => {
          if (res.code === 0) {
            this.$showToast('关注成功')
            this.listQuery.current = 1
            this.getList()
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      handleCancelLike(userId) {
        cancelFollow({ userId }).then(res => {
          if (res.code === 0) {
            this.$showToast('取关成功')
            this.listQuery.current = 1
            this.getList()
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      handleBack() {
        uni.navigateBack()
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
        this.$showToast('没有更多数据了')
      }
    },
  }
</script>

<style lang="scss" scoped>
.fans-list {
  min-height: 100vh;
  background: #181818;
  .tabbar {
    position: relative;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    .arrow-l {
      position: absolute;
      left: 32rpx;
      top: 28rpx;
      width: 32rpx;
      height: 32rpx;
    }
    .tabbar-con {
      font-size: 32rpx;
      font-weight: 400;
      color: #7D7D7D;
      .tabbar-item {
        margin-right: 32rpx;
        padding-bottom: 20rpx;
        border-bottom: 4rpx solid transparent;
        &:last-of-type {
          margin-right: 0;
        }
        &.tabbar-active {
          border-bottom-color: #ffffff;
        }
      }
    }
  }
  .fans-main {
    padding: 28rpx 32rpx;
    .search-bar {
      position: relative;
      .search-icon {
        position: absolute;
        left: 22rpx;
        top: 27rpx;
        width: 22rpx;
        height: 22rpx;
      }
      input {
        width: 100%;
        height: 76rpx;
        background: #262626;
        border-radius: 32rpx;
        font-size: 24rpx;
        font-weight: 400;
        padding-left: 54rpx;
        box-sizing: border-box;
        color: #ffffff;
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
    .no-con {
      margin-top: 300rpx;
      text-align: center;
      .empty {
        width: 204rpx;
        height: 204rpx;
      }
    }
  }
}
</style>
