export default {
  data() {
    return {
      statusBarHeight: 0, // 状态栏高度,
      menuBtnTop: 0, // 右上角胶囊距离屏幕顶部的距离
      mentBtnHeight: 0, // 右上角胶囊高度
    }
  },
  computed: {
    // 导航栏高度
    navBarHeight() {
      const top = this.menuBtnTop - this.statusBarHeight // 胶囊距离状态栏的高度
      return top * 2 + this.mentBtnHeight
    }
  },
  onLoad() {
    const sysInfo = uni.getSystemInfoSync()
    const menuBtnInfo = uni.getMenuButtonBoundingClientRect()
    this.statusBarHeight = sysInfo.statusBarHeight
    this.menuBtnTop = menuBtnInfo.top
    this.mentBtnHeight = menuBtnInfo.height
  }
}