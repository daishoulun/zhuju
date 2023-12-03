<template>
  <view class="activity-detail">
    <view class="bg"></view>
    <view class="activity-content">
      <view class="base-info">
        <view class="title">Club·Puff 7号聚会</view>
        <view class="time">7月17日 20:30-23:00</view>
        <view class="desc">今晚在我的毕业派对上一起嗨，快来加入吧，有没有要来的赶紧报名啦，过期不候哦，详细的内容今晚在我的毕业派对上一起嗨，快来加入吧今晚在我的毕业派对上一起嗨… </view>
      </view>
      <view class="other-info">
        <view class="site-info">
          <view class="title">场地服务费</view>
          <view class="info">
            <view class="price-info">
              <text class="price">1000元/人、3小时</text>
              <text class="">男士付</text>
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
              <view class="name">Club·Puff泡福俱乐部</view>
              <view class="no"> T 708</view>
            </view>
          </view>
        </view>
        <view class="partake-info">
          <view class="title">参与人 <text class="partake-num">已参与6人，剩余6人待参与</text></view>
          <view class="pritake-detail">
            <view
              class="pritake-item"
              v-for="item in list"
              :key="item.key"
            >
              <view v-if="item.isZcr === 1" class="host">主持人</view>
              <view class="avatar">
                <image class="img-head" :src="item.logo"></image>
                <image class="sex" :src="item.sex === '1' ? '/static/man.png' : '/static/women.png'"></image>
              </view>
              <view class="name">{{ item.name }}</view>
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
  export default {
    data() {
      return {
        list: [{
          id: 0,
          name: '小蒲日记',
          logo: '/static/logo.png',
          sex: '1',
          isZcr: 1
        },{
          id: 1,
          name: '小蒲日记',
          logo: '/static/logo.png',
          sex: '1',
          isZcr: 0
        },{
          id: 3,
          name: '小蒲日记',
          logo: '/static/logo.png',
          sex: '1',
          isZcr: 0
        },{
          id: 4,
          name: '小蒲日记',
          logo: '/static/logo.png',
          sex: '1',
          isZcr: 0
        },{
          id: 5,
          name: '小蒲日记',
          logo: '/static/logo.png',
          sex: '2',
          isZcr: 0
        },{
          id: 6,
          name: '小蒲日记',
          logo: '/static/logo.png',
          sex: '1',
          isZcr: 0
        }]
      };
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
    height: 552rpx;
  }
  .activity-content {
    margin-top: -154rpx;
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
