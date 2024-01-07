<template>
  <view class="activity-detail">
    <view class="action-bar" :style="{
      top: tabbarTop + 'px'
    }">
      <image class="back-icon" src="/static/arrow-l.png" @click="handleBack"></image>
      <button class="share-btn" open-type="share"><image class="share-icon" src="/static/share.png"></image></button>
    </view>
    <view v-if="activityDetail.activityFileType === 2" class="bg">
      <video
        id="activityDetailVideo"
        :src="activityDetail.activityFileUrl"
        :controls="false"
        :show-center-play-btn="false"
        object-fit="cover"
      ></video>
    </view>
    <view v-else-if="coverUrl" class="bg" :style="{ backgroundImage: 'url(' + coverUrl + ')' }"></view>
    <view class="activity-content">
      <view class="base-info"  @click="handleVideo">
        <view class="title">{{ activityDetail.activitySubject }}</view>
        <view class="time">{{ activityDetail.startTime }} - {{ activityDetail.endTime }}</view>
        <view class="desc">{{ activityDetail.dsc }}</view>
      </view>
      <view class="other-info">
        <view class="site-info">
          <view class="title">场地服务费</view>
          <view class="info">
            <view class="price-info">
              <text class="price">{{ activityDetail.unitPrice }}元/人、{{ activityDetail.timeStr }}</text>
              <text class="">{{ activityDetail.payerType | payerTypeFilter }}</text>
            </view>
            <text>费用明细</text>
          </view>
        </view>
        <view class="location">
          <view class="title">地点</view>
          <view class="location-detail">
            <!-- <view class="logo">
              <image src="/static/logo.png"></image>
            </view> -->
            <view class="loc-info">
              <view class="name">{{ activityDetail.location }}</view>
              <view class="no">{{ activityDetail.address }}</view>
            </view>
          </view>
        </view>
        <view class="partake-info">
          <view class="title">参与人 <text class="partake-num">已参与{{ activityDetail.hasJoin }}人，剩余{{ activityDetail.noJoin }}人待参与</text></view>
          <view class="pritake-detail">
            <view
              class="pritake-item"
              v-for="item in activityDetail.list || []"
              :key="item.key"
            >
              <view v-if="item.emcee" class="host">主持人</view>
              <view class="avatar">
                <image class="img-head" :src="item.avatar" mode="aspectFill"></image>
                <image class="sex" :src="item.sex === '1' ? '/static/man.png' : '/static/women.png'"></image>
              </view>
              <view class="name">{{ item.nickName }}</view>
            </view>
          </view>
        </view>
        <view v-if="![20, 30, 40].includes(activityDetail.activityStatus)" class="tip">还有 {{ disBeginTime }} 就要开始了，请尽快加入哦～</view>
        <view v-for="item in activityDetail.buttonList" :key="item" :class="['btn', 'btn-' + item ]" @click="handleBtn(item)">{{ item | btnTextFilter }}</view>
      </view>
    </view>
    <view class="placeholder"></view>
  </view>
</template>

