# 标题

### 使用说明

```
import imageCropping from '../../components/image-cropping'
components:{imageCropping}

<image-cropping
  v-if="imageUrl"
  :src="imageUrl"
  :isFixedSize="true"
  :ratioGroup="['4:3', '1:1']"
  @completed="cropCompleted"
  @cancel="cropCancel" >
  </image-cropping>
```


### 属性
| 属性 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- |
| src | String | "" | 需要裁剪的图片路径 |
| ratioGroup | Array | [] | 设置比例数组 |
| isFixedSize | Boolean | false | 是否固定裁剪尺寸大小 |
| cropShape | String | 'rect' | 裁剪的形状，rect：矩形；circular：圆形 |

### 事件
| 事件名称 | 说明 | 返回 |
| --- | --- | --- | --- |
| completed | 点击确定按钮 | e:{tempFilePath} |
| cancel | 点击取消按钮 | 无 |

### 其他说明
1. 组件截图保存采用微信小程序离屏canvas实现（uni.createOffscreenCanvas）,所以咱支持微信小程序组件
2. 裁剪的图片默认导出为base64格式，为方便使用、上传图片，组件转换base64图片为临时路径（tempFilePath）


