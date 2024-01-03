<template>
  <view class="img-crop" :style="{
    top: top + 'px',
    height: `calc(100% - ${top}px)`,
  }">
    <view class="img-crop-wrap">
      <view class="img-crop-content">
        <view class="img-bg" :style="{
          backgroundImage: 'url('+ src +')',
        }"></view>
        <view class="mask"></view>
        <view class="crop-box" @touchstart.stop="touchstart" @touchmove.stop="touchmove" :style="{
          width: cropShape == 'rect' ? '100%' : '224px',
          height: cropBoxHeight + 'px',
          top: cropTop + 'px',
          left: cropShape == 'rect' ? 0 : cropLeft + 'px',
          backgroundImage: 'url('+ src +')',
          backgroundPositionX: -cropLeft + 'px',
          backgroundPositionY: -cropTop + 'px',
          borderRadius: cropShape == 'rect' ? '' : '50%',
          backgroundSize: cropShape == 'rect' ? '100% auto' : imageBoxWidth + 'px' + ' ' + imageBoxHeight + 'px',
        }"></view>
      </view>
    </view>
    <view class="footer">
      <text @click="cancel">取消</text>
      <text @click="reset">重置</text>
      <text class="confirm" @click="confirm">确定</text>
    </view>
  </view>
</template>
<script>
let boxWidth, boxHeight; // 容器的宽高
let originImgWidth, originImgHeight; // 图片原始宽度 、 高度
let startX, startY;
let zoomWidth, zoomHeight;
let timer;
let zoomRatio;
export default {
  name: 'ImgCrop',
  props: {
    src: {
      type: String
    },
    top: {
      type: Number
    },
    cropShape: {
      type: String
    }
  },
  data() {
    return {
      cropBoxHeight: 0,
      cropBoxTop: 0,
      cropBoxLeft: 0,
      imageBoxWidth: 0,
      imageBoxHeight: 0,
    }
  },
  computed: {
    cropTop() {
      return this.cropBoxTop.toFixed()
    },
    cropLeft() {
      return this.cropBoxLeft.toFixed()
    }
  },
  mounted() {
    const query = uni.createSelectorQuery().in(this);
    query.select('.img-crop-content').boundingClientRect(data => {
      boxWidth = data.width
      boxHeight = data.height
      uni.getImageInfo({
        src: this.src,
        success: (res) => {
          // 图片原始尺寸
          originImgWidth = res.width
          originImgHeight = res.height
          zoomRatio = boxWidth / originImgWidth
          // 按照比例缩放后的背景高度
          zoomWidth = zoomRatio * originImgWidth
          zoomHeight = zoomRatio * originImgHeight
          if (this.cropShape === 'rect') {
            this.cropBoxHeight = Math.min(zoomHeight, 228)
          } else {
            this.cropBoxHeight = 224
          }
          this.cropBoxTop = (boxHeight - this.cropBoxHeight) / 2
          if (this.cropShape === 'circular') {
            // 圆形 寛高相同 所以减去寛或高是一样的
            this.cropBoxLeft = (boxWidth - this.cropBoxHeight) / 2
          }
          let maxY = zoomHeight - this.cropBoxHeight;
          this.cropBoxTop = this.cropBoxTop <= 0 ? 0 : (this.cropBoxTop > maxY ? maxY : this.cropBoxTop);

          this.imageBoxWidth = originImgWidth * zoomRatio
          this.imageBoxHeight = originImgHeight * zoomRatio
        }
      })
    }).exec();
  },
  methods: {
    touchstart(event) {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    },
    touchmove(event) {
      // if (!timer) {
      //   timer = setTimeout(() => {
          let distanceY = event.touches[0].clientY - startY;
          let y = this.cropBoxTop + distanceY;
          let maxY = zoomHeight - this.cropBoxHeight;
          this.cropBoxTop = y <= 0 ? 0 : (y > maxY ? maxY : y);
          if (this.cropShape === 'circular') {
            let distanceX = event.touches[0].clientX - startX;
            let x = this.cropBoxLeft + distanceX;
            let maxX = zoomWidth - this.cropBoxHeight;
            this.cropBoxLeft = x <= 0 ? 0 : (x > maxX ? maxX : x);
          }
        //   timer = null
        // }, 50);
      // }
    },
    cancel() {
      uni.navigateBack()
    },
    reset() {},
    confirm() {
      const query = uni.createSelectorQuery().in(this);
      query.select('.crop-box').boundingClientRect(async data => {
        const { width, height } = data
        const w = width / zoomRatio
        const h = height / zoomRatio
        const t = this.cropBoxTop / zoomRatio
        let l = 0
        // 方式2： 
        const canvas = uni.createOffscreenCanvas({
          type: '2d',
          width: w,
          height: h
        });
        const context = canvas.getContext('2d');
        const image = canvas.createImage();
        await new Promise((resolve, reject) => {
          image.onload = resolve
          image.onerror = reject
          image.src = this.src;
        })
        context.clearRect(0, 0, w, h);
        
        if (this.cropShape == 'circular') {
          l = this.cropBoxLeft / zoomRatio
          context.beginPath();
          context.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
          context.fill();
          context.clip();
        }
        context.drawImage(image, l, t, w, h, 0, 0, w, h);
        const DataURL = canvas.toDataURL();

        const fs = wx.getFileSystemManager();
        let tempFilePath = `${wx.env.USER_DATA_PATH}/` + new Date().getTime() + '.png'
        fs.writeFile({
          filePath: tempFilePath,
          data: DataURL.replace('data:image/png;base64,', ''),
          encoding: 'base64',
          success: res => {
            this.$emit('completed', tempFilePath)
          },
          fail(res) {
            console.error(res)
          }
        })
      }).exec();
    },
  }
}
</script>

<style lang="scss" scoped>
.img-crop {
  width: 100%;
  padding: 0 0 46rpx;
  box-sizing: border-box;
  overflow: hidden;
  position: fixed;
  left: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  background-color: #181818;
  .img-crop-wrap {
    flex: 1;
    padding: 0 68rpx;
    box-sizing: border-box;
    margin-bottom: 22rpx;
    .img-crop-content {
      position: relative;
      width: 100%;
      height: 100%;
      .img-bg {
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 0 0;
      }
      .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(24, 24, 24, 0.5);
      }
      
      .crop-box {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 456rpx;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40rpx;
    box-sizing: border-box;
    font-size: 36rpx;
    font-weight: 500;
    color: #FFFFFF;
    .confirm {
      color: #DCAEF4;
    }
  }
}
</style>