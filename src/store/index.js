import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: localStorage.getItem('userToken') || '',
  },
  getters: {
    USER_TOKEN: state => {
      return state.userToken
    }
  },
  mutations: {
    SET_USER_TOKEN: (state, payload) => {
      state.userToken = payload
      localStorage.setItem('userToken', payload)
    }
  },
  actions: {
    SET_USER_TOKEN: (context, payload) => {
      context.commit('SET_USER_TOKEN', payload)
    }
  },
  modules: {
  }
})
