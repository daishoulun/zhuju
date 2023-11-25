import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
    avatar: '../../static/user-header.png',
    userInfo: {
      img: '../../static/user-header.png'
    }
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_USER_IMG(state, img) {
      state.avatar = img
    }
  },
  actions: {
    getUserInfo({ commit }, data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('SET_USER_INFO', {  })
        }, 300)
      })
    }
  }
})

export default store