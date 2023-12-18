<template>
  <view class="active-list">
    <view v-for="item in list" :key="item.activityId" class="active-item" @click="handleClick(item.activityId)">
      <view class="active-con" :style="{ backgroundImage: 'url(' + setCoverUrl(item) + ')'}">
        <text class="status-tag">
          {{ item.activityStatusInfo }}
        </text>
      </view>
      <view class="active-footer">
        <view class="title">{{ item.activitySubject }}</view>
        <view class="info-bar">
          <view class="user-info">
            <image :src="item.avatar" mode=""></image>
            <text class="name">{{ item.nickName }}</text>
          </view>
          <view class="forward">
            <image src="/static/forward-arrow.png"></image>
            <text class="num">{{ item.shareNum }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"active-list",
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    // filters: {
    //   stateFilter(val) {
    //     const map = {
    //       0: '未付款',
    //       10: '未开始',
    //       20: '进行中',
    //       30: '活动结束',
    //       40: '活动取消'
    //     }
    //     return map[val]
    //   }
    // },
    data() {
      return {
        
      };
    },
    methods: {
      setCoverUrl(item) {
        return item.cover || item.activityFileUrl
      },
      handleClick(val) {
        uni.navigateTo({
          url: '/pages/activity-detail/activity-detail?id=' + val
        })
      }
    }
  }
</script>

<style lang="scss">
.active-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .active-item {
    position: relative;
    width: 332rpx;
    border-radius: 16rpx;
    margin-right: 10px;
    overflow: hidden;
    margin-bottom: 20rpx;
    &:nth-of-type(2n) {
      margin-right: 0;
    }
    &:last-of-type,
    &:nth-last-of-type(2) {
      margin-bottom: 0;
    }
    .active-con {
      height: 408rpx;
      background: #D8D8D8;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
    .status-tag {
      position: absolute;
      top: 16rpx;
      left: 12rpx;
      height: 40rpx;
      padding: 0 8rpx;
      border-radius: 20rpx;
      text-align: center;
      line-height: 40rpx;
      background-color: #343434;
      font-size: 20rpx;
      font-weight: 500;
      color: #FFFFFF;
      &.progress {
        color: #201F2C;
        background-color: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
      }
    }
    .active-footer {
      height: 132rpx;
      padding: 24rpx 16rpx 0 20rpx;
      background: #262626;
      .title {
        font-size: 26rpx;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 36rpx;
        margin-bottom: 16rpx;
      }
      .info-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user-info {
          display: flex;
          align-items: center;
          font-size: 22rpx;
          font-weight: 400;
          color: #7D7D7D;
          image {
            width: 36rpx;
            height: 36rpx;
            border-radius: 50%;
            margin-right: 8rpx;
          }
        }
        .forward {
          font-size: 26rpx;
          font-weight: 400;
          color: #FFFFFF;
          image {
            width: 28rpx;
            height: 28rpx;
            margin-right: 8rpx;
          }
        }
      }
    }
  }
}
</style>