<template>
  <uni-drawer ref="accountSetting" mode="left" :width="188">
    <view class="draw-con">
      <view class="list">
        <view
          class="item"
          v-for="item in list"
          :key="item.value"
          @click="handleItem(item.value)"
        >
          <image class="zhanwei" :src="item.icon"></image>
          <view class="name">{{ item.name }}</view>
        </view>
      </view>
    </view>
  </uni-drawer>
</template>

<script>
  export default {
    name:"account-setting",
    data() {
      return {
        list: [
          {
            name: '账号与安全',
            value: 'account-safe',
            icon: '/static/account-safe.png'
          },
          {
            name: '帮助与客服',
            value: 'help-customer-service',
            icon: '/static/help.png'
          },
          {
            name: '技能证书',
            value: 'skills-list',
            icon: '/static/tech-list.png'
          },
          {
            name: '设置',
            value: 'system-setting',
            icon: '/static/setting.png'
          }
        ]
      };
    },
    methods: {
			// 打开窗口
			showDrawer(e) {
				this.$refs.accountSetting.open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs.accountSetting.close()
			},
      handleItem(val) {
        uni.navigateTo({
          url: `/pages/${val}/${val}`
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.draw-con {
  height: 100%;
  padding-top: 134rpx;
  padding-left: 28rpx;
  background: #181818;
  box-sizing: border-box;
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 76rpx;
    .zhanwei {
      width: 36rpx;
      height: 36rpx;
    }
    .name {
      font-size: 26rpx;
      font-weight: 400;
      color: #FFFFFF;
      margin-left: 28rpx;
    }
  }
}
</style>