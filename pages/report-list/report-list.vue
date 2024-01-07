<template>
  <view class="report-list">
    <view class="list">
      <form-item
        v-for="item in reportList"
        :key="item.value"
      >
        {{ item.text }}
        <view slot="icon">
          <image v-if="item.value === activeType" class="radio-icon" src="@/static/radio-active.png"></image>
          <image v-else class="radio-icon" src="@/static/radio.png" @click="handleReport(item)"></image>
        </view>
      </form-item>
    </view>
    <view class="btn" @click="handleNext">下一步</view>
  </view>
</template>

<script>
  import FormItem from '@/components/form-item.vue';
  export default {
    components: {
      FormItem
    },
    data() {
      return {
        activeType: '',
        reportList: [
          { value: 1, text: '违法犯罪（涉证、暴恐和黄赌毒等）' },
          { value: 2, text: '色情低俗（低俗骚扰、暴力血腥等）' },
          { value: 3, text: '涉嫌欺诈（网络兼职、婚恋等）' },
          { value: 4, text: '政治敏感（不当言论、危害社会秩序等）' },
          { value: 5, text: '其他内容（辱骂、人身攻击或广告等）' },
        ],
        userId: ''
      };
    },
    onLoad(opt) {
      this.userId = opt.id
    },
    methods: {
      handleReport(item) {
        this.activeType = item.value
      },
      handleNext() {
        if (!this.activeType) {
          this.$showToast('请先选择要举报的类型')
          return
        }
        uni.navigateTo({
          url: `/pages/report-form/report-form?id=${this.userId}&type=${this.activeType}`
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.report-list {
  width: 100%;
  height: 100vh;
  background: #181818;
  padding: 40rpx 32rpx 48rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: #FFFFFF;
  box-sizing: border-box;
  .radio-icon {
    width: 42rpx;
    height: 42rpx;
  }
  .btn {
    position: absolute;
    bottom: 48rpx;
    left: 32rpx;
    width: calc(100% - 64rpx);
    height: 92rpx;
    line-height: 92rpx;
    background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
    border-radius: 60rpx;
    text-align: center;
    line-height: 92rpx;
    font-size: 36rpx;
    font-weight: 500;
    color: #201F2C;
  }
}
</style>
