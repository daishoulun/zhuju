<template>
  <view class="skill-list">
    <view class="content-wrap">
      <view class="title">1、技能证书是什么？</view>
      <view class="content">
        <view class="section">技能证书就是职业资格证书。</view>
        <view class="section">职业资格证书是表明劳动者具有从事某一职业所必备的学识和技能的证明。它是劳动者求职、任职、开业的资格凭证，是用人单位招聘、录用劳动者的主要依据，也是境外就业、对外劳务合作人员办理技能水平公证的有效证件。</view>
        <view class="section">职业资格是对从事某一职业所必备的学识、技术和能力的基本要求，反映了劳动者为适应职业劳动需要而运用特定的知识、技术和技能的能力。与学历文凭不同，学历文凭主要反映学生学习的经历，是文化理论知识水平的证明。</view>
        <view class="section">职业资格与职业劳动的具体要求密切结合，更直接、更准确地反映了特定职业的实际工作标准和操作规范，以及劳动者从事该职业所达到的实际工作能力水平。</view>
      </view>
    </view>
    
    <view class="content-wrap">
      <view class="title">2、技能证书用途是什么？</view>
      <view class="content">
      </view>
    </view>
    <view class="btn">去考证</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss" scoped>
.skill-list {
  height: 100vh;
  background: #181818;
  padding: 40rpx 32rpx;
  box-sizing: border-box;
  .content-wrap {
    margin-bottom: 40rpx;
  }
  .title {
    font-size: 32rpx;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 44rpx;
    margin-bottom: 20rpx;
  }
  .content {
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(255,255,255,0.7);
    line-height: 52rpx;
  }
  .btn {
    position: fixed;
    left: 50%;
    bottom: 48rpx;
    transform: translateX(-50%);
    width: 686rpx;
    height: 92rpx;
    background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
    border-radius: 60rpx;
    text-align: center;
    font-size: 36rpx;
    font-weight: 500;
    color: #201F2C;
    line-height: 92rpx;
  }
}
</style>
