<template>
  <view class="city-list-page" :style="{ paddingTop: headerTop + 'px' }">
    <view class="head-bar-wrap">
      <view class="head-bar">
        <image class="back-icon" src="/static/arrow-l.png"></image>
        <view class="input-wrap">
          <image class="search-icon" src="/static/search.png"></image>
          <input class="search-input" type="text" v-model="keyword" placeholder="输入城市名称"
            placeholder-style="color: #AAAAAA; font-size: 24rpx;">
        </view>
      </view>
      <view class="current-city">
        <view class="label">当前城市</view>
        <view class="city">
          <view class="c-city">
            <image class="c-icon" src="/static/location-color.png"></image>
            <text class="city-name">hanghzoushi</text>
          </view>
          <view class="c-city">
            <image class="c-icon" src="/static/reset.png"></image>
            <text class="reset-loc">重新定位</text>
          </view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y :scroll-into-view="scrollTop" :style="{ height: `calc(100vh - ${scrollHeight}px)` }">
      <view class="city-main">
        <view class="city-list-wrap">
          <view class="city-partition" :id="'city-partition-' + item.key === '顶部' ? '0' : item.key" v-for="item in cityList" :key="item.key">
            <view class="city-initials">{{ item.key }}</view>
            <view class="city-list">
              <view class="city-item" v-for="city in item.list" :key="item.id">{{ city.name }}</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="right-bar">
      <view class="nav">
        <view
          class="nav-item"
          v-for="item in rData"
          :key="item"
          @click="clickNavBar(item)"
        >{{ item }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  import PinyinUtils from '@/utils/pinUtils.js'
  import { cityData } from '@/utils/baidu_code.js'
  // // 获取拼音
  // console.log(PinyinUtils.chineseToPinYin('张三'))
  // // ZHANGSAN
  // // ===============
  // // 获取首字母
  // console.log(PinyinUtils.chineseToPinYinFirst('安庆市'))
  // ZS
import disTopHeight from '@/mixins/disTopHeight'
export default {
  mixins: [disTopHeight],
  data() {
    return {
      keyword: '',
      headerHeight: 0,
      headerWrapHeight: 0,
      cityList: [],
      rData: ['顶部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'],
      scrollTop: ''
    };
  },
  computed: {
    headerTop() {
      const space = (this.navBarHeight - this.headerHeight) / 2
      return space + this.statusBarHeight
    },
    scrollHeight() {
      return this.headerTop + this.headerWrapHeight
    }
  },
  onReady() {
    this.formatCityData()
    this.getHeaderHeight()
  },
  methods: {
    formatCityData() {
      let cityMap = {}
      let cityList = []
      cityData.forEach(item => {
        const pinyin = PinyinUtils.chineseToPinYinFirst(item.name)
        const firstLetter = pinyin.substring(0, 1)
        item.pinyin = pinyin
        if (cityMap[firstLetter]) {
          cityMap[firstLetter].push(item)
        } else {
          cityMap[firstLetter] = [item]
        }
      })
      for (let key in cityMap) {
        cityMap[key].sort((a, b) => a.pinyin.localeCompare(b.pinyin))
        cityList.push({
          key,
          list: cityMap[key]
        })
      }
      cityList.sort((a, b) => a.key.localeCompare(b.key))
      this.cityList = cityList
    },
    getHeaderHeight() {
      const query = uni.createSelectorQuery().in(this);
      query.select('.head-bar-wrap').boundingClientRect(data => {
        console.log('wra', data)
        this.headerWrapHeight = data.height
      })
      query.select('.head-bar').boundingClientRect(data => {
        this.headerHeight = data.height
      }).exec();
    },
    clickNavBar(item) {
      // 'city-partition-'
      this.scrollTop = ''
      this.$nextTick(() => {
        this.scrollTop = 'city-partition-' + item === '顶部' ? 'A' : item
      })
      // console.log(item)
      //   this.scrollTop = 1
      // if (item === '顶部') {
      //   this.scrollTop = 0
      // } else {
      //   uni.pageScrollTo({
      //     selector: '.city-partition-' + item
      //   })
      // }
    }
  }
}
</script>

<style lang="scss">
.city-list-page {
  height: 100vh;
  background-color: #181818;
  box-sizing: border-box;

  .head-bar {
    display: flex;
    align-items: center;
    padding-left: 32rpx;
    box-sizing: border-box;

    .back-icon {
      width: 44rpx;
      height: 44rpx;
      margin-right: 24rpx;
    }

    .input-wrap {
      display: flex;
      align-items: center;
      width: 426rpx;
      height: 68rpx;
      background: #262626;
      border-radius: 32rpx;
      padding: 0 22rpx;
      box-sizing: border-box;

      .search-icon {
        width: 32rpx;
        height: 32rpx;
        margin-right: 10rpx;
      }

      .search-input {
        flex: 1;
        height: 68rpx;
        color: #fff;
        font-size: 24rpx;
      }
    }
  }
  .current-city {
    margin-top: 12rpx;
    padding: 20rpx 32rpx;
    border-bottom: 12rpx solid #262626;

    .label {
      font-size: 24rpx;
      color: #7D7D7D;
      margin-bottom: 32rpx;
    }

    .city {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .c-city {
        display: flex;
        align-items: center;

        .c-icon {
          width: 36rpx;
          height: 36rpx;
          margin-right: 10rpx;
        }

        .city-name {
          font-size: 28rpx;
          font-weight: 500;
          color: #FFFFFF;
        }

        .reset-loc {
          font-size: 24rpx;
          font-weight: 400;
          color: #7D7D7D;
        }
      }
    }
  }
  .city-main {
    font-weight: 400;
    .city-list-wrap {
      padding: 20rpx 32rpx;
      box-sizing: border-box;

      .city-initials {
        font-size: 24rpx;
        font-weight: 400;
        color: #999999;
      }

      .city-item {
        font-size: 28rpx;
        font-weight: 400;
        color: #FFFFFF;
        padding: 24rpx 0;
      }
    }
  }
  .right-bar {
    position: fixed;
    top: 300rpx;
    right: 8rpx;
    width: 48rpx;
    text-align: center;
    .nav-item {
      font-size: 20rpx;
      font-weight: 400;
      color: #7D7D7D;
      margin-bottom: 10rpx;
      transition: all .5s;
      &:hover {
        transform: scale(1.5);
      }
    }
  }
}
</style>
