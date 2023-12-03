<template>
  <view class="container">
    <view class="image-box" :style="{
                backgroundImage: 'url('+ src +')',
                width: imageBoxWidth + 'px',
                height: imageBoxHeight + 'px',
            }">
      <view class="mask"></view>
      <view class="cropping-box" @touchstart.stop="touchstart" @touchmove.stop="touchmove" :style="{
                    top: cropBoxY + 'px',
                    left: cropBoxX + 'px',
                    width: cropBoxWidth  + 'px',
                    height: cropBoxHeight + 'px',
                    backgroundImage: 'url('+ src +')',
                    backgroundSize: imageBoxWidth + 'px' + ' ' + imageBoxHeight + 'px',
                    backgroundPositionX: (-cropBoxX - 2) + 'px',
                    backgroundPositionY: (-cropBoxY - 2) + 'px',
                    borderRadius: cropShape == 'rect' ? '' : '50%' 
                }">

        <view v-if="cropShape == 'rect' && !isFixedSize" class="zoom-handle-rect" data-body="handle"></view>
        <view v-if="cropShape == 'circular'" class="zoom-chandle-circular" data-body="handle"></view>
      </view>
    </view>

    <!-- <canvas class="canvas" canvas-id="canvas" id="canvas" :style="{width: canvasWidth + 'px', height: canvasHeight + 'px'}"></canvas> -->

    <view class="operation-area">
      <view class="ratio-area" v-if="cropShape == 'rect'">
        <!-- <view class="ratio-btn" @click="setRatio('full')">full</view> -->
        <!-- <view class="ratio-btn" @click="setRatio(item)" v-for="item in ratioGroup">{{item}}</view> -->
      </view>
      <view class="bottom">
        <view class="btn" size="mini" @click="cancel">取消</view>
        <!-- <button size="mini" type="primary" @click="yuantu">原图</button> -->
        <view class="btn" size="mini" type="primary" @click="cropping">确定</view>
      </view>
    </view>
  </view>
