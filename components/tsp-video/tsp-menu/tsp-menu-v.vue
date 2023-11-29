<template>
	<view>
    <view class="header-local">
      <image src="/static/location.png" mode=""></image>
      <text class="area">杭州</text>
    </view>
		<!-- 底部标题 -->
		<view class="footTitle" :class="[vodIndex == index?(sliderDrag?'vodMenu-bright1':(moveOpacity?'vodMenu-bright2':'vodMenu-bright0')):'']">
			<view class="v-title-wrap"><text class="foot-name">Club·Puff 7号聚会</text><text class="detail">详情</text><image class="arrow-r" src="/static/arrow-r.png"></image></view>
			<view class="foot-cont">7月17日 20:30-23:00</view>
      <view class="location">
        <image src="/static/location.png" mode=""></image>
        <text>Club·Puff · 3km</text>
      </view>
		</view>
		<!-- 右侧操作栏 -->
		<view class="menuBox">
			<view class="vodMenu" :class="[vodIndex == index?(sliderDrag?'vodMenu-bright1':(moveOpacity?'vodMenu-bright2':'vodMenu-bright0')):'']">
				<!-- 头像 -->
				<view class="menu-avatar">
					<image src="/static/avatar-set.png" mode="" class="avatar-image" @click="JumpBtn(1)"></image>
					<view class="follow" @click="followBtn(index)" :class="{followHide:followShow==2}">
						<image src="/static/add-like.png" mode="" class="follow-guanzhu" v-if="followShow==null || followShow==0" :class="{followActive:followShow==0}"></image>
						<image src="/static/has-like.png" mode="" class="follow-guanzhu guanzhu-gou" v-else></image>
					</view>
				</view>
				<!-- 点赞 -->
				<view class="fabulous" @click="JumpBtn(2)">
          <view class="fabulous-image fabulous-taoxin" @click="fabulousBtn(index)">
            <image src="/static/heart-active.png" class="fabulous-image" v-if="item.fabulousShow"></image>
            <image src="/static/heart.png" mode="" class="fabulous-image" v-else></image>
          </view>
					<view class="fabulous-num">{{vodCurIndex}}</view>
				</view>
				<!-- 评论 -->
				<view class="fabulous" style="margin-top: 30rpx;" @click="JumpBtn(3)">
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
		<!-- 旋转头像 -->
		<view class="avatarMenu" v-if="item.rotateImgShow" :class="[vodIndex == index?(sliderDrag?'vodMenu-bright1':(moveOpacity?'vodMenu-bright2':'vodMenu-bright0')):'']">
			<view class="rotate-avatar k-paused" :class="[item.vodPaly && palyCartoon?'k-running':'']" @click="JumpBtn(5)">
				<image src="/static/icon/touxiang.jpg" mode="" class="rotate-image"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				fabulousShow:false,
				followShow:null,
				followOpen:false,
				fabuTimeOut:null
			}
		},
		props:{
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
			palyCartoon:{ //是否播放旋转头像
				type:Boolean,
				default:false
			}
		},
		methods:{
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
			followBtn(index){
				if(this.followOpen) return
				this.followOpen = true
				let obj = Object.assign({},this.item)
				obj.followReally = true
				// this.followShow = 0 
				setTimeout(()=>{
					this.followShow = this.followShow === 1 ? 0 : 1
          this.followOpen = false
					// setTimeout(()=>{
					// 	this.followShow = 2
					// 	setTimeout(()=>{
					// 		this.followOpen = false
					// 		this.followShow = null
					// 		this.$emit('handleInfo',obj)  //关注成功
					// 	},300)
					// },100)
				},500)
			},
			/* 点击右侧菜单选项 1头像 2点赞 3评论 4转发 5旋转头像 */
			JumpBtn(index){
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
					case 5 :
						console.log('5旋转头像')
					break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.avatarMenu{
		position: absolute;
		bottom: 20px;
		right: 10rpx;
		width: 115rpx;
		z-index: 8;
		display: flex;
		align-items: center;
		flex-direction: column;
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
	.followActive{
		transform: rotate(180deg);
		transition: all 0.5s linear;
	}
	.followHide{
		transform: scale(0);
		transition: all 0.8s linear;
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
	.rotate-avatar{
		width: 95rpx;
		height: 95rpx;
		border-radius: 95rpx;
		background-color: #333333;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: rotateName 5s linear infinite;
	}
	.rotate-image{
		width: 55rpx;
		height: 55rpx;
		border-radius: 55rpx;
	}
	@keyframes rotateName{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
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
      width: 328rpx;
      height: 64rpx;
      background: rgba(0,0,0,0.32);
      border-radius: 32rpx;
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
	.k-paused{
		animation-play-state: paused;
	}
	.k-running{
		animation-play-state: running;
	}
</style>