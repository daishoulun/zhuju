<template>
  <view class="home">
    <view class="tabbar" :style="{ top: tabbarTop + 'px' }">
      <view>
        <text v-for="item in tabList" :key="item.key" :class="active === item.key ? 'active' : ''"
        @click="handleTabbar(item.key)">{{ item.label }}</text>
      </view>
      <view v-if="!hasDetail" class="header-local" @click="handleCity">
        <image src="/static/location.png" mode=""></image>
        <text class="area">{{ currentCity }}</text>
      </view>
    </view>
    <videos-list
      v-if="videoShow && vodList.length > 0"
      ref="videosListRef"
      :list="vodList"
      :params="listQuery"
      :activeType="active"
      :text-pos="tabbarTop + 40"
      @click-transfer="clickTransfer"
      @click-liked="clickLiked"
      @click-comment="clickComment"
      @click-follow="clickFollow"
      @click-toggle="clickToggle"
      @load-data="loadData"
    ></videos-list>
    <UserAgreement v-if="userAgreementModalVisible" @close="userAgreementModalVisible = flase"></UserAgreement>
    <LoginModal v-if="loginModalVisible" @close="loginModalVisible = false"></LoginModal>
    <CommentPopup
      v-if="commentPopupVisible"
      ref="commentList"
      @comment-success="commentSuccess"
      @close="commentPopupVisible = false"
    ></CommentPopup>
    <TransferModal v-if="transferPopupVisible" ref="transferModal" @close="transferPopupVisible = false"></TransferModal>
    <dy-detail-modal v-if="dyDetailModalShow" ref="dyDetailModalRef" :item="currentItem"
      @close="dyDetailModalShow = false" @cancel-liked="cancelLiked" @create-liked="createLiked"
      @click-transfer="clickTransfer" @click-comment="clickComment" @cancel-follow="cancelFollow"
      @create-follow="createFollow"
      @comment-success="commentSuccess"
    ></dy-detail-modal>
    <empty-state v-if="vodList.length === 0"></empty-state>
  </view>
</template>

