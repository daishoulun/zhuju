<template>
  <view class="form-item">
    <view class="label">{{ label }}</view>
    <view class="input">
      <slot>
        <input
          class="uni-input"
          v-model="value"
          :placeholder="placeholder"
          @input="$emit('change', $event.target.value)"
        />
      </slot>
    </view>
    <view v-if="hasArrow" class="arrow">
      <image src="@/static/arrow-r.png"></image>
    </view>
  </view>
</template>

<script>
  export default {
    name:"form-item",
    model: {
      prop: 'inputValue',
      event: 'change'
    },
    props: {
      label: {
        type: String
      },
      inputValue: {
        type: String
      },
      placeholder: {
        type: String
      },
      hasArrow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        value: this.inputValue
      }
    }
  }
</script>

<style lang="scss">
  .form-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 750rpx;
    height: 112rpx;
    padding: 0 32rpx;
    box-sizing: border-box;
    .label {
      width: 112rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #7D7D7D;
      margin-right: 40rpx;
    }
    .input {
      flex: 1;
      .uni-input {
        font-size: 28rpx;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
    .arrow {
      width: 28rpx;
      image {
        width: 28rpx;
        height: 28rpx;
      }
    }
  }
</style>