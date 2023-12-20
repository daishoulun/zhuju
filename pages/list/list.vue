<template>
  <view class="activity-list">
    <StatusBarPlace></StatusBarPlace>
    <view class="logo">
      opening
    </view>
    <uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="bannerList" :current="current" mode="default"
      :dots-styles="dotsStyles" field="content">
      <swiper class="swiper-box" @change="change" :current="swiperDotIndex">
        <swiper-item v-for="(item, index) in bannerList" :key="index">
          <view class="swiper-item" :class="'swiper-item' + index" :style="{ backgroundImage: 'url(' + item.bannerImgUrl + ')' }" @click="handleBanner(item.bannerJumpUrl)">
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <view class="activity-main">
      <view class="activity-list-wrap" v-if="isLogin">
      <ActivityCard v-for="item in list" :activityData="item" :key="item.activityId" @click-card="handleCard"></ActivityCard>
      </view>
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
  import StatusBarPlace from '@/components/status-bar-place.vue'
  import { fetchList } from '@/api/list.js'
  export default {
    components: {
      ActivityCard,
      StatusBarPlace
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
        bannerList: [],
        listQuery: {
          current: 1,
          pageSize: 20
        },
        list: [],
        total: 0,
        loading: false
      };
    },
    onShow() {
      this.getList()
    },
    methods: {
      change(e) {
        this.current = e.detail.current
      },
      clickItem(e) {
        this.swiperDotIndex = e
      },
      getList() {
        uni.showLoading({
        	title: '加载中'
        });
        fetchList(this.listQuery).then(res => {
          if (res.code === 0) {
            this.bannerList = res.data.banners
            this.total = res.data.total
            if (this.listQuery.current === 1) {
              this.list = res.data.list || []
            } else {
              this.list = this.list.concat(res.data.list || [])
            }
          }
        }).finally(() => {
          this.loading = false
          uni.stopPullDownRefresh()
          uni.hideLoading();
        })
      },
      handleBanner(url) {
        uni.navigateTo({
          url: '/pages/web-view/web-view?src=' + url
        })
      },
      handleCard(item) {
        uni.navigateTo({
          url: '/pages/activity-detail/activity-detail?id=' + item.activityId
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
        this.$showToast('没有更多数据了')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .logo {
    background-image: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);;
    -webkit-background-clip: text;
    color: transparent;
    font-size: 40rpx;
    margin-top: 32rpx;
    padding-left: 32rpx;
    box-sizing: border-box;
  }
  .activity-list {
    height: 100vh;
    overflow-y: auto;
    background: #181818;
    box-sizing: border-box;
    .swiper-box {
      margin-top: 64rpx;
      padding: 0 38rpx;
      overflow: hidden;
      .swiper-item {
        width: 100%;
        height: 279rpx;
        border-radius: 32rpx;
        background-size: cover;
        background-position: center;
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