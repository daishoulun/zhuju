<template>
  <view class="activity-card" @click="handleClick">
    <view class="activity-cover">
      <video
        v-if="activityData.activityFileType === 2"
        class="cover-video"
        id="activityDetailVideo"
        :src="activityData.activityFileUrl"
        :controls="false"
        :show-center-play-btn="false"
        object-fit="cover"
      ></video>
      <image v-else class="cover-img" :src="activityData.cover || ''" mode="aspectFill"></image>
    </view>
    <view class="activity-con">
      <view class="title">{{ activityData.activitySubject }}</view>
      <view class="time">{{ activityData.startTime }} - {{ activityData.endTime }}</view>
      <view class="btn-state" :class="{ 'btn-end': [30, 40].includes(activityData.activityStatus) }">{{ activityData.activityStatusInfo }}</view>
    </view>
    <view class="activity-footer">
      <view class="local">
        <image src="/static/location.png" mode=""></image>
        <text>{{ activityData.location }}</text>
      </view>
      <view v-if="activityData.activityStatus === 10">
        <text class="label">距离开始时间：</text>
        <text class="time">{{ disBeginTime }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"activity-card",
    props: {
      activityData: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        
      };
    },
    computed: {
      disBeginTime() {
        const now = Date.now()
        const beginTime = new Date(this.activityData.startTime).getTime()
        const dis = beginTime - now
        const seconds = dis / 1000
        const mins = seconds / 60
        const hours = mins / 60
        const days = hours / 24
        const arr = [
          { value: Math.floor(days), label: '天' },
          { value: Math.floor(hours % 24), label: '时' },
          { value: Math.floor(mins % 60), label: '分' },
          { value: Math.floor(seconds % 60), label: '秒' },
        ]
        return arr.filter(item => item.value > 0).map(item => item.value + item.label).join('')
      }
    },
    methods: {
      handleClick() {
        this.$emit('click-card', this.activityData)
      }
    }
  }
</script>

<style lang="scss" scoped>
.activity-card {
  position: relative;
  width: 100%;
  height: 258rpx;
  padding: 42rpx 20rpx 24rpx;
  background-color: #262626;
  box-sizing: border-box;
  margin-bottom: 54rpx;
  border-radius: 8rpx;
  .activity-cover {
    position: absolute;
    top: -18rpx;
    left: 12rpx;
    width: 120rpx;
    height: 163rpx;
    border-radius: 20rpx;
    .cover-img,
    .cover-video {
      width: 100%;
      height: 100%;
    }
  }
  .activity-con {
    position: relative;
    margin-left: 156rpx;
    .title {
      font-size: 28rpx;
      font-weight: 500;
      color: #FFFFFF;
    }
    .time {
      font-size: 22rpx;
      font-weight: 400;
      color: #7D7D7D;
      margin-top: 14rpx;
    }
    .btn-state {
      position: absolute;
      top: 0;
      right: 0;
      width: 132rpx;
      height: 68rpx;
      background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
      border-radius: 32rpx;
      line-height: 68rpx;
      text-align: center;
      font-size: 24rpx;
      font-weight: 600;
      color: #201F2C;
      &.btn-end {
        background: #4A4A4A;
      }
    }
  }
  .activity-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 66rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #7D7D7D;
    .local {
      display: flex;
      align-items: center;
      image {
        width: 24rpx;
        height: 24rpx;
      }
    }
    .time {
      color: #FFFFFF;
    }
  }
}
</style>