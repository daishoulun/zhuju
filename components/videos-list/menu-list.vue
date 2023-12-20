<template>
	<view class="menu-list" :class="{ isDetail: hasDetail }">
    <view v-if="!hasDetail" class="header-local">
      <image src="/static/location.png" mode=""></image>
      <text class="area">杭州</text>
    </view>
		<!-- 底部标题 -->
		<view v-if="!(activeType === 'dynamics' && item.moment.contentType === 3)" class="footTitle" :class="[vodIndex == index?(sliderDrag?'vodMenu-bright1':(moveOpacity?'vodMenu-bright2':'vodMenu-bright0')):'']">
			<view class="v-title-wrap">
        <text class="foot-name">{{ footTitle }}</text>
        <text v-if="activeType !== 'dynamics'" class="detail pointer-events-auto" @click.stop="handleDetail">详情</text>
        <image v-if="activeType !== 'dynamics'" class="arrow-r" src="/static/arrow-r.png"></image>
      </view>
			<view v-if="item.activity" class="foot-cont">{{ item.activity.startTime }} - {{ item.activity.endTime }}</view>
      <view v-if="activeType === 'dynamics'" id="content" class="content">{{ dyContent }}</view>
      <view v-if="activeType !== 'dynamics'" class="location">
        <image src="/static/location.png" mode=""></image>
        <text>{{ item.location }} · {{ item.distance | distanceFilter }}</text>
      </view>
		</view>
		<!-- 右侧操作栏 -->
		<view class="menuBox">
			<view class="vodMenu" :class="[vodIndex == index?(sliderDrag?'vodMenu-bright1':(moveOpacity?'vodMenu-bright2':'vodMenu-bright0')):'']">
				<!-- 头像 -->
				<view class="menu-avatar">
					<image :src="item.avatar" mode="aspectFill" class="avatar-image pointer-events-auto" @click.stop="JumpBtn(1, item)"></image>
					<view v-if="activeType === 'dynamics'" class="follow pointer-events-auto" @click.stop="followBtn(item)">
						<image src="/static/add-like.png" mode="" class="follow-guanzhu" v-if="!item.followed"></image>
						<image src="/static/has-like.png" mode="" class="follow-guanzhu guanzhu-gou" v-else></image>
					</view>
				</view>
				<!-- 点赞 -->
				<view class="fabulous pointer-events-auto" :class="{ isHidden: activeType !== 'dynamics' }" @click.stop="JumpBtn(2)">
          <view class="fabulous-image fabulous-taoxin pointer-events-auto" @click.stop="fabulousBtn(item.liked)">
            <image src="/static/heart-active.png" class="fabulous-image" v-if="item.liked"></image>
            <image src="/static/heart.png" mode="" class="fabulous-image" v-else></image>
          </view>
					<view class="fabulous-num">{{ item.likeCount || 0 }}</view>
				</view>
				<!-- 评论 -->
				<view class="fabulous pointer-events-auto" :class="{ isHidden: activeType !== 'dynamics' }" style="margin-top: 30rpx;" @click.stop="JumpBtn(3)">
					<view class="fabulous-image">
						<image src="/static/comment.png" mode="" class="fabulous-image"></image>
					</view>
					<view class="fabulous-num">{{ item.commentCount || 0 }}</view>
				</view>
				<!-- 转发 -->
				<view class="fabulous pointer-events-auto" style="margin-top: 30rpx;" @click.stop="JumpBtn(4)">
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
	export default{
		data(){
			return {
				followed:false,
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
      },
      hasDetail: { // 是否是详情页
				type: Boolean,
				default: false
      }
		},
    watch: {
      params(val) {
        console.log(JSON.stringify(val))
      }
    },
    computed: {
      footTitle() {
        if (this.activeType === 'dynamics') {
          if (this.hasDetail) {
            
          }
          return this.item?.moment?.title || ''
        } else {
          return this.item.location 
        }
      },
      dyContent() {
        if (this.activeType === 'dynamics') {
          if (this.hasDetail) {
            return this.item.content
          }
          return this.item?.moment?.content || ''
        }
        return ''
      }
    },
    methods:{
      handleDetail() {
        uni.navigateTo({
          url: '/pages/activity-detail/activity-detail?id=' + this.item.indexId
        })
      },
			/* 视频点赞动效 */
			fabulousBtn(index){
				let obj = Object.assign({},this.item)
				obj.followed = !obj.followed
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
							url:'/pages/person-detail/person-detail?id=' + this.item.userId
						})
					break;
					case 2 :
						console.log('点击点赞')
					break;
					case 3 :
            this.$emit('click-action', index)
					break;
					case 4 :
          this.$emit('click-transfer')
					break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
  .pointer-events-auto {
    pointer-events: auto;
  }
  .menu-list {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    pointer-events: none;
    .header-local {
      display: flex;
      align-items: center;
      position: absolute;
      top: 168rpx;
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
  .isDetail .footTitle {
    bottom: 210rpx;
  }
	/* 底部标题部分 */
	.footTitle{
		position: absolute;
		bottom: 20px;
		left: 0;
		z-index: 8;
    padding: 0 32rpx;
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
    margin-bottom: 24rpx;
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
  .content {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding-right: 160rpx;
    margin-bottom: 24rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #FFFFFF;
  }
	.foot-primary{
		font-size: 27rpx;
		color: #FFFFFF;
	}
</style>