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
            <!-- 图片轮播位置标识 -->
            <view
              v-if="item.mediaType === 'img' && (item.imgList || []).length > 1"
              class="num-tip"
              :style="{ top: textPos + 'px' }"
            >
              {{ subCurrentIndex + 1 }}/{{ (item.imgList || []).length }}
            </view>
            <image v-if="item.mediaType === 'video' && !isPlay" class="play-btn" src="@/static/video-play.png"></image>
            <video
              v-if="item.mediaType === 'video'"
              class="video"
              :id="'myVideo' + item.indexId"
              :src="item.videoUrl"
              :controls="false"
              :show-center-play-btn="false"
              loop
              object-fit="contain"
              autoplay
            ></video>
            <swiper
              v-else-if="item.mediaType === 'img'"
              class="swiper-wrap"
              circular
              @change="subSwiperChange"
            >
              <swiper-item
                class="video-box"
                v-for="img in item.imgList"
                :key="img"
              >
                <image class="img" :src="img" mode="widthFix"></image>
              </swiper-item>
            </swiper>
            <view v-else class="text-content" :style="{
              color: ['#000', '#000000', 'black'].includes(setPageBg(item)) ? '#fff' : '#000' 
            }">{{ item.content }}</view>
            <menu-list
              :item="item"
              :activeType="activeType"
              :currentProgress="subCurrentIndex"
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
      textPos: {
        type: Number
      }
    },
    data() {
      return {
        isPlay: true, // 视频是否正在播放
        currentIndex: 0,
        subCurrentIndex: 0
      }
    },
    watch: {
      activeType(val) {
        this.currentIndex = 0
        this.isPlay = true
      },
      list() {
        this.isPlay = true
      }
    },
    methods: {
      setPageBg(item) {
        if (item.type === 2 && item.moment && item.moment.contentType === 3) {
          return item.moment.bgColor
        } else {
          return ''
        }
      },
      swiperChange(e) {
        this.currentIndex = e.detail.current
        this.subCurrentIndex = 0
        this.isPlay = true
        // 提前两个滚动页加载数据
        if (this.currentIndex + 2 === this.list.length) {
          this.$emit('load-data')
        }
        if (this.currentIndex === 0) {
          this.$emit('refresh', true)
        } else {
          // 禁用上拉刷新
          this.$emit('refresh', false)
        }
      },
      subSwiperChange(e) {
        this.subCurrentIndex = e.detail.current
      },
      handleClick(item) {
        if (item.mediaType === 'video') {
          const videoContext = uni.createVideoContext('myVideo' + item.indexId, this)
          if (this.isPlay) {
            videoContext.pause()
          } else {
            videoContext.play()
          }
          this.isPlay = !this.isPlay
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
  .play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 128rpx;
    height: 128rpx;
    z-index: 9999;
  }
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
        .num-tip {
          position: absolute;
          right: 24rpx;
          padding: 4rpx 8rpx;
          background: rgba(0,0,0,0.2);
          border-radius: 8rpx;
          font-size: 28rpx;
          font-weight: 500;
          color: #FFFFFF;
          z-index: 9;
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