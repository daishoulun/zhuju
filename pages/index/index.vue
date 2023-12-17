<template>
  <view class="home">
    <view class="tabbar">
      <text
       v-for="item in tabList"
       :key="item.key"
       :class="active === item.key ? 'active' : ''"
       @click="handleTabbar(item.key)">{{ item.label }}</text>
    </view>
<!--    <tw-videov ref="videoGroup" @lodData="loadingData" @refreshData="refreshData" :autoplay="autoplay"
      @click-action="handleToolBar"
    ></tw-videov> -->
    <videos-list :list="vodList" :params="listQuery"></videos-list>
    <UserAgreement v-if="userAgreementModalVisible" @close="userAgreementModalVisible = flase"></UserAgreement>
    <LoginModal v-if="loginModalVisible" @close="loginModalVisible = flase"></LoginModal>
    <CommentPopup v-if="commentPopupVisible" ref="commentList" @close="commentPopupVisible = false"></CommentPopup>
  </view>
</template>

<script>
// import twVideov from '@/components/tsp-video/tsp-video-list/video-v.vue'
import UserAgreement from '@/components/user-agreement/user-agreement.vue'
import LoginModal from '@/components/login-modal.vue'
import CommentPopup from '@/components/comment-popup.vue'
import VideosList from '@/components/videos-list/index.vue'
import {
  fetchRecommendList,
  fetchFollowList,
  fetchMomentList
} from '@/api/index.js'
export default{
  components:{
    // twVideov,
    VideosList,
    CommentPopup,
    UserAgreement,
    LoginModal
  },
  data(){
    return {
      commentPopupVisible: false,
      userAgreementModalVisible: false,
      loginModalVisible: false,
      active: 'recommend',
      tabList: [
        { key: 'recommend', label: '推荐' },
        { key: 'follow', label: '关注' },
        { key: 'dymanics', label: '动态' },
      ],
      listQuery: {
        lon: '',
        lat: '',
        current: 1,
        pageSize: 10
      },
      vodList: []
    }
  },
  onLoad() {
        this.listQuery.lon = 116.4
        this.listQuery.lat = 39.9
    // uni.getLocation({
      // type: 'wgs84',
      // success: res => {
        // this.listQuery.lon = res.longitude
        // this.listQuery.lat = res.latitude
        this.getList()
      // }
    // })
  },
  onHide() {
    /* 暂停视频 */
    if(this.$refs.videoGroup){
      this.$refs.videoGroup.hidePause()
    }
  },
  methods:{
    getList() {
      if (this.active === 'recommend') {
        this.getRecommendList()
      } else if (this.active === 'follow') {
        this.getFollowList()
      } else {
        this.getTrendsList()
      }
    },
    formatVideoData(list) {
      return list.map(item => {
        // type 类型 1：活动，2：动态
        item.videoUrl = item.type === 1 ?  item.activity.activityFileUrl : item.moment.momentUrls
        if (item.type === 1) {
          // activityFileType 封面类型 1：图片，2：视频
          if (item.activity.activityFileType === 1) {
            item.mediaType = 'img'
            item.imgList = [item.activity.cover]
          } else {
            item.mediaType = 'video'
          }
        } else if (item.type === 2) {
          item.mediaType = 'text'
          item.content = item.moment.content
        }
        return item
      })
    },
    async getRecommendList() {
      const res = await fetchRecommendList(this.listQuery)
      if (res.code === 0) {
        this.vodList = this.formatVideoData(res.data.list)
      } else {
        this.$showToast(res.msg)
      }
    },
    async getFollowList() {
      const res = await fetchFollowList(this.listQuery)
      if (res.code === 0) {
        this.initVod(res.data.list || [])
      } else {
        this.$showToast(res.msg)
      }
    },
    async getTrendsList() {
      const res = await fetchMomentList(this.listQuery)
      if (res.code === 0) {
        this.initVod(res.data.list || [])
      } else {
        this.$showToast(res.msg)
      }
    },
    handleToolBar(val) {
      console.log(val)
      if(val === 3) {
        this.commentPopupVisible = true
        this.$nextTick(() => {
          this.$refs.commentList.open()
        })
      }
    },
    handleTabbar(val) {
      this.active = val
      console.log(val)
      if (val === 'recommend') {
        this.getRecommendList()
      } else if (val === 'follow') {
        this.getFollowList()
      } else {
        this.getTrendsList()
      }
    },
    startData(){
      let list = []
      /* 模拟请求 */
      return new Promise((resolve, reject)=>{
        setTimeout(()=>{
          for(let i=0; i < 15; i++){
              let obj = {
                /** 参数数据自行拼接  */
                vodUrl:this.videoData[i].src,
                coverImg:this.videoData[i].coverImg, //视频封面
                coverShow:true, //是否显示视频封面，vue 小程序端不播放会显示视频，可以不用显示封面，App不播放不会显示视频，就需要封面了
                object_fit:this.videoData[i].object_fit, //视频的显示类型
                sliderShow:true, //是否显示进度条
                rotateImgShow:true, //是否显示旋转头像

                fabulousShow:false,//是否已经点赞
                followReally:false //是否已经关注
              }
              list.push(obj);
            }
            resolve(list)
        },500)
      })
    },
    /* 初始加载视频数据 */
    initVod(){
      // this.startData().then((res)=>{
      //   if(res.length > 0){
      //     /* 调用视频的初始方法 */
      //     // this.$refs.videoGroup.initVod(res,0); //0是播放的下标（默认播放下标是0）
      //   }
      // })
    },
    /* 下拉刷新 */
    refreshData(){
      this.startData().then((res)=>{
        if(res.length > 0){
          /* 调用视频的重新加载方法 */
          setTimeout(()=>{
            // this.$refs.videoGroup.refreshSquare(res,0); //0是播放的下标（默认播放下标是0）
          },2000)
        }
      })
    },
    /* 上拉加载 */
    loadingData(){
      this.startData().then((res)=>{
        if(res.length > 0){
          /* 调用视频的到底加载方法方法 */
          this.$refs.videoGroup.lodingData(res);
        }
      })
    }
  }
}
</script>

<style>
page{
  background-color: #000;
}
.home{
  width: 100%;
  height: calc(100vh - 100rpx);
  box-sizing: border-box;
}
</style>
<style lang="scss">
  .home {
    position: relative;
    .tabbar {
      position: absolute;
      top: 24rpx;
      left: 32rpx;
      z-index: 999;
      color: #fff;
      text {
        margin-right: 64rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: rgba(255,255,255,0.6);
        text-shadow: 0px 2px 2px rgba(0,0,0,0.14);
        &.active {
          font-weight: 600;
          color: #FFFFFF;
        }
      }
    }
  }
</style>
