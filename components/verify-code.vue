<template>
  <div class="code-outsidebox">
    <input
      type="number"
      class="code-box"
      v-for="(item, index) in inputList.length"
      :ref="'input'+ index"
      :key="index"
      :focus="inputList[index].focus"
      v-model="inputList[index].value"
      maxlength="1"
      @input="oninput(index)"
      @keyup.8="handleKeyup(index)"
    />
  </div>
</template>
<script>
  export default {
    props: {
      inputCount: {
        type: Number,
        default: 6
      }
    },
    data() {
      return {
        inputList: [
          { value: '', focus: true },
          { value: '', focus: false },
          { value: '', focus: false},
          { value: '', focus: false },
          { value: '', focus: false},
          { value: '', focus: false },
        ]
      }
    },
    mounted() {
      
    },
    methods: {
      oninput(index) {
        this.inputList[index].focus = false
        if (this.inputList[index].value.length > 0) {
          if (index < 5) {
            this.inputList[index + 1].focus = true
          }
        } else {
          if (index > 0) {
            this.inputList[index - 1].focus = true
          }
        }
      },
      handleKeyup(index) {
        if (this.inputList[index].value.length === 0) {
          this.inputList[index].focus = false
          if (index > 0) {
            this.inputList[index - 1].focus = true
          }
        }
      }
    }
  }
</script>
<style scoped>
  .code-outsidebox {
    width: 100%;
    height: auto;
    position: relative;
    display: flex;
    justify-content: space-around;
    margin-top: 10rpx;
  }

  .code-box {
    width: 102rpx;
    height: 106rpx;
    background: #2B2B2B;
    border-radius: 22rpx;
    text-align: center;
    font-size: 44rpx;
    color: #FFFFFF;
    line-height: 106rpx;
    transition: all 0.5s;
    caret-color: #DCAEF4;
  }
</style>