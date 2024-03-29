<template>
  <view class="dynamics-detail">
    <view class="back" :style="{
      top: tabbarTop + 'px'
    }" @click="handleBack">
      <image class="back-icon" src="/static/arrow-l.png"></image>
    </view>
    <!-- 图片轮播位置标识 -->
    <view
      v-if="detail.mediaType === 'img' && (detail.contentUrlList || []).length > 1"
      class="num-tip"
      :style="{ top: (tabbarTop + 44) + 'px' }"
    >
      {{ subCurrentIndex + 1 }}/{{ (detail.contentUrlList || []).length }}
    </view>
    <view class="dynamics-content" @click="handleClick">
      <swiper
        v-if="detail.contentType === 1"
        class="swiper-wrap"
        circular
        @change="subSwiperChange"
      >
        <swiper-item
          v-for="img in detail.contentUrlList"
          :key="img"
        >
          <image class="img" :src="img" mode="aspectFill"></image>
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
      :currentProgress="subCurrentIndex"
      @click-transfer="clickTransfer"
      @click-liked="clickLiked"
      @click-comment="clickComment"
      @click-follow="clickFollow"
      @click-toggle="clickToggle"
    ></menu-list>
    <CommentPopup v-if="commentPopupVisible" ref="commentList" @comment-success="getDetail" @close="commentPopupVisible = false"></CommentPopup>
    <TransferModal v-if="transferPopupVisible" ref="transferModal" @close="transferPopupVisible = false"></TransferModal>
    <LoginModal v-if="loginModalVisible" @close="loginModalVisible = false"></LoginModal>
  </view>
</template>

<script>
  import MenuList from '@/components/videos-list/menu-list.vue'
  import disTopHeight from '@/mixins/disTopHeight'
  import CommentPopup from '@/components/comment-popup.vue'
  import TransferModal from '@/components/transfer-modal.vue'
  import LoginModal from '@/components/login-modal.vue'
  import checkLogin from '@/mixins/checkLogin'
  import { queryDynamicsDetail } from '@/api/dynamics-detail.js'
  import { createLike, cancelLike } from '@/api/person-center.js'
  import { createFollow, cancelFollow } from '@/api/fans-list.js'
  export default {
    components: {
      MenuList,
      CommentPopup,
      TransferModal,
      LoginModal
    },
    mixins: [disTopHeight, checkLogin],
    data() {
      return {
        id: '',
        subCurrentIndex: 0,
        commentPopupVisible: false,
        transferPopupVisible: false,
        detail: {},
        arrowHeight: 0,
        isPlay: false,
        loginModalVisible: false
      }
    },
    computed: {
      tabbarTop() {
        const space = (this.navBarHeight - this.arrowHeight) / 2
        return space + this.statusBarHeight
      }
    },
    onLoad(opt) {
      uni.$on('login', () => {
        console.log('on')
        this.$nextTick(() => {
          this.loginModalVisible = true
        })
      })
      this.id = opt.id
      this.getDetail()
    },
    onReady() {
      const query = uni.createSelectorQuery().in(this);
      query.select('.back').boundingClientRect(data => {
        this.arrowHeight = data.height
      }).exec();
    },
    onShow() {
      this.handleCheckLogin()
    },
    methods: {
      getDetail() {
        queryDynamicsDetail({ momentId: this.id }).then(res => {
          if (res.code === 0) {
            const data = res.data || {}
            data.videoUrl = data.contentUrlList
            data.imgList = data.contentUrlList
            if (data.contentType === 1) {
              data.mediaType = 'img'
            } else if (data.contentType === 2) {
              data.mediaType = 'video'
            } else {
              data.mediaType = 'text'
            }
            this.detail = data
            console.log(this.detail)
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      subSwiperChange(e) {
        this.subCurrentIndex = e.detail.current
      },
      clickTransfer() {
        this.transferPopupVisible = true
        this.$nextTick(() => {
          this.$refs.transferModal.open()
        })
      },
      clickToggle(item) {
        this.currentItem = item
        this.dyDetailModalShow = true
        this.$nextTick(() => {
          this.$refs.dyDetailModalRef.open()
        })
      },
      clickLiked(item) {
        if (item.liked) {
          this.cancelLiked(item)
        } else {
          this.createLiked(item)
        }
      },
      clickFollow(item) {
        if (item.followed) {
          this.cancelFollow(item)
        } else {
          this.createFollow(item)
        }
      },
      // 取消点赞
      cancelLiked({ momentId }) {
        cancelLike({ momentId }).then(res => {
          if (res.code === 0) {
            this.getDetail()
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      // 点赞
      createLiked({ momentId }) {
        createLike({ momentId }).then(res => {
          if (res.code === 0) {
            this.getDetail()
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      // 点击评论
      clickComment(item) {
        this.commentPopupVisible = true
        this.$nextTick(() => {
          this.$refs.commentList.open(item)
        })
      },
      // 取消关注
      cancelFollow({ userId, indexId }) {
        cancelFollow({ userId }).then(res => {
          if (res.code === 0) {
            this.$showToast('取关成功')
            this.getDetail()
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      // 关注
      createFollow({ userId, indexId }) {
        createFollow({ userId }).then(res => {
          if (res.code === 0) {
            this.$showToast('关注成功')
            this.getDetail()
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
        uni.navigateBack({
          fail: () => {
            uni.reLaunch({
              url: '/pages/index/index'
            })
          }
        })
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
  .back {
    position: absolute;
    left: 32rpx;
    height: 44rpx;
    z-index: 99;
    .back-icon {
      width: 44rpx;
      height: 44rpx;
    }
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
        height: 100%;
      }
    }
  }
}
</style>
