<template>
	<view class="menu-list">
    <view class="header-local">
      <image src="/static/location.png" mode=""></image>
      <text class="area">杭州</text>
    </view>
		<!-- 底部标题 -->
		<view class="footTitle" :class="[vodIndex == index?(sliderDrag?'vodMenu-bright1':(moveOpacity?'vodMenu-bright2':'vodMenu-bright0')):'']">
			<view class="v-title-wrap">
        <text class="foot-name">{{ item.location }}</text>
        <text class="detail" @click="handleDetail">详情</text>
        <image class="arrow-r" src="/static/arrow-r.png"></image>
      </view>
			<view v-if="item.activity" class="foot-cont">{{ item.activity.startTime }} - {{ item.activity.endTime }}</view>
      <view class="location">
        <image src="/static/location.png" mode=""></image>
        <text>{{ item.location }} · {{ item.distance | distanceFilter }}</text>
      </view>
		</view>
		<!-- 右侧操作栏 -->
		<view class="menuBox">
			<view class="vodMenu" :class="[vodIndex == index?(sliderDrag?'vodMenu-bright1':(moveOpacity?'vodMenu-bright2':'vodMenu-bright0')):'']">
				<!-- 头像 -->
				<view class="menu-avatar">
					<image :src="item.avatar" mode="cover" class="avatar-image" @click="JumpBtn(1, item)"></image>
					<view v-if="activeType === 'dymanics'" class="follow" @click="followBtn(index, item)">
						<image src="/static/add-like.png" mode="" class="follow-guanzhu" v-if="!item.followed"></image>
						<image src="/static/has-like.png" mode="" class="follow-guanzhu guanzhu-gou" v-else></image>
					</view>
				</view>
				<!-- 点赞 -->
				<view class="fabulous" :class="{ isHidden: activeType !== 'dymanics' }" @click="JumpBtn(2)">
          <view class="fabulous-image fabulous-taoxin" @click="fabulousBtn(index)">
            <image src="/static/heart-active.png" class="fabulous-image" v-if="item.fabulousShow"></image>
            <image src="/static/heart.png" mode="" class="fabulous-image" v-else></image>
          </view>
					<view class="fabulous-num">{{vodCurIndex}}</view>
				</view>
				<!-- 评论 -->
				<view class="fabulous" :class="{ isHidden: activeType !== 'dymanics' }" style="margin-top: 30rpx;" @click="JumpBtn(3)">
					<view class="fabulous-image">
						<image src="/static/comment.png" mode="" class="fabulous-image"></image>
					</view>
					<view class="fabulous-num">{{discussNum}}</view>
				</view>
				<!-- 转发 -->
				<view class="fabulous" style="margin-top: 30rpx;" @click="JumpBtn(4)">
					<view class="fabulous-image">
						<image src="/static/forward-arrow.png" mode="" class="fabulous-image"></image>
					</view>
					<view class="fabulous-num">转发</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
  import { fetchCityName } from '@/api/index.js'
	export default{
		data(){
			return {
				fabulousShow:false,
				fabuTimeOut:null
			}
		},
    filters: {
      distanceFilter(val) {
        return Number(val).toFixed(2) + 'km'
      }
    },
		props:{
      activeType: {
        type: String,
        default: 'recommend'
      },
			index:{
				type:Number,
				default:0
			},
			vodIndex:{
				type:Number,
				default:0
			},
			vodCurIndex:{
				type:Number,
				default:0
			},
			item:{
				type:Object,
				default:()=>{return {}}
			},
			discussNum:{
				type:Number,
				default:0
			},
			sliderDrag:{ //是否在拖动进度
				type:Boolean,
				default:false
			},
			moveOpacity:{ //是否透明
				type:Boolean,
				default:false
			},
      params: {
        type: Object,
        default: () => {}
      }
		},
    watch: {
      params(val) {
        console.log(JSON.stringify(val))
      }
    },
    mounted() {
      // bash`GET https://api.map.baidu.com/geocoding/v3/?address=0&location=经度,纬度&output=json&ak=你的API密钥

      fetchCityName({
        address: 0,
        location: this.params.lon + ',' + this.params.lat,
        output: 'json',
        ak: 'asG49HWyDV9GPHfrXCBEDreNOpGs3OCB'
      })
    },
    methods:{
      handleDetail() {
        http://localhost:8080/#/pages/activity-detail/activity-detail?id=1
        uni.navigateTo({
          url: '/pages/activity-detail/activity-detail?id=' + this.item.indexId
        })
      },
			/* 视频点赞动效 */
			fabulousBtn(index){
				let obj = Object.assign({},this.item)
				obj.fabulousShow = !obj.fabulousShow
				clearTimeout(this.fabuTimeOut)
				this.fabuTimeOut = setTimeout(()=>{
					this.$emit('handleInfo',obj)  //点赞成功
				},200)
			},
			/* 关注动效 */
			followBtn(indexm, item){
        item.followed = !item.followed
        this.$emit('click-follow', item)
			},
			/* 点击右侧菜单选项 1头像 2点赞 3评论 4转发 5旋转头像 */
			JumpBtn(index, item){
				switch(index){
					case 1 :
						uni.navigateTo({
							url:'/pages/person-detail/person-detail'
						})
					break;
					case 2 :
						console.log('点击点赞')
					break;
					case 3 :
            this.$emit('click-action', index)
					break;
					case 4 :
						console.log('点击4转发')
					break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
  .menu-list {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    .header-local {
      display: flex;
      align-items: center;
      position: absolute;
      top: 96rpx;
      left: 32rpx;
    	z-index: 8;
      font-size: 32rpx;
      font-weight: 500;
      color: #FFFFFF;
      text-shadow: 0px 2px 2px rgba(0,0,0,0.14);
      image {
        width: 32rpx;
        height: 32rpx;
        margin-right: 12rpx;
      }
    }
  }
  .isHidden {
    visibility: hidden;
  }
	/* 右边菜单栏 */
	.menuBox{
		position: absolute;
		right: 10rpx;
		width: 115rpx;
		height: 100%;
		z-index: 8;
		display: flex;
		align-items: center;
	}
	.vodMenu{
		margin-top: 100rpx;
		width: 115rpx;
		/* bottom: 400rpx; */
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.vodMenu-bright0{
		opacity: 1;
		transition: all 0.3s linear;
	}
	.vodMenu-bright1{
		opacity: 0;
		transition: all 0.3s linear;
	}
	.vodMenu-bright2{
		opacity: 0.2;
		transition: all 0.3s linear;
	}
	.menu-avatar{
		position: relative;
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
    border: 3rpx solid #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.avatar-image{
    width: 88rpx;
    height: 88rpx;
		border-radius: 50%;
	}
	.follow{
		position: absolute;
		bottom: -20rpx;
		width: 36rpx;
		height: 36rpx;
		background-color: #FFFFFF;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.follow:active{
		transform: scale(0.7);
		transition: all 0.3s linear;
	}
	.follow-guanzhu{
		width: 36rpx;
		height: 36rpx;
	}
	.guanzhu-gou{
		width: 30rpx;
		height: 30rpx;
	}
	.fabulous{
		width: 100rpx;
		margin-top: 80rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.fabulous-image{
		width: 56rpx;
		height: 56rpx;
	}
	.fabulous-num{
		width: 100rpx;
		text-align: center;
		margin-top: 8rpx;
    font-size: 22rpx;
    font-weight: 400;
    color: #FFFFFF;
    text-shadow: 0px 2px 2px rgba(0,0,0,0.14);
	}
	.fabulous-taoxin:active{
		transition: all 0.2s linear;
		transform: scale(0.7);
	}
	/* 底部标题部分 */
	.footTitle{
		position: absolute;
		bottom: 20px;
		left: 0;
		z-index: 8;
		width: 500rpx;
		margin-left: 30rpx;
    .location {
      display: flex;
      align-items: center;
      height: 64rpx;
      background: rgba(0,0,0,0.32);
      border-radius: 32rpx;
      padding: 0 16rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #CECECE;
      image {
        width: 32rpx;
        height: 32rpx;
        margin-right: 8rpx;
      }
    }
	}
  .v-title-wrap {
    display: flex;
    align-items: center;
    .foot-name{
      font-size: 32rpx;
      font-weight: 500;
      color: #FFFFFF;
    }
    .detail {
      font-size: 32rpx;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);
      margin-left: 20rpx;
    }
    .arrow-r {
      width: 32rpx;
      height: 32rpx;
    }
  }
	.foot-cont{
    font-size: 28rpx;
    font-weight: 400;
    color: #FFFFFF;
    margin: 20rpx 0 24rpx;
	}
	.foot-primary{
		font-size: 27rpx;
		color: #FFFFFF;
	}
</style>