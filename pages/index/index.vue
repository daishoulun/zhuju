<template>
  <view class="home">
    <view class="tabbar" :style="{ top: tabbarTop + 'px' }">
      <text v-for="item in tabList" :key="item.key" :class="active === item.key ? 'active' : ''"
        @click="handleTabbar(item.key)">{{ item.label }}</text>
    </view>
    <videos-list
      v-if="videoShow && vodList.length > 0"
      ref="videosListRef"
      :list="vodList"
      :params="listQuery"
      :activeType="active"
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
    this.listQuery.lon = 116.4
    this.listQuery.lat = 39.9
      this.getList()
    uni.getLocation({
      type: 'wgs84',
      success: ({latitude, longitude}) => {
        const geoLocation = `${latitude},${longitude}`;
        console.log(geoLocation)
        this.getAddressFromBaidu(geoLocation);
      // this.listQuery.lon = res.longitude
      // this.listQuery.lat = res.latitude
      }
    })
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
      // const apiKey = 'cEp4DBq3xUaM7OxfRHL9d26S6xfmtwa6'; // 替换为你的百度地图API密钥
      // const url = `https://api.map.baidu.com/geocoder/v2/?location=${geoLocation}&output=json&ak=${apiKey}`;
      // const response = await uni.request({ url });
      // console.log('response', response)
      // console.log('data', data)
      // const data = JSON.parse(response.data);
      // if (data.status === 0) {
      //   return data.result.addressComponent; // 返回地址信息
      // } else {
      //   console.error('逆地址解析失败：', data);
      //   return '';
      // }
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
          item.moment.content += '适当放宽几乎都是科技很发达水库和是的快捷方式雕刻技法和快速导航福克斯的是的封建士大夫JFK对话框高考加分的高科技的反馈对话框高考加分的高科技的反馈对话框高考加分的高科技的反馈'
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
        // if (this.listQuery.current === 1) {
          this.vodList = data
        // } else {
        //   this.vodList.push(...data)
        // }
      } else {
        this.$showToast(res.msg)
      }
    },
    async getFollowList() {
      const res = await fetchFollowList(this.listQuery)
      if (res.code === 0) {
        const data = this.formatVideoData(res.data.list)
        // if (this.listQuery.current === 1) {
          this.vodList = data
        // } else {
        //   this.vodList.push(...data)
        // }
      } else {
        this.$showToast(res.msg)
      }
    },
    async getTrendsList() {
      const res = await fetchMomentList(this.listQuery)
      if (res.code === 0) {
        const data = this.formatVideoData(res.data.list)
        // if (this.listQuery.current === 1) {
          this.vodList = data
        // } else {
        //   this.vodList.push(...data)
        // }
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
  },
  onShareAppMessage() {
    wxShare(this.shareForm).finally(res => {
      this.shareForm = null
    })
    const path = this.shareForm.shareType === 1 ?  '/pages/activity-detail/activity-detail?id=' : 'pages/dynamics-detail/dynamics-detail?id='
    return {
      path: path + this.shareForm.shareId
    }
    
  },
  onReachBottom() {
  }
}
</script>

<style>
page {
  background-color: #000;
}

.home {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}
</style>
<style lang="scss">
.home {
  position: relative;

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
  }
}
</style>
