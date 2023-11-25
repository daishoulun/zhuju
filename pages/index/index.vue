<template>
  <view class="home">
    <view class="tabbar">
      <text
       v-for="item in tabList"
       :key="item.key"
       :class="active === item.key ? 'active' : ''"
       @click="handleTabbar(item.key)">{{ item.label }}</text>
    </view>
    <tw-videov ref="videoGroup" @lodData="loadingData" @refreshData="refreshData" :autoplay="autoplay"></tw-videov>
    <UserAgreement></UserAgreement>
  </view>
</template>

<script>
import twVideov from '@/components/tsp-video/tsp-video-list/video-v.vue'
import vodData from '@/static/vodData.js' //假数据
import UserAgreement from '@/components/user-agreement/user-agreement.vue'
export default{
  components:{
    twVideov,
    UserAgreement
  },
  data(){
    return {
      active: 'recommend',
      tabList: [
        { key: 'recommend', label: '推荐' },
        { key: 'follow', label: '关注' },
        { key: 'dymanics', label: '动态' },
      ],
      autoplay:true,
      videoData: vodData
    }
  },
  onLoad() {
    // #ifdef H5
    this.autoplay = false
    // #endif
    this.initVod()
  },
  onShow() {
    /* 播放视频 */
    if(this.$refs.videoGroup){
      this.$refs.videoGroup.showPlay()
    }
  },
  onHide() {
    /* 暂停视频 */
    if(this.$refs.videoGroup){
      this.$refs.videoGroup.hidePause()
    }
  },
  methods:{
    handleTabbar(val) {
      this.active = val
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
                coverShow:false, //是否显示视频封面，vue 小程序端不播放会显示视频，可以不用显示封面，App不播放不会显示视频，就需要封面了
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
      this.startData().then((res)=>{
        if(res.length > 0){
          /* 调用视频的初始方法 */
          this.$refs.videoGroup.initVod(res,0); //0是播放的下标（默认播放下标是0）
        }
      })
    },
    /* 下拉刷新 */
    refreshData(){
      this.startData().then((res)=>{
        if(res.length > 0){
          /* 调用视频的重新加载方法 */
          setTimeout(()=>{
            this.$refs.videoGroup.refreshSquare(res,0); //0是播放的下标（默认播放下标是0）
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
