<template>
  <view class="dynamics-list">
    <view v-for="item in list" :key="item.momentId" class="dynamics-item" :style="{ backgroundColor: item.bgColor, backgroundImage: 'url(' + setCoverUrl(item) + ')'}" @click="handleDetail(item.momentId)">
      <view v-if="item.contentType === 3" class="text-con" :style="{
        color: ['#000', '#000000', 'black'].includes(item.bgColor) ? '#fff' : '#000' 
      }">{{ item.content }}</view>
      <view class="like">
        <imag class="like-icon" :src="item.liked ? '../../static/heart-active.png' : '../../static/heart.png'" @click.stop="handleLike(item)" />
        {{ item.likeCount || 0 }}
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"dynamics-list",
    props: {
      list: {
        type: Array,
        default: () => []
      },
    },
    data() {
      return {
      };
    },
    methods: {
      handleDetail(id) {
        uni.navigateTo({
          url: '/pages/dynamics-detail/dynamics-detail?id=' + id
        })
      },
      handleLike(item) {
        this.$emit('click-like', item)
      },
      setCoverUrl(item) {
        let url = item.contentUrlList && item.contentUrlList[0] || ''
        const endTip = url.includes('mp4') ? '?x-oss-process=video/snapshot,t_0,f_jpg' : ''
        return url + endTip
      }
    }
  }
</script>

<style lang="scss">
.dynamics-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .dynamics-item {
    position: relative;
    width: 338rpx;
    height: 408rpx;
    background: #D8D8D8;
    border-radius: 16rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    &:nth-of-type(2n) {
      margin-right: 0;
    }
    .text-con {
      line-height: 408rpx;
      padding: 16rpx;
      text-align: center;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 28rpx;
    }
    .like {
      position: absolute;
      bottom: 20rpx;
      left: 14rpx;
      display: flex;
      align-items: center;
      font-size: 26rpx;
      font-weight: 400;
      color: #FFFFFF;
      text-shadow: 0px 4px 8px rgba(0,0,0,0.5);
      image {
        width: 28rpx;
        height: 28rpx;
        margin-right: 12rpx;
      }
      &.progress {
        color: #201F2C;
        background-color: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
      }
    }
  }
}
</style>