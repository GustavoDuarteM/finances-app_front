import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import { mainAxiosInstance } from './backend/axios'
import './quasar'

Vue.use(Vuex)

Vue.use(VueAxios, {
  main: mainAxiosInstance
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