</template>
<script>
  let startX, startY;
  let boxX, boxY, boxWidth, boxHeight;
  let imageOriginalWidth, imageOriginalHeight;
  let imageZoomRatio;
  let windowInfo;

  export default {
    name: 'imageCropping',
    props: {
      src: {
        type: String,
      },
      ratioGroup: {
        type: Array,
        default () {
          return []
        }
      },
      isFixedSize: {
        type: Boolean,
        default: false
      },
      cropShape: {
        type: String,
        default: 'rect' // 'rect' , 'circular' 
      }
    },
    data() {
      return {
        imageBoxWidth: 0,
        imageBoxHeight: 0,
        cropBoxX: 0,
        cropBoxY: 0,
        cropBoxWidth: 0,
        cropBoxHeight: 0,
        // move: 移动 , zoom: 缩放
        mode: '',
      }
    },
    mounted() {
      windowInfo = uni.getWindowInfo();

      uni.getImageInfo({
        src: this.src,
        success: (res) => {
          imageOriginalWidth = res.width;
          imageOriginalHeight = res.height;

          let widthZoomRatio = imageOriginalWidth / windowInfo.windowWidth;
          let heightZoomRatio = imageOriginalHeight / windowInfo.windowHeight;
          imageZoomRatio = widthZoomRatio > heightZoomRatio ? widthZoomRatio : heightZoomRatio;

          this.imageBoxWidth = imageOriginalWidth / imageZoomRatio;
          this.imageBoxHeight = imageOriginalHeight / imageZoomRatio;
          this.setRatio('1:1');
        }
      })
    },
    methods: {
      touchstart(event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;

        if (event.target.dataset.body == "handle") {
          this.mode = 'zoom';
          boxWidth = this.cropBoxWidth;
          boxHeight = this.cropBoxHeight;
        } else {
          this.mode = 'move';
          boxX = this.cropBoxX;
          boxY = this.cropBoxY;
        }
      },
      touchmove(event) {
        console.log('touceMove', event)
        let distanceX = event.touches[0].clientX - startX;
        let distanceY = event.touches[0].clientY - startY;

        let x = boxX + distanceX;
        let y = boxY + distanceY;
        let width = boxWidth + distanceX;
        let height = boxHeight + distanceY;

        let maxX = this.imageBoxWidth - this.cropBoxWidth;
        let maxY = this.imageBoxHeight - this.cropBoxHeight;
        let maxWidth = this.imageBoxWidth - this.cropBoxX;
        let maxHeight = this.imageBoxHeight - this.cropBoxY;

        switch (this.mode) {
          case 'move':
            this.cropBoxX = x < 0 ? 0 : (x > maxX ? maxX : x);
            this.cropBoxY = y < 0 ? 0 : (y > maxY ? maxY : y);
            break;
          case 'zoom':
            if (this.cropShape == 'rect') {
              this.cropBoxWidth = width > maxWidth ? maxWidth : width;
              this.cropBoxHeight = height > maxHeight ? maxHeight : height;
            } else {
              this.cropBoxHeight = height > maxHeight ? maxHeight : height;
              this.cropBoxWidth = height > maxHeight ? maxHeight : height;
            }
            break;
        }
      },
      setRatio(ratio) {
        if (ratio == 'full') {
          this.cropBoxWidth = this.imageBoxWidth;
          this.cropBoxHeight = this.imageBoxHeight;
          this.cropBoxX = 0;
          this.cropBoxY = 0;
        } else {
          let x = ratio.split(':')[0];
          let y = ratio.split(':')[1];
          let r1 = (x / y);
          let r2 = (y / x);

          if (this.imageBoxWidth < this.imageBoxHeight) {
            let size = this.imageBoxWidth;
            if (size / r1 > this.imageBoxHeight) {
              size = this.imageBoxHeight;
              this.cropBoxWidth = size / r2;
              this.cropBoxHeight = size;
              this.cropBoxX = (this.imageBoxWidth - this.cropBoxWidth) / 2;
              this.cropBoxY = 0;
            } else {
              this.cropBoxWidth = size;
              this.cropBoxHeight = size / r1;
              this.cropBoxX = 0;
              this.cropBoxY = (this.imageBoxHeight - this.cropBoxHeight) / 2;
            }
          } else {
            let size = this.imageBoxHeight;
            if (size / r1 > this.imageBoxWidth) {
              size = this.imageBoxWidth;
              this.cropBoxWidth = size;
              this.cropBoxHeight = size / r2;
              this.cropBoxX = 0;
              this.cropBoxY = (this.imageBoxHeight - this.cropBoxHeight) / 2;
            } else {
              this.cropBoxWidth = size / r1;
              this.cropBoxHeight = size;
              this.cropBoxX = (this.imageBoxWidth - this.cropBoxWidth) / 2;
              this.cropBoxY = 0;
            }
          }
        }

      },
      async cropping() {
        let x = this.cropBoxX * imageZoomRatio;
        let y = this.cropBoxY * imageZoomRatio;
        let w = this.cropBoxWidth * imageZoomRatio;
        let h = this.cropBoxHeight * imageZoomRatio;

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
          // image.src = "https://pic4.ntimg.cn/file/20191225/30544261_221404258307_1.jpg"; 
        })
        context.clearRect(0, 0, w, h);
        if (this.cropShape == 'circular') {
          context.beginPath();
          context.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
          context.fill();
          context.clip();
        }
        context.drawImage(image, x, y, w, h, 0, 0, w, h);
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

        // 方式一：
        // const context = uni.createCanvasContext('canvas', this)
        // context.drawImage(this.src,x,y,w,h,0, 0, w, h)
        // context.draw(false, ()=>{
        //     console.log(123);
        //     uni.canvasToTempFilePath({
        //         canvas: context,
        //         success: function(res) {
        //             console.log(res)
        //         },
        //         complete: function(res){
        //             console.log(res)
        //         }
        //     },this)
        // })

      },
      yuantu() {
        this.$emit('completed', {
          tempFilePath: this.src
        })
      },
      cancel() {
        this.$emit('cancel')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;

    .image-box {
      position: relative;
      background-size: contain;
      // filter: invert(1);

      .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.4);
        // backdrop-filter: blur(10px);
      }

      .cropping-box {
        position: absolute;
        box-sizing: border-box;
        z-index: 1;

        .zoom-handle-rect,
        .zoom-chandle-circular {
          width: 10px;
          height: 10px;
          background-color: springgreen;
          border-radius: 50%;
          position: absolute;
          right: -6px;
          bottom: -6px;
        }

        .zoom-chandle-circular {
          right: 50%;
          transform: translateX(5px);
        }

      }
    }
  }

  .operation-area {
    position: fixed;
    bottom: 0;
    z-index: 1;
    width: 100%;
    padding: 10rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .ratio-area {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16rpx;

      .ratio-btn {
        display: inline-block;
        padding: 8rpx 20rpx;
        border: 2rpx solid white;
        color: white;
        margin: 0 10rpx;
        font-size: 12px;
      }
    }

    .bottom {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .btn {
        font-size: 36rpx;
        font-weight: 500;
        color: #FFFFFF;
        margin: 0 40rpx;
      }
    }

  }

  .canvas {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    border: 1px solid;
    // display: none;
  }
</style>