<template>
  <view class="update-info">
    <view class="header-image">
      <image class="header" :src="userForm.avatar || '/static/user-header.png'"></image>
      <image class="camera" src="../../static/camera.png" @click="handlePic"></image>
    </view>
    <view class="user-form">
      <FormItem label="昵称">
        <view class="uni-input" @click="handleNickName">{{ userForm.nickName }}</view>
      </FormItem>
      <FormItem label="简介">
        <text class="self-desc" @click="handleSelfIntro">介绍一下你自己</text>
      </FormItem>
      <FormItem label="性别" :has-arrow="false">
        <view class="uni-input">{{ userForm.gender === 1 ? '女' : '男' }}</view>
      </FormItem>
      <FormItem label="生日">
        <picker mode="date" :value="userForm.birthday" :start="startDate" :end="endDate" @change="selectDate">
          <view class="uni-input">{{ userForm.birthday }}</view>
        </picker>
      </FormItem>
      <FormItem label="地区">
        <view class="uni-input" @click="updateCity">杭州</view>
      </FormItem>
      <FormItem class="home-bg" label="主页背景" :hasArrow="false">
        <view class="uni-input" @click="handelBg">更改主页背景</view>
      </FormItem>
    </view>
  </view>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import FormItem from '@/components/form-item.vue'
  import { fetchUserInfo, getProfile, editInfo } from '@/api/person-center.js'
  export default {
    components: {
      FormItem
    },
    data() {
      return {
        sexList: ['男', '女'],
        userForm: {
          avatar: '',
          nickName: '',
          sexInd: 0,
          birthday: ''
        },
        userId: ''
      };
    },
    computed: {
      startDate() {
        return this.getDate('start');
      },
      endDate() {
        return this.getDate('end');
      }
    },
    onShow() {
      this.userId= uni.getStorageSync('userId')
      if (this.userId) {
        this.getUserInfo()
      }
    },
    methods: {
      getUserInfo() {
        fetchUserInfo({ userId: this.userId }).then(res => {
          this.userForm = res.data || {}
          uni.setStorageSync('userInfo', JSON.stringify(this.userForm))
        })
      },
      selectSex(e) {
        this.userForm.sexInd = e.detail.value
      },
      selectDate: function(e) {
        editInfo({
          birthday: e.detail.value,
          userId: this.userForm.userId
        }).then(res => {
          if (res.code === 0) {
            this.$showToast('修改成功')
            this.getUserInfo()
          } else {
            this.$showToast(res.msg)
          }
        })
      },
      handlePic() {
        uni.navigateTo({
          url: '/pages/set-avatar/set-avatar'
        })
      },
      handelBg() {
        uni.chooseImage({
          count: 1,
          success: (res) => {
            uni.navigateTo({
              url: '/pages/image-crop/image-crop?imageUrl=' + res.tempFilePaths[0]
            })
          }
        })
      },
      updateCity() {
        uni.navigateTo({
          url: '/pages/select-city/select-city'
        })
      },
      handleNickName() {
        uni.navigateTo({
          url: '/pages/nick-name/nick-name'
        })
      },
      handleSelfIntro() {
        uni.navigateTo({
          url: '/pages/self-introduction/self-introduction'
        })
      },
      getDate(type) {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (type === 'start') {
            year = year - 60;
        } else if (type === 'end') {
            year = year + 2;
        }
        month = month > 9 ? month : '0' + month;
        day = day > 9 ? day : '0' + day;
        return `${year}-${month}-${day}`;
      }
    }
  }
</script>

<style lang="scss">
.update-info {
  height: 100vh;
  box-sizing: border-box;
  padding-top: 88rpx;
  background: #181818;
  .header-image {
    position: relative;
    width: 192rpx;
    height: 192rpx;
    margin: 0 auto 64rpx;
    .header {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .camera {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 72rpx;
      height: 72rpx;
    }
  }
  .user-form {
    background: #262626;
    border-radius: 20rpx;
    .uni-input {
      font-size: 28rpx;
      font-weight: 400;
      color: #FFFFFF;
    }
    .home-bg {
      border-top: 20rpx solid #181818;
    }
    .self-desc {
      font-size: 28rpx;
      color: #DCAEF4;
    }
  }
}
</style>
