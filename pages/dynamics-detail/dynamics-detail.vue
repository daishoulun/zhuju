<template>
  <view class="dynamics-detail">
    <view id="back" :style="{
      top: tabbarTop + 'px'
    }" @click="handleBack">
      <image class="back-icon" src="/static/arrow-l.png"></image>
    </view>
    <view class="dynamics-content" @click="handleClick">
      <swiper
        v-if="detail.contentType === 1"
        class="swiper-wrap"
        circular
      >
        <swiper-item
          v-for="img in detail.contentUrlList"
          :key="img"
        >
          <image class="img" :src="img" mode="widthFix"></image>
        </swiper-item>
      </swiper>
      <video
        v-else-if="detail.contentType=== 2"
        class="video"
        id="myVideo"
        :src="detail.contentUrlList[0]"
        :controls="false"
        :show-center-play-btn="false"
        object-fit="fill"
        autoplay
        @play="videoPlay"
        @pause="videoPause"
        @ended="videoEnded"
      ></video>
      <text v-else-if="detail.contentType === 3">{{ detail.content }}</text>
    </view>
    <menu-list
      :item="detail"
      :hasDetail="true"
      activeType="dynamics"
      @click-transfer="val => $emit('click-transfer', val)"
    ></menu-list>
  </view>
</template>

<script>
  import MenuList from '@/components/videos-list/menu-list.vue'
  import { queryDynamicsDetail } from '@/api/dynamics-detail.js'
  import disTopHeight from '@/mixins/disTopHeight'
  export default {
    components: {
      MenuList
    },
    mixins: [disTopHeight],
    data() {
      return {
        id: '',
        detail: {},
        arrowHeight: 0,
        isPlay: false
      }
    },
    computed: {
      tabbarTop() {
        const space = (this.navBarHeight - this.arrowHeight) / 2
        return space + this.statusBarHeight
      }
    },
    onLoad(opt) {
      this.id = opt.id
      this.getDetail()
    },
    onReady() {
      const query = uni.createSelectorQuery().in(this);
      query.select('#back').boundingClientRect(data => {
        this.arrowHeight = data.height
      }).exec();
    },
    methods: {
      getDetail() {
        queryDynamicsDetail({ momentId: this.id }).then(res => {
          if (res.code === 0) {
            this.detail = res.data || {}
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      
      videoPlay() {
        this.isPlay = true
      },
      videoPause() {
        this.isPlay = false
      },
      videoEnded() {
        this.isPlay = false
      },
      handleClick() {
        if (this.detail.contentType === 2) {
          const videoContext = uni.createVideoContext('myVideo', this)
          if (this.isPlay) {
            videoContext.pause()
          } else {
            videoContext.play()
          }
        }
      },
      handleBack() {
        uni.navigateBack()
      }
    }
  }
</script>

<style lang="scss" scoped>
.dynamics-detail {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #181818;
  #back {
    position: absolute;
    left: 32rpx;
    height: 44rpx;
    z-index: 99;
    .back-icon {
      width: 44rpx;
      height: 44rpx;
    }
  }
  .dynamics-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .video {
      width: 100%;
      height: 100%;
    }
    .swiper-wrap {
      width: 100%;
      height: 100%;
      .img {
        width: 100%;
      }
    }
  }
}
</style>
