import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/style.css'

Vue.config.productionTip = false

export const baseUrl = "http://lifestealer86.ru/api-shop"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