<script>
  import disTopHeight from '@/mixins/disTopHeight'
  import { fetchDetail, joinActivity, activityPay, queryPayResult } from '@/api/activity-detail.js'
  export default {
    mixins: [disTopHeight],
    filters: {
      payerTypeFilter(val) {
        const map = {
          1: '男士付',
          2: '女士付',
          3: '我付款'
        }
        return map[val]
      },
      btnTextFilter(val) {
        const map = {
          1: '修改活动',
          2: '取消活动',
          3: '立即加入',
          4: '进入房间',
          5: '活动已结束',
          6: '退出活动',
          7: '成员已满，无法加入',
          8: '活动进行中，无法加入',
          9: '活动已取消',
          90: '请下载煮桔APP进入房间'
        }
        return map[val]
      }
    },
    data() {
      return {
        activityDetail: {},
        isPlay: false,
        id: '',
        arrowHeight: 0
      };
    },
    computed: {
      tabbarTop() {
        const space = (this.navBarHeight - this.arrowHeight) / 2
        return space + this.statusBarHeight
      },
      coverUrl() {
        return this.activityDetail.cover || this.activityDetail.activityFileUrl
      },
      disBeginTime() {
        const now = Date.now()
        const beginTime = new Date(this.activityDetail.startTime).getTime()
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
    onLoad(opt) {
      this.id = opt.id
      this.getDetail()
    },
    onReady() {
      const query = uni.createSelectorQuery().in(this);
      query.select('.action-bar').boundingClientRect(data => {
        this.actionBarHeight = data.height
      }).exec();
    },
    methods: {
      getDetail() {
        fetchDetail({ activityId: this.id }).then(res => {
          this.activityDetail = res?.data || {}
          this.activityDetail.noJoin = this.activityDetail.femaleRemainNum + this.activityDetail.maleRemainNum || 0
          this.activityDetail.hasJoin = this.activityDetail.totalPeopleNum - this.activityDetail.noJoin
        })
      },
      handleBtn(type) {
        switch(type) {
          case 3:
          this.handleJoinActivity()
        }
      },
      handleJoinActivity() {
        joinActivity({ activityId: this.activityDetail.activityId }).then(res => {
          if (res.code === 0) {
            if (res.data.needPay) {
              this.$showToast('需要支付，支付功能暂未开发')
              this.handlePay(res.data.orderNo)
            } else {
              this.$showToast('加入成功')
              this.getDetail()
            }
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      handlePay(orderNo) {
        activityPay({
          orderNo,
          payType: 2
        }).then(res => {
          if (res.code === 0) {
            const {
              appid,
              noncestr,
              packageValue,
              paySign,
              signType,
              timestamp
            } = res.data.wechatMiniSign || {}
            uni.requestPayment({
              provider: 'wxpay',
            	timeStamp,
            	nonceStr,
            	package: packageValue,
            	signType,
            	paySign,
            	success: function (res) {
            		console.log('success:' + JSON.stringify(res));
                this.checkPayResult(orderNo)
            	},
            	fail: function (err) {
            		console.log('fail:' + JSON.stringify(err));
            	}
            });
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      checkPayResult(orderNo) {
        queryPayResult({ orderNo }).thjen(res => {
          if (res.code === 0) {
            const msg = {
              0: '待支付',
              1: '已支付',
              2: '支付中',
              3: '已过期',
              '-1': '支付失败'
            }
            if (res.data.payStatus !== 1) {
              this.$showToast(msg[res.data.payStatus])
              setTimeout(() => {
                this.checkPayResult(orderNo)
              }, 1500)
            } else {
              this.$showToast(res.msg)
            }
          } else {
            this.$showToast(res.msg)
          }
        })
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
.activity-detail {
  height: 100vh;
  overflow: auto;
  .action-bar {
    position: absolute;
    left: 32rpx;
    height: 44rpx;
    z-index: 99;
    display: flex;
    align-items: center;
    .share-btn,
    .back-icon,
    .share-icon {
      width: 44rpx;
      height: 44rpx;
    }
    .share-btn {
      padding-left: 0;
      padding-right: 0;
      background: transparent;
      text-align: center;
      margin-left: 0;
      border: none;
      border-radius: 0;
      margin-left: 42rpx;
      line-height: 44rpx;
    }
  }
  .title {
    font-size: 32rpx;
    font-weight: 500;
    color: #FFFFFF;
    margin-bottom: 28rpx;
  }
  .bg {
    position: relative;
    height: 904rpx;
    background-size: cover;
    background-position: center;
    backdrop-filter: blur(10px);
    #activityDetailVideo {
      width: 100%;
      height: 100%;
    }
  }
  .activity-content {
    position: relative;
    margin-top: -506rpx;
  }
  .base-info {
    width: 100%;
    height: 352rpx;
    padding: 50rpx 32rpx 0;
    box-sizing: border-box;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    backdrop-filter: blur(4px);
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, #181818 100%, #181818 100%);
    .title {
      font-size: 36rpx;
      font-weight: 500;
      color: #FFFFFF;
    }
    .time {
      font-size: 28rpx;
      font-weight: 400;
      color: #DCAEF4;
      margin: 20rpx 0 36rpx;
    }
    .desc {
      font-size: 24rpx;
      font-weight: 400;
      color: #7D7D7D;
      line-height: 34rpx;
    }
  }
  .other-info {
    padding: 32rpx;
    background-color: #181818;
  }
  .site-info {
    margin-bottom: 68rpx;
    .info {
      font-size: 28rpx;
      font-weight: 500;
      color: #7D7D7D;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price-info {
        .price {
          color: #DCAEF4;
          margin-right: 24rpx;
        }
        text {
          color: #7CA6F9;
        }
      }
    }
  }
  .location {
      .location-detail {
        display: flex;
        align-items: center;
        .logo {
          width: 92rpx;
          height: 92rpx;
          margin-right: 22rpx;
          image {
            height: 100%;
            width: 100%;
            border-radius: 100%;
          }
        }
        .loc-info {
          flex: 1;
          .name {
            font-size: 28rpx;
            font-weight: 500;
            color: #FFFFFF;
            margin-bottom: 8rpx;
          }
          .no {
            font-size: 24rpx;
            font-weight: 400;
            color: #7A7A7A;
          }
        }
      }
  }
  .partake-info {
    margin: 60rpx 0;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 36rpx;
      .partake-num {
        font-size: 28rpx;
        font-weight: 400;
        color: #7D7D7D;
      }
    }
    .pritake-detail {
      display: flex;
      flex-wrap: wrap;
      .pritake-item {
        position: relative;
        width: calc((100% - 48rpx) / 4);
        height: 192rpx;
        background: #262626;
        border-radius: 16rpx;
        padding-top: 28rpx;
        text-align: center;
        overflow: hidden;
        margin-right: 16rpx;
        margin-bottom: 16rpx;
        &:nth-of-type(4n) {
          margin-right: 0;
        }
        .host {
          position: absolute;
          top: 0;
          left: 0;
          width: 76rpx;
          height: 32rpx;
          background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
          border-radius: 0rpx 0rpx 12rpx 0rpx;
          line-height: 32rpx;
          text-align: center;
          font-size: 16rpx;
          font-weight: 500;
          color: #201F2C;
        }
        .avatar {
          position: relative;
          width: 88rpx;
          height: 88rpx;
          margin: 0 auto 16rpx;
          .img-head {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          .sex {
            position: absolute;
            top: 0;
            right: 0;
            width: 32rpx;
            height: 32rpx;
          }
        }
        .name {
          font-size: 24rpx;
          font-weight: 400;
          color: #7D7D7D;
        }
      }
    }
  }
  .tip {
    font-size: 24rpx;
    font-weight: 400;
    color: #DCAEF4;
    text-align: center;
    margin: 30rpx 0 16rpx;
  }
  .btn {
    height: 120rpx;
    background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
    border-radius: 60rpx;
    font-size: 36rpx;
    font-weight: 600;
    color: #3D3D3D;
    text-align: center;
    line-height: 120rpx;
    &.btn-5,
    &.btn-7,
    &.btn-8,
    &.btn-9 {
      background: #262626;
    }
  }
}
</style>
