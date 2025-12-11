import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/style.css'

Vue.config.productionTip = false

export const baseUrl = "http://127.0.0.1/api"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

