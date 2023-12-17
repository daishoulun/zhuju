<template>
  <view class="videos-list">
    <view class="video-content">
      <swiper
        class="swiper-wrap"
        vertical
      >
        <swiper-item
          class="video-box"
          v-for="item in list"
          :key="item.id"
        >
          <video v-if="item.mediaType === 'video'" class="video" :src="item.videoUrl" controls></video>
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
          <menu-list :item="item" :params="params"></menu-list>
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
      return {}
    },
    watch: {
      list(val) {
        console.log('va', val)
      }
    },
    methods: {
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