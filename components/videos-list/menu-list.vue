<template>
  <view class="menu-list" :class="{ isDetail: hasDetail }">
    <view class="bottom-shadow"></view>
    <!-- 底部标题 -->
    <view v-if="!(isDynamics && item.moment && item.moment.contentType === 3)" class="footTitle"
      :class="[vodIndex == index ? (sliderDrag ? 'vodMenu-bright1' : (moveOpacity ? 'vodMenu-bright2' : 'vodMenu-bright0')) : '']">
      <text v-if="payTagShow" class="pay-tag" :class="{ noPay: !item.activity.needToPay }">{{
        item.activity.needToPay ? '需付款' : '无需付款'
      }}</text>
      <view class="v-title-wrap">
        <text class="foot-name">{{ footTitle }}</text>
        <text v-if="!isDynamics" class="detail pointer-events-auto" @click.stop="handleDetail">详情</text>
        <image v-if="!isDynamics" class="arrow-r" src="/static/arrow-r.png"></image>
      </view>
      <view v-if="item.activity" class="foot-cont">{{ item.activity.startTime }} - {{ item.activity.endTime }}</view>
      <view v-if="isDynamics" id="content" class="content">
        {{ formatDyContent }}
        <text v-if="dyContent.length > 32" class="pointer-events-auto" style="margin-left: 16rpx" @click.stop="handleToggleText">展开</text>
      </view>
      <view v-if="!isDynamics" class="location">
        <image src="/static/location.png" mode=""></image>
        <text>{{ item.location }} · {{ item.distance | distanceFilter }}</text>
      </view>
    </view>
    <!-- 右侧操作栏 -->
    <view class="menuBox">
      <view class="vodMenu"
        :class="[vodIndex == index ? (sliderDrag ? 'vodMenu-bright1' : (moveOpacity ? 'vodMenu-bright2' : 'vodMenu-bright0')) : '']">
        <!-- 头像 -->
        <view class="menu-avatar">
          <image :src="item.avatar" mode="aspectFill" class="avatar-image pointer-events-auto"
            @click.stop="clickAvatar"></image>
          <view class="follow pointer-events-auto" @click.stop="clickFollow">
            <image src="/static/add-like.png" mode="" class="follow-guanzhu" v-if="!item.followed"></image>
            <image src="/static/has-like.png" mode="" class="follow-guanzhu guanzhu-gou" v-else></image>
          </view>
        </view>
        <!-- 点赞 -->
        <view class="fabulous pointer-events-auto" :class="{ isHidden: !isDynamics }"
          @click.stop="clickLike">
          <view class="fabulous-image fabulous-taoxin pointer-events-auto">
            <image src="/static/heart-active.png" class="fabulous-image" v-if="item.liked || item.moment.liked"></image>
            <image src="/static/heart.png" mode="" class="fabulous-image" v-else></image>
          </view>
          <view class="fabulous-num">{{ (item.moment && item.moment.likeNum) || item.likeCount || 0 }}</view>
        </view>
        <!-- 评论 -->
        <view class="fabulous pointer-events-auto" :class="{ isHidden: !isDynamics }"
          style="margin-top: 30rpx;" @click.stop="clickComment">
          <view class="fabulous-image">
            <image src="/static/comment.png" mode="" class="fabulous-image"></image>
          </view>
          <view class="fabulous-num">{{ (item.moment && item.moment.commentNum) || item.commentCount || 0 }}</view>
        </view>
        <!-- 转发 -->
        <view class="fabulous pointer-events-auto" style="margin-top: 30rpx;" @click.stop="clickTransfer">
          <view class="fabulous-image">
            <image src="/static/forward-arrow.png" mode="" class="fabulous-image"></image>
          </view>
          <view class="fabulous-num">{{ item.shareNum > 0 ? item.shareNum : '转发' }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import checkLogin from '@/mixins/checkLogin'
export default {
  mixins: [checkLogin],
  data() {
    return {
      followed: false,
      fabuTimeOut: null
    }
  },
  filters: {
    distanceFilter(val) {
      return Number(val).toFixed(2) + 'km'
    }
  },
  props: {
    activeType: {
      type: String,
      default: 'recommend'
    },
    index: {
      type: Number,
      default: 0
    },
    vodIndex: {
      type: Number,
      default: 0
    },
    vodCurIndex: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      default: () => { return {} }
    },
    discussNum: {
      type: Number,
      default: 0
    },
    sliderDrag: { //是否在拖动进度
      type: Boolean,
      default: false
    },
    moveOpacity: { //是否透明
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => { }
    },
    hasDetail: { // 是否是详情页
      type: Boolean,
      default: false
    }
  },
  computed: {
    payTagShow() {
      return !this.isDynamics && this.item?.activity?.show
    },
    isDynamics() {
      return this.activeType === 'dynamics' || this.item.type === 2
    },
    footTitle() {
      if (this.isDynamics) {
        if (this.hasDetail) {

        }
        return this.item?.moment?.title || ''
      } else {
        return this.item.location
      }
    },
    // 动态 文字内容
    dyContent() {
      if (this.isDynamics) {
        if (this.hasDetail) {
          return this.item.content
        }
        return this.item?.moment?.content || ''
      }
      return ''
    },
    formatDyContent() {
      if (!this.dyContent) {
        return ''
      }
      if (this.dyContent.length > 32) {
        return this.dyContent.substring(0, 32) + '...'
      } else {
        return this.dyContent
      }
    }
  },
  methods: {
    handleDetail() {
      this.handleCheckLogin(() => {
        if (this.hasDetail) {
          return
        }
        uni.navigateTo({
          url: '/pages/activity-detail/activity-detail?id=' + this.item.indexId
        })
      })
    },
    clickFollow() {
      this.handleCheckLogin(() => {
        this.$emit('click-follow', this.item)
      })
    },
    clickLike() {
      this.handleCheckLogin(() => {
        this.$emit('click-liked', this.item)
      })
    },
    clickComment() {
      this.handleCheckLogin(() => {
        this.$emit('click-comment', this.item)
      })
    },
    clickTransfer() {
      this.handleCheckLogin(() => {
        this.$emit('click-transfer', this.item)
      })
    },
    clickAvatar() {
      this.handleCheckLogin(() => {
        if (this.hasDetail) {
          return
        }
        uni.navigateTo({
          url: '/pages/person-detail/person-detail?id=' + this.item.userId
        })
      })
    },
    handleToggleText() {
      this.$emit('click-toggle', this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-tag {
  padding: 4rpx 12rpx;
  background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
  border-radius: 8rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: #201F2C;
  line-height: 40rpx;
  letter-spacing: 1px;
  &.noPay {
    background: rgba(0,0,0,0.2);
    color: #FFFFFF;
  }
}
.pointer-events-auto {
  pointer-events: auto;
}

.menu-list {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  pointer-events: none;
  z-index: 9999;
}

.isHidden {
  visibility: hidden;
}

/* 右边菜单栏 */
.menuBox {
  position: absolute;
  right: 10rpx;
  width: 115rpx;
  height: 100%;
  z-index: 8;
  display: flex;
  align-items: center;
}

.vodMenu {
  margin-top: 100rpx;
  width: 115rpx;
  /* bottom: 400rpx; */
  display: flex;
  align-items: center;
  flex-direction: column;
}

.vodMenu-bright0 {
  opacity: 1;
  transition: all 0.3s linear;
}

.vodMenu-bright1 {
  opacity: 0;
  transition: all 0.3s linear;
}

.vodMenu-bright2 {
  opacity: 0.2;
  transition: all 0.3s linear;
}

.menu-avatar {
  position: relative;
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  border: 3rpx solid #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-image {
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
}

.follow {
  position: absolute;
  bottom: -20rpx;
  width: 36rpx;
  height: 36rpx;
  background-color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.follow:active {
  transform: scale(0.7);
  transition: all 0.3s linear;
}

.follow-guanzhu {
  width: 36rpx;
  height: 36rpx;
}

.guanzhu-gou {
  width: 30rpx;
  height: 30rpx;
}

.fabulous {
  width: 100rpx;
  margin-top: 80rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.fabulous-image {
  width: 56rpx;
  height: 56rpx;
}

.fabulous-num {
  width: 100rpx;
  text-align: center;
  margin-top: 8rpx;
  font-size: 22rpx;
  font-weight: 400;
  color: #FFFFFF;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14);
}

.fabulous-taoxin:active {
  transition: all 0.2s linear;
  transform: scale(0.7);
}

.isDetail .footTitle {
  bottom: 210rpx;
}

/* 底部标题部分 */
.footTitle {
  position: absolute;
  bottom: 20px;
  left: 0;
  z-index: 8;
  padding: 0 32rpx;

  .location {
    display: flex;
    align-items: center;
    height: 64rpx;
    background: rgba(0, 0, 0, 0.32);
    border-radius: 32rpx;
    padding: 0 16rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #CECECE;

    image {
      width: 32rpx;
      height: 32rpx;
      margin-right: 8rpx;
    }
  }
}

.v-title-wrap {
  display: flex;
  align-items: center;
  margin: 24rpx 0;

  .foot-name {
    font-size: 32rpx;
    font-weight: 500;
    color: #FFFFFF;
  }

  .detail {
    font-size: 32rpx;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    margin-left: 20rpx;
  }

  .arrow-r {
    width: 32rpx;
    height: 32rpx;
  }
}

.foot-cont {
  font-size: 28rpx;
  font-weight: 400;
  color: #FFFFFF;
  margin: 20rpx 0 24rpx;
}

.content {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding-right: 160rpx;
  margin-bottom: 24rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #FFFFFF;
}

.foot-primary {
  font-size: 27rpx;
  color: #FFFFFF;
}

.bottom-shadow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 500rpx;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%);
  z-index: 7;
  pointer-events: none;
}
.bottom-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 180rpx;
  background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
  z-index: 7;
  pointer-events: none;
}
</style>