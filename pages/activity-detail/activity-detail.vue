<template>
  <view class="activity-detail">
    <view class="bg" :style="{ backgroundImage: 'url(' + activityDetail.cover + ')' }"></view>
    <view class="activity-content">
      <view class="base-info">
        <view class="title">{{ activityDetail.activitySubject }}</view>
        <view class="time">{{ activityDetail.startTime }} - {{ activityDetail.endTime }}</view>
        <view class="desc">{{ activityDetail.dsc }}</view>
      </view>
      <view class="other-info">
        <view class="site-info">
          <view class="title">场地服务费</view>
          <view class="info">
            <view class="price-info">
              <text class="price">{{ activityDetail.unitPrice }}</text>
              <text class="">{{ activityDetail.payerType | payerTypeFilter }}</text>
            </view>
            <text>费用明细</text>
          </view>
        </view>
        <view class="location">
          <view class="title">地点</view>
          <view class="location-detail">
            <view class="logo">
              <image src="/static/logo.png"></image>
            </view>
            <view class="loc-info">
              <view class="name">{{ activityDetail.location }}</view>
              <view class="no">{{ activityDetail.rongRoomId }}</view>
            </view>
          </view>
        </view>
        <view class="partake-info">
          <view class="title">参与人 <text class="partake-num">已参与{{ activityDetail.hasJoin }}人，剩余{{ activityDetail.noJoin }}人待参与</text></view>
          <view class="pritake-detail">
            <view
              class="pritake-item"
              v-for="item in activityDetail.list || []"
              :key="item.key"
            >
              <view v-if="item.emcee === 1" class="host">主持人</view>
              <view class="avatar">
                <image class="img-head" :src="item.avatar"></image>
                <image class="sex" :src="item.sex === '1' ? '/static/man.png' : '/static/women.png'"></image>
              </view>
              <view class="name">{{ item.nickName }}</view>
            </view>
          </view>
        </view>
        <view class="tip">还有 07:48:20 就要开始了，请尽快加入哦～</view>
        <view class="join">立即加入</view>
      </view>
    </view>
    <view class="placeholder"></view>
  </view>
</template>

<script>
  import { fetchDetail } from '@/api/activity-detail.js'
  export default {
    filters: {
      payerTypeFilter(val) {
        const map = {
          1: '男士付',
          2: '女士付',
          3: '我付款'
        }
        return map[val]
      }
    },
    data() {
      return {
        activityDetail: {},
      };
    },
    onLoad(opt) {
      this.getDetail(opt.id)
    },
    methods: {
      getDetail(id) {
        fetchDetail({ activityId: id }).then(res => {
          this.activityDetail = res?.data || {
            activitySubject: 'hongpa',
            startTime: '12-25 7:00',
            endTime: '12-31 20:00',
            unitPrice: '1000元',
            payerType: 1,
            dsc: '好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心好开心'
          }
          this.activityDetail.noJoin = this.activityDetail.femaleRemainNum || 0 + this.activityDetail.maleRemainNum || 0
          this.activityDetail.hasJoin = this.activityDetail.totalPeopleNum - this.activityDetail.noJoin
          this.activityDetail.cover = 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.activity-detail {
  height: calc(100vh - 88rpx);
  overflow: auto;
  .title {
    font-size: 32rpx;
    font-weight: 500;
    color: #FFFFFF;
    margin-bottom: 28rpx;
  }
  .bg {
    height: 904rpx;
    background-size: cover;
  }
  .activity-content {
    margin-top: -506rpx;
  }
  .base-info {
    width: 100%;
    height: 352rpx;
    padding: 50rpx 32rpx 0;
    box-sizing: border-box;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, #181818 100%, #181818 100%);
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    backdrop-filter: blur(4px);
    .title {
      font-size: 36rpx;
      font-weight: 500;
      color: #FFFFFF;
    }
    .time {
      font-size: 28rpx;
      font-weight: 400;
      color: #DCAEF4;
      margin: 20rpx 0 36rpx;
    }
    .desc {
      font-size: 24rpx;
      font-weight: 400;
      color: #7D7D7D;
      line-height: 34rpx;
    }
  }
  .other-info {
    padding: 32rpx;
    background-color: #181818;
  }
  .site-info {
    margin-bottom: 68rpx;
    .info {
      font-size: 28rpx;
      font-weight: 500;
      color: #7D7D7D;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price-info {
        .price {
          color: #DCAEF4;
          margin-right: 24rpx;
        }
        text {
          color: #7CA6F9;
        }
      }
    }
  }
  .location {
      .location-detail {
        display: flex;
        align-items: center;
        .logo {
          width: 92rpx;
          height: 92rpx;
          margin-right: 22rpx;
          image {
            height: 100%;
            width: 100%;
            border-radius: 100%;
          }
        }
        .loc-info {
          flex: 1;
          .name {
            font-size: 28rpx;
            font-weight: 500;
            color: #FFFFFF;
            margin-bottom: 8rpx;
          }
          .no {
            font-size: 24rpx;
            font-weight: 400;
            color: #7A7A7A;
          }
        }
      }
  }
  .partake-info {
    margin: 60rpx 0;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 36rpx;
      .partake-num {
        font-size: 28rpx;
        font-weight: 400;
        color: #7D7D7D;
      }
    }
    .pritake-detail {
      display: flex;
      flex-wrap: wrap;
      .pritake-item {
        position: relative;
        width: calc((100% - 48rpx) / 4);
        height: 192rpx;
        background: #262626;
        border-radius: 16rpx;
        padding-top: 28rpx;
        text-align: center;
        overflow: hidden;
        margin-right: 16rpx;
        margin-bottom: 16rpx;
        &:nth-of-type(4n) {
          margin-right: 0;
        }
        .host {
          position: absolute;
          top: 0;
          left: 0;
          width: 76rpx;
          height: 32rpx;
          background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
          border-radius: 0rpx 0rpx 12rpx 0rpx;
          line-height: 32rpx;
          text-align: center;
          font-size: 16rpx;
          font-weight: 500;
          color: #201F2C;
        }
        .avatar {
          position: relative;
          width: 88rpx;
          height: 88rpx;
          margin: 0 auto 16rpx;
          .img-head {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          .sex {
            position: absolute;
            top: 0;
            right: 0;
            width: 32rpx;
            height: 32rpx;
          }
        }
        .name {
          font-size: 24rpx;
          font-weight: 400;
          color: #7D7D7D;
        }
      }
    }
  }
  .tip {
    font-size: 24rpx;
    font-weight: 400;
    color: #DCAEF4;
    text-align: center;
    margin: 30rpx 0 16rpx;
  }
  .join {
    height: 120rpx;
    background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
    border-radius: 60rpx;
    font-size: 36rpx;
    font-weight: 600;
    color: #201F2C;
    text-align: center;
    line-height: 120rpx;
  }
}
</style>
