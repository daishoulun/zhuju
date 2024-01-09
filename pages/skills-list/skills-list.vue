<template>
  <view class="skill-list">
    <view class="content-wrap">
      <view class="title">1、技能证书是什么？</view>
      <view class="content">
        <view class="section">技能证书就是职业资格证书。</view>
        <view class="section">职业资格证书是表明劳动者具有从事某一职业所必备的学识和技能的证明。它是劳动者求职、任职、开业的资格凭证，是用人单位招聘、录用劳动者的主要依据，也是境外就业、对外劳务合作人员办理技能水平公证的有效证件。</view>
        <view class="section">职业资格是对从事某一职业所必备的学识、技术和能力的基本要求，反映了劳动者为适应职业劳动需要而运用特定的知识、技术和技能的能力。与学历文凭不同，学历文凭主要反映学生学习的经历，是文化理论知识水平的证明。</view>
        <view class="section">职业资格与职业劳动的具体要求密切结合，更直接、更准确地反映了特定职业的实际工作标准和操作规范，以及劳动者从事该职业所达到的实际工作能力水平。</view>
        <view class="section">
          <image class="skill-book" src="https://atta.juzitang.net/1bd3d48c6a2d7883b773e88a1477b3b.png"></image>
          <image class="skill-book" src="https://atta.juzitang.net/d4e60f311956fb237c7bb7a3a399e82.png"></image>
        </view>
      </view>
    </view>
    
    <view class="content-wrap">
      <view class="title">2、拥有技能证书有何优势？</view>
      <view class="content">
        <view class="section">拥有职业资格证书将大大提高求职者的竞争力。</view>
        <view class="section">在招聘过程中，许多企业更倾向于有相关证书的求职者，因为他们通常具备更专业的技能和知识，能更快地适应工作环境；除了求职优势外，职业资格证书还能为在职场上的人士提供晋升机会。</view>
        <view class="section">在一些行业或公司中，拥有高级别的职业资格证书或多个相关证书可以成为升职加薪的加分项。</view>
        <view class="section">此外，职业资格证书也能帮助个人在职业生涯中更好地规划和发展。</view>
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
  min-height: 100vh;
  background: #181818;
  padding: 40rpx 32rpx 120rpx;
  box-sizing: border-box;
  overflow-y: auto;
  .content-wrap {
    margin-bottom: 40rpx;
    &.last-of-type {
      margin-bottom: 0;
    }
  }
  .skill-book {
    width: 336rpx;
    height: 236rpx;
    &:first-of-type {
      margin-right: 14rpx;
    }
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
