<template>
  <view class="videos-list">
    <view class="video-content">
      <swiper
        class="swiper-wrap"
        vertical
        @change="swiperChange"
      >
        <swiper-item
          class="video-box"
          v-for="(item, index) in list"
          :key="item.indexId"
          :style="{
            background: setPageBg(item)
          }"
          @click="handleClick(item)"
        >
          <template v-if="currentIndex === index">
            <video
              v-if="item.mediaType === 'video'"
              class="video"
              :id="'myVideo' + item.indexId"
              :src="item.videoUrl"
              :controls="false"
              :show-center-play-btn="false"
              object-fit="cover"
              autoplay
              @play="videoPlay"
              @pause="videoPause"
              @ended="videoEnded"
            ></video>
            <swiper
              v-else-if="item.mediaType === 'img'"
              class="swiper-wrap"
              circular
            >
              <swiper-item
                class="video-box"
                v-for="img in item.imgList"
                :key="img"
              >
                <image class="img" :src="img" mode="widthFix"></image>
              </swiper-item>
            </swiper>
            <view v-else class="text-content">{{ item.content }}</view>
            <menu-list
              :item="item"
              :activeType="activeType"
              @click-transfer="val => $emit('click-transfer', val)"
              @click-toggle="val => $emit('click-toggle', val)"
              @click-follow="val => $emit('click-follow', val)"
              @click-liked="val => $emit('click-liked', val)"
              @click-comment="val => $emit('click-comment', val)"
            ></menu-list>
          </template>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
  import MenuList from './menu-list.vue'
  export default {
    name:"videos-list",
    components: {
      MenuList,
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      activeType: {
        type: String,
        default: 'recommend'
      },
    },
    data() {
      return {
        isPlay: false, // 视频是否正在播放
        currentIndex: 0,
      }
    },
    watch: {
      activeType(val) {
        this.currentIndex = 0
      }
    },
    methods: {
      setPageBg(item) {
        const data = this.list[this.currentIndex]
        if (item.type === 2 && item.moment && item.moment.contentType === 3) {
          return item.moment.bgColor
        } else {
          return ''
        }
      },
      swiperChange(e) {
        this.currentIndex = e.detail.current
        this.isPlay = false
        if (this.currentIndex + 1 === this.list.length) {
          this.$emit('load-data')
        }
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
      handleClick(item) {
        if (item.mediaType === 'video') {
          const videoContext = uni.createVideoContext('myVideo' + item.indexId, this)
          if (this.isPlay) {
            videoContext.pause()
          } else {
            videoContext.play()
          }
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
.videos-list {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  .swiper-wrap {
    width: 100%;
    height: 100%;
    .video {
      width: 100%;
      height: 100%;
    }
  }
  .video-content {
    width: 100%;
    height: 100%;
    position: relative;
    color: #fff;
    .swiper-wrap {
      width: 100%;
      height: 100%;
      .video-box {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        .img {
          width: 100%;
        }
      }
    }
  }
  .text-content {
    font-size: 48rpx;
    font-weight: 600;
    color: #201F2C;
    line-height: 66rpx;
    padding: 0 128rpx;
  }
}
</style>