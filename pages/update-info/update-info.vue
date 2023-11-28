<template>
  <view class="update-info">
    <view class="header-image">
      <image class="header" :src="$avatar"></image>
      <image class="camera" src="../../static/camera.png" @click="handlePic"></image>
    </view>
    <view class="user-form">
      <FormItem v-model="userForm.nickName" label="昵称"></FormItem>
      <FormItem label="简介">
        <text class="self-desc" @click="handleSelfIntro">介绍一下你自己</text>
      </FormItem>
      <FormItem label="性别">
        <picker @change="selectSex" :value="userForm.sexInd" :range="sexList">
          <view class="uni-input">{{ sexList[userForm.sexInd] }}</view>
        </picker>
      </FormItem>
      <FormItem label="生日">
        <picker mode="date" :value="userForm.date" :start="startDate" :end="endDate" @change="selectDate">
          <view class="uni-input">{{ userForm.date }}</view>
        </picker>
      </FormItem>
      <FormItem label="地区">
        <view class="uni-input" @click="updateCity">杭州</view>
      </FormItem>
      <FormItem class="home-bg" label="主页背景" :hasArrow="false">
        <view class="uni-input">更改主页背景</view>
      </FormItem>
    </view>
  </view>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import FormItem from '@/components/form-item.vue'
  export default {
    components: {
      FormItem
    },
    data() {
      const currentDate = this.getDate({
        format: true
      })
      return {
        sexList: ['男', '女'],
        userForm: {
          nickName: '张三',
          sexInd: 0,
          date: currentDate
        }
      };
    },
    computed: {
      ...mapState({
        $avatar: 'avatar',
        userInfo: 'userInfo'
      }),
      startDate() {
        return this.getDate('start');
      },
      endDate() {
        return this.getDate('end');
      }
    },
    methods: {
      ...mapMutations({
        $SET_USER_IMG: 'SET_USER_IMG'
      }),
      selectSex(e) {
        this.userForm.sexInd = e.detail.value
      },
      selectDate: function(e) {
        this.userForm.date = e.detail.value
      },
      handlePic() {
        // uni.chooseImage({
        //   count: 1,
        //   success: (res) => {
        //     this.$SET_USER_IMG(res.tempFilePaths[0])
        //   }
        // })
        uni.navigateTo({
          url: '/pages/set-avatar/set-avatar'
        })
      },
      updateCity() {
        uni.navigateTo({
          url: '/pages/select-city/select-city'
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
  height: calc(100vh - 88rpx);
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