<script>
import UserAgreement from '@/components/user-agreement/user-agreement.vue'
import LoginModal from '@/components/login-modal.vue'
import CommentPopup from '@/components/comment-popup.vue'
import VideosList from '@/components/videos-list/index.vue'
import TransferModal from '@/components/transfer-modal.vue'
import DyDetailModal from '@/components/dy-detail-modal.vue'
import EmptyState from '@/components/empty-state'
import {
  fetchRecommendList,
  fetchFollowList,
  fetchMomentList,
  wxShare
} from '@/api/index.js'
import { createLike, cancelLike } from '@/api/person-center.js'
import { createFollow, cancelFollow } from '@/api/fans-list.js'
import disTopHeight from '@/mixins/disTopHeight'
import checkLogin from '@/mixins/checkLogin'
import { BAIDU_AK, BAIDU_R_GEOCODING } from '@/utils/constant.js'
export default {
  components: {
    // twVideov,
    VideosList,
    CommentPopup,
    UserAgreement,
    LoginModal,
    TransferModal,
    DyDetailModal,
    EmptyState
  },
  mixins: [disTopHeight, checkLogin],
  data() {
    return {
      currentCity: '',
      commentPopupVisible: false,
      userAgreementModalVisible: false,
      loginModalVisible: false,
      transferPopupVisible: false,
      active: 'recommend',
      tabList: [
        { key: 'recommend', label: '推荐' },
        { key: 'follow', label: '关注' },
        { key: 'dynamics', label: '动态' },
      ],
      listQuery: {
        lon: '',
        lat: '',
        current: 1,
        pageSize: 10
      },
      vodList: [],
      videoShow: true,
      currentItem: {},
      dyDetailModalShow: false,
      shareForm: null,
      isLogin: false
    }
  },
  computed: {
    tabbarTop() {
      const space = (this.navBarHeight - 20) / 2
      return space + this.statusBarHeight
    }
  },
  onLoad() {
    const location = getApp().globalData.location
    if (location) {
      const geoLocation = `${location.lat},${location.lng}`;
      this.getAddressFromBaidu(geoLocation);
      this.listQuery.lon = location.lng
      this.listQuery.lat = location.lat
      getApp().globalData.location = null
      this.getList()
    } else {
      uni.getLocation({
        type: 'wgs84',
        success: ({latitude, longitude}) => {
          const geoLocation = `${latitude},${longitude}`;
          this.getAddressFromBaidu(geoLocation);
          this.listQuery.lon = longitude
          this.listQuery.lat = latitude
          this.getList()
        }
      })
    }
    uni.$on('login', () => {
      this.isLogin = false
      this.loginModalVisible = true
    })
    this.init()
  },
  onShow() {
    this.init()
  },
  onHide() {
    /* 暂停视频 */
    if (this.$refs.videoGroup) {
      this.$refs.videoGroup.hidePause()
    }
  },
  methods: {
    init() {
      const token = uni.getStorageSync('T-token')
      if (token) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    async getAddressFromBaidu(geoLocation) {
      const url = `${BAIDU_R_GEOCODING}?ak=${BAIDU_AK}&output=json&coordtype=wgs84ll&location=${geoLocation}&`;
      const response = await uni.request({ url });
      console.log(response)
      const data = response.data;
      if (data.status === 0) {
        const cityInfo = data.result
        this.currentCity = cityInfo.addressComponent.city
        this.cityCode = cityInfo.cityCode
      } else {
        console.error('逆地址解析失败：', data);
        return '';
      }
    },
    async getList() {
      if (this.active === 'recommend') {
        await this.getRecommendList()
      } else if (this.active === 'follow') {
        await this.getFollowList()
      } else {
        await this.getTrendsList()
      }
    },
    formatVideoData(list) {
      return list.map(item => {
        // type 类型 1：活动，2：动态
        item.videoUrl = item.type === 1 ? item.activity.activityFileUrl : item.moment.momentUrls
        if (item.type === 1) {
          // activityFileType 封面类型 1：图片，2：视频
          if (item.activity.activityFileType === 1) {
            item.mediaType = 'img'
            item.imgList = [item.activity.cover || item.activity.activityFileUrl]
          } else {
            item.mediaType = 'video'
          }
        } else if (item.type === 2) {
          const data = item.moment
          item.content = data.content
          item.imgList = data.momentUrls
          // activityFileType 封面类型 1：图片，2：视频
          if (data.contentType === 1) {
            item.mediaType = 'img'
          } else if (data.contentType === 2) {
            item.mediaType = 'video'
          } else {
            item.mediaType = 'text'
          }
        }
        return item
      })
    },
    async getRecommendList() {
      const res = await fetchRecommendList(this.listQuery)
      if (res.code === 0) {
        const data = this.formatVideoData(res.data.list)
        if (this.listQuery.current === 1) {
          this.vodList = data
        } else {
          this.vodList.push(...data)
        }
      } else {
        this.$showToast(res.msg)
      }
    },
    async getFollowList() {
      const res = await fetchFollowList(this.listQuery)
      if (res.code === 0) {
        const data = this.formatVideoData(res.data.list)
        if (this.listQuery.current === 1) {
          this.vodList = data
        } else {
          this.vodList.push(...data)
        }
      } else {
        this.$showToast(res.msg)
      }
    },
    async getTrendsList() {
      const res = await fetchMomentList(this.listQuery)
      if (res.code === 0) {
        const data = this.formatVideoData(res.data.list)
        if (this.listQuery.current === 1) {
          this.vodList = data
        } else {
          this.vodList.push(...data)
        }
      } else {
        this.$showToast(res.msg)
      }
    },
    handleToolBar(val) {
      if (val === 3) {
        this.commentPopupVisible = true
        this.$nextTick(() => {
          this.$refs.commentList.open()
        })
      }
    },
    async handleTabbar(val) {
      if (val !== 'recommend') {
        this.handleCheckLogin().then(() => {
          this.getData(val)
        })
        return
      }
      this.getData(val)
    },
    async getData(val) {
      this.active = val
      this.listQuery.current = 1
      this.vodList = []
      await this.getList()
      this.videoKey++
      this.videoShow = false
      this.$nextTick(() => {
        this.videoShow = true
      })
    },
    loadData() {
      this.listQuery.current++
      this.getList()
    },
    /* 下拉刷新 */
    refreshData() {
      this.startData().then((res) => {
        if (res.length > 0) {
          /* 调用视频的重新加载方法 */
          setTimeout(() => {
            // this.$refs.videoGroup.refreshSquare(res,0); //0是播放的下标（默认播放下标是0）
          }, 2000)
        }
      })
    },
    /* 上拉加载 */
    loadingData() {
      this.startData().then((res) => {
        if (res.length > 0) {
          /* 调用视频的到底加载方法方法 */
          this.$refs.videoGroup.lodingData(res);
        }
      })
    },
    // 转发
    clickTransfer(item) {
      this.shareForm = {
        shareType: item.type,
        shareId: item.indexId
      }
      this.transferPopupVisible = true
      this.$nextTick(() => {
        this.$refs.transferModal.open()
      })
    },
    // 动态详情展开
    clickToggle(item) {
      this.currentItem = item
      this.dyDetailModalShow = true
      this.$nextTick(() => {
        this.$refs.dyDetailModalRef.open()
      })
    },
    // 点赞
    clickLiked(item) {
      if (item.moment.liked) {
        this.cancelLiked(item)
      } else {
        this.createLiked(item)
      }
    },
    // 关注
    clickFollow(item) {
      if (item.followed) {
        this.cancelFollow(item)
      } else {
        this.createFollow(item)
      }
    },
    // 取消点赞
    cancelLiked({ indexId }) {
      cancelLike({ momentId: indexId }).then(res => {
        if (res.code === 0) {
          this.setData('like', false, indexId)
        } else {
          this.$showToast(res.msg)
        }
      })
    },
    // 点赞
    createLiked({ indexId }) {
      createLike({ momentId: indexId }).then(res => {
        if (res.code === 0) {
          this.setData('like', true, indexId)
        } else {
          this.$showToast(res.msg)
        }
      })
    },
    // 点击评论
    clickComment(item) {
      this.currentItem = item
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
          this.setData('followed', false, indexId)
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
          this.setData('followed', true, indexId)
        } else {
          this.$showToast(res.msg)
        }
      })
    },
    setData(field, val, indexId) {
      this.vodList.forEach(item => {
        if (item.indexId === indexId) {
          if (field === 'like') {
            const num = item.moment.likeNum
            item.moment.liked = val
            item.moment.likeNum = val ? num + 1 : num - 1
          } else if (field === 'commentNum') {
            item.moment.commentNum += 1
            this.currentItem.moment.commentNum = item.moment.commentNum
          } else if (field === 'shareNum') {
            item.shareNum += 1
          } else {
            item[field] = val
          }
          this.currentItem = Object.assign({}, item)
        }
      })
    },
    commentSuccess() {
      this.setData('commentNum', this.currentItem.moment.commentNum, this.currentItem.indexId)
    },
    handleCity() {
      const userId = uni.getStorageSync('userId') || ''
      uni.navigateTo({
        url: `/pages/select-city/select-city?cityCode=${this.cityCode || ''}&city=${this.currentCity || ''}&userId=${userId}&from=home`
      })
    }
  },
  onShareAppMessage() {
    wxShare(this.shareForm).then(res => {
      if (!res.data.shared) {
        this.setData('shareNum', '', this.shareForm.shareId)
      }
    })
    const path = this.shareForm.shareType === 1 ?  '/pages/activity-detail/activity-detail?id=' : 'pages/dynamics-detail/dynamics-detail?id='
    return {
      path: path + this.shareForm.shareId
    }
    
  },
  onPullDownRefresh() {
    uni.stopPullDownRefresh()
    // this.getData(this.active)
  },
}
</script>

<style>
.home {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}
</style>
<style lang="scss">
.home {
  position: relative;
  background: #181818;
  .tabbar {
    position: absolute;
    left: 32rpx;
    z-index: 999;
    color: #fff;
    height: 20px;

    text {
      margin-right: 64rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.6);
      text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14);

      &.active {
        font-weight: 600;
        color: #FFFFFF;
      }
    }
    .header-local {
      display: flex;
      align-items: center;
      margin-top: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: #FFFFFF;
      text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14);
      image {
        width: 32rpx;
        height: 32rpx;
        margin-right: 12rpx;
      }
    }
  }
}
</style>
