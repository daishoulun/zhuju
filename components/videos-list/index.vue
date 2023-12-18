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
              object-fit="fill"
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
            <text v-else>{{ item.con }}</text>
            <menu-list
              :item="item"
              :params="params"
              @click-transfer="val => $emit('click-transfer', val)"
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
      MenuList
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      params: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        isPlay: false, // 视频是否正在播放
        currentIndex: 0
      }
    },
    methods: {
      swiperChange(e) {
        this.currentIndex = e.detail.current
        this.isPlay = false
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
      }
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
        .img {
          width: 100%;
        }
      }
    }
  }
}
</style>