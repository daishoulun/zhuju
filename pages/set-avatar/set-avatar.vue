<template>
  <view class="set-info">
    <view v-if="type === 'setAvatar'" class="set-avatar">
      <view class="avatar">
        <image class="header" :src="form.avatar ? form.avatar : '../../static/avatar-set.png'"></image>
        <image class="camera" src="../../static/camera.png" @click="handlePic"></image>
      </view>
      <view class="set-name">
        <text>设置昵称</text>
      </view>
      <view class="nick-input">
        <input type="text" v-model="form.nickName" maxlength="15" placeholder="请输入">
        <view class="tip">中文、数字、字母组合最多15个字符</view>
      </view>
    </view>
    <view v-else-if="type === 'setSex'" class="set-sex">
      <view class="sex">
        <view
          class="sex-item sex-women"
          :class="{ 'sex-active': form.gender === 1 }"
           @click="form.gender = 1"
        >
          <image src="/static/sex-women.png"></image>
          <view class="name">女生</view>
        </view>
        <view class="sex-item sex-man" :class="{ 'sex-active': form.gender === 0 }" @click="form.gender = 0">
          <image src="/static/sex-man.png"></image>
          <view class="name">男生</view>
        </view>
      </view>
    </view>
    <view v-else-if="type === 'setBirthDay'" class="set-birthday">
      <picker
        v-for="(item, index) in birthday"
        :key="index"
        class="birthday-item"
        mode="date"
        :value="form.birthday"
        :start="startDate"
        :end="endDate"
        @change="bindDateChange"
      >
        <view class="birthday">
          <text v-if="item">{{ item }}</text>
          <view v-else class="placeholder">
            <view class="dots"></view>
            <view class="dots"></view>
          </view>
        </view>
      </picker>
    </view>
    <view class="btn" :class="[
      isHighLight ? 'btn-active' : '',
      btnClass
    ]" @click="handleContinue">{{ type === 'setBirthDay' ? '完成' : '继续' }}</view>
  </view>
</template>

<script>
  import { register, getAliInfo } from '@/api/login.js'
  import { access } from 'fs';
  export default {
    data() {
      return {
        form: {
          avatar: '',
          birthday: '',
          gender: '',
          nickName: ''
        },
        type: 'setAvatar'
      };
    },
    computed: {
      startDate() {
        return this.getDate('start');
      },
      endDate() {
        return this.getDate('end');
      },
      isHighLight() {
        return (
          (this.form.avatar && this.form.nickName && this.type === 'setAvatar') || 
          (this.form.gender && this.type === 'setSex') || 
          (this.form.birthday && this.type === 'setBirthDay')
        )
      },
      btnClass() {
        return 'btn-' + this.type
      },
      birthday() {
        return this.form.birthday ? this.form.birthday.split('-') : ['', '', '']
      }
    },
    methods: {
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
      },
      handlePic() {
        uni.chooseImage({
          count: 1,
          success: async (res) => {
            const authInfo = await getAliInfo({ token: uni.getStorageSync('T-token') })
            this.uploadFile(authInfo.data, res.tempFiles[0].name, res.tempFilePaths[0])
          }
        })
      },
      uploadFile(data, fileName, filePath) {
        const {
          accessid,
          dir,
          host,
          policy,
          signature,
          urlAnchor
        } = data
        uni.uploadFile({
          url: host,
          filePath,
          name: 'file',
          formData: {
            key: dir + fileName,
            signature,
            policy,
            ossAccessKeyId: accessid,
          },
          success: (uploadFileRes) => {
            this.form.avatar = urlAnchor + dir + fileName
            console.log(this.form)
            
          },
          fail: error => {
            console.log('error', error)
          }
        })
      },
      handleContinue() {
        if (this.type === 'setAvatar') {
          this.type = 'setSex'
          uni.setNavigationBarTitle({
            title: '设置性别'
          })
        } else if (this.type === 'setSex') {
          this.type = 'setBirthDay'
          uni.setNavigationBarTitle({
            title: '选择生日'
          })
        } else if (this.type === 'setBirthDay') {
          register(this.form).then(res => {
            if (res.code === 0) {
              this.$showToast('设置成功')
              uni.switchTab({
                url: '/pages/index/index'
              })
            } else {
              this.$showToast(res.msg)
            }
          })
        }
      },
      bindDateChange(e) {
        this.form.birthday = e.detail.value
      }
    }
  }
</script>

<style lang="scss">
.set-info {
  height: calc(100vh - 88rpx);
  background: #181818;
}
.set-avatar {
  box-sizing: border-box;
  padding: 88rpx 70rpx 0;
  .avatar {
    position: relative;
    width: 192rpx;
    height: 192rpx;
    margin: 0 auto 40rpx;
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
  .set-name {
    text-align: center;
    font-size: 32rpx;
    font-weight: 500;
    color: #DCAEF4;
    text-shadow: 0px 2px 2px rgba(0,0,0,0.14);
    margin-bottom: 40rpx;
  }
  .nick-input {
    input {
      width: 100%;
      height: 132rpx;
      background: #2B2B2B;
      border-radius: 28rpx;
      padding-left: 40rpx;
      color: #fff;
    }
    .tip {
      margin-top: 24rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #5C5C5C;
      text-align: center;
    }
  }
}
.set-sex {
  padding: 224rpx 78rpx 0;
  .sex {
    display: flex;
    .sex-item {
      width: 286rpx;
      height: 348rpx;
      background: #2B2B2B;
      border-radius: 40rpx;
      text-align: center;
      padding-top: 106rpx;
      box-sizing: border-box;
      &.sex-man {
        margin-left: 22rpx;
        .name {
          color: #7CA6F9;
        }
      }
      &.sex-active {
        background: #fff;
      }
      image {
        width: 80rpx;
        height: 80rpx;
      }
      .name {
        font-size: 32rpx;
        font-weight: 500;
        color: #DCAEF4;
        margin-top: 36rpx;
      }
    }
  }
}
.set-birthday {
  padding: 332rpx 70rpx 0;
  margin-bottom: 232rpx;
  display: flex;
  .birthday-item {
    position: relative;
    width: 196rpx;
    height: 132rpx;
    background: #2B2B2B;
    border-radius: 28rpx;
    margin-right: 12rpx;
    font-size: 44rpx;
    color: #FFFFFF;
    text-align: center;
    line-height: 132rpx;
    &:last-of-type {
      margin-right: 0;
    }
    .placeholder {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      .dots {
        width: 12rpx;
        height: 12rpx;
        background: #5C5C5C;
        border-radius: 50%;
        margin-right: 22rpx;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
}
.btn {
  width: 612rpx;
  height: 120rpx;
  margin: 0 auto;
  line-height: 120rpx;
  background: #5C5C5C;
  border-radius: 60rpx;
  font-size: 36rpx;
  font-weight: 600;
  color: #201F2C;
  text-align: center;
  &.btn-active {
    background: linear-gradient(109deg, #FDB0F2 0%, #109DFF 100%);
  }
  &.btn-setAvatar {
    margin-top: 102rpx;
  }
  &.btn-setSex {
    margin-top: 124rpx;
  }
}
</style>
