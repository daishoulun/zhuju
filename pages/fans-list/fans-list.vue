<template>
  <view class="fans-list">
    <view class="tabbar">
      <image class="arrow-l" src="/static/arrow-l.png" mode="" @click="handleBack"></image>
      <view class="tabbar-con">
        <text
          v-for="item in tabbarList"
          :key="item.value"
          :class="{
            'tabbar-item': true,
            'tabbar-active': item.value === type
          }"
          @click="handleTabbar(item.value)"
        >{{ item.name }}</text>
      </view>
    </view>
    <view class="fans-main">
      <view class="search-bar">
        <image class="search-icon" src="/static/search.png"></image>
        <input type="text" placeholder="搜索粉丝">
      </view>
      <view class="list">
        <view
          class="list-item"
          v-for="item in list"
        >
          <view class="avatar">
            <image :src="item.avatar" mode=""></image>
          </view>
          <view class="content">
            <view class="name">{{ item.nickName }}</view>
            <view class="info">21岁双鱼座</view>
          </view>
          <view class="rig-con">
            <button class="btn">回关</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { fetchFansList, fetchFollowList, fetchFirendList, createFollow, cancelFollow } from '@/api/fans-list.js'
  
  
  export default {
    data() {
      return {
        type: '',
        tabbarList: [
          { value: 'like', name: '关注' },
          { value: 'fans', name: '粉丝' },
          { value: 'firend', name: '朋友' }
        ],
        listQuery: {
          current: 1,
          keyword: '',
          pageSize: 20,
          userId: ''
        },
        list: []
      };
    },
    onLoad(opt) {
      this.type = opt.type
      this.listQuery.userId = uni.getStorageSync('userId')
      this.getList()
    },
    methods: {
      getList() {
        if (this.type === 'like') {
          this.getFollowList()
        } else if (this.type === 'fans') {
          this.getFansList()
        } else {
          this.getFirendList()
        }
      },
      getFollowList() {
        fetchFollowList(this.listQuery).then(res => {
          this.list = res.data.list || []
          this.total = res.data.totalNum
        })
      },
      getFansList() {
        fetchFansList(this.listQuery).then(res => {
          this.list = res.data.list || []
          this.total = res.data.totalNum
        })
      },
      getFirendList() {
        fetchFirendList(this.listQuery).then(res => {
          this.list = res.data.list || []
          this.total = res.data.totalNum
        })
      },
      handleTabbar(val) {
        this.type = val
        this.getList()
      },
      handleBack() {
        uni.navigateBack()
      }
    }
  }
</script>

<style lang="scss" scoped>
.fans-list {
  height: 100vh;
  background: #181818;
  overflow-y: auto;
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
}
</style>
