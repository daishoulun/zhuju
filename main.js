import App from './App'
import './style/theme.scss'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import { showToast } from './utils/index.js'
Vue.config.productionTip = false
Vue.prototype.$showToast  = showToast
App.mpType = 'app'
const app = new Vue({
  ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif