<template>
  <view class="activity-list">
    <view class="logo" :style="{ top: imgTop + 'px' }">
      <image src="/static/opening.png"></image>
    </view>
    <view class="banner-list">
      <swiper class="swiper-box" @change="change">
        <swiper-item v-for="(item, index) in bannerList" :key="index">
          <view class="swiper-item" :class="'swiper-item' + index" :style="{ backgroundImage: 'url(' + item.bannerImgUrl + ')' }" @click="handleBanner(item.bannerJumpUrl)">
          </view>
        </swiper-item>
      </swiper>
      <view class="dots">
        <view
          v-for="(item, index) in bannerList"
          :key="index"
          class="dots-item"
          :class="{ active: current === index }"></view>
      </view>
    </view>
    <view class="activity-main">
      <view class="activity-list-wrap" v-if="isLogin">
        <template v-if="list.length > 0">
          <ActivityCard v-for="item in list" :activityData="item" :key="item.activityId" @click-card="handleCard"></ActivityCard>
        </template>
        <view v-else class="no-con">
          <image src="/static/no-con.png"></image>
          <view class="tip">暂无内容</view>
        </view>
      </view>
      <view v-else class="no-login">
        <image src="/static/no-con.png"></image>
        <view class="tip">暂无内容</view>
        <view class="btn" @click="handleLogin">去登录</view>
      </view>
    </view>
  </view>
</template>

<script>
  import ActivityCard from '@/components/activity-card.vue'
  import disTopHeight from '@/mixins/disTopHeight'
  import { fetchList } from '@/api/list.js'
  export default {
    components: {
      ActivityCard,
    },
    mixins: [disTopHeight],
    data() {
      return {
        current: 0,
        bannerList: [],
        listQuery: {
          current: 1,
          pageSize: 20
        },
        list: [],
        total: 0,
        loading: false,
        isLogin: false,
      };
    },
    computed: {
      imgTop() {
        const space = (this.navBarHeight - 20) / 2
        return space + this.statusBarHeight
      }
    },
    onShow() {
      this.init()
    },
    methods: {
      init() {
        const userId = uni.getStorageSync('userId')
        if (userId) {
          this.isLogin = true
          this.getList()
        } else {
          this.isLogin = false
        }
      },
      change(e) {
        this.current = e.detail.current
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
          } else if (res.code === 1001) {
            this.isLogin = false
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
      },
      handleLogin() {
        uni.navigateTo({
          url: '/pages/login/login'
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
<style>
.uni-swiper__dots-item {
  border-radius: 3px;
}
</style>
<style lang="scss" scoped>
  .logo {
    position: relative;
    padding-left: 32rpx;
    box-sizing: border-box;
    image {
      width: 142rpx;
      height: 42rpx;
    }
  }
  .banner-list {
    margin-top: 62rpx;
    .dots {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 6rpx;
      .dots-item {
        width: 12rpx;
        height: 4rpx;
        background: rgba(255,255,255,0.29);
        border-radius: 2rpx;
        margin-right: 14rpx;
        transition: all .5s;
        &.active {
          width: 32rpx;
          background: #FFB7FF;
        }
      }
    }
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
    .no-con {
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
    }
    .no-login {
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