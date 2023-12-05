<template>
  <view>
    <web-view :src="src"></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        src: ''
      };
    },
    onLoad(opt) {
      this.src = opt.src
    }
  }
</script>

<style lang="scss">

</style>
