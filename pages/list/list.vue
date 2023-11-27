<template>
  <view class="activity-list">
    <uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" mode="default"
      :dots-styles="dotsStyles" field="content">
      <swiper class="swiper-box" @change="change" :current="swiperDotIndex">
        <swiper-item v-for="(item, index) in 3" :key="index">
          <view class="swiper-item" :class="'swiper-item' + index">
            <text style="color: #fff; font-size: 32px;">{{index+1}}</text>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <view class="activity-main">
      <ActivityCard v-if="isLogin"></ActivityCard>
      <view v-else class="no-login">
        <image src="/static/no-con.png"></image>
        <view class="tip">暂无内容</view>
        <view class="btn">去登录</view>
      </view>
    </view>
  </view>
</template>

<script>
  import ActivityCard from '@/components/activity-card.vue'
  export default {
    components: {
      ActivityCard
    },
    data() {
      return {
        isLogin: true,
        current: 0,
				swiperDotIndex: 0,
        mode: 'default',
        dotsStyles: {
          width: 8,
          bottom: 6,
          borderRadius: 3,
          color: '#FFB7FF',
          backgroundColor: 'rgba(255,255,255,0.29)',
          border: '1px rgba(255,255,255,0.29) solid',
          selectedBackgroundColor: '#FFB7FF',
          selectedBorder: '1px #FFB7FF solid'
        },
        info: [{
            colorClass: 'uni-bg-red',
            url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
            content: '内容 A'
          },
          {
            colorClass: 'uni-bg-green',
            url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
            content: '内容 B'
          },
          {
            colorClass: 'uni-bg-blue',
            url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
            content: '内容 C'
          }
        ],
      };
    },
    methods: {
      change(e) {
        this.current = e.detail.current
      },
      clickItem(e) {
        this.swiperDotIndex = e
      },
    }
  }
</script>

<style lang="scss" scoped>
  .activity-list {
    height: calc(100vh - 100rpx);
    overflow-y: auto;
    background: #181818;
    padding-top: 26rpx;
    box-sizing: border-box;
    .swiper-box {
      padding-left: 38rpx;
      .swiper-item {
        width: 100%;
        height: 279rpx;
        border-radius: 32rpx;
        background: red;
      }
    }
    .activity-main {
      padding: 20rpx;
    }
    .no-login {
      margin-top: 238rpx;
      text-align: center;
      image {
        width: 264rpx;
        height: 228rpx;
      }
      .tip {
        margin: 80rpx 0 50rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #7D7D7D;
      }
      .btn {
        width: 268rpx;
        height: 76rpx;
        line-height: 76rpx;
        background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
        border-radius: 38rpx;
        margin: 0 auto;
      }
    }
  }
</style>