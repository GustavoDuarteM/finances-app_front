import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import { mainAxiosInstance, authAxiosInstance } from './backend/axios'
import vuetify from './plugins/vuetify'
import DatetimePicker from 'vuetify-datetime-picker'

Vue.use(DatetimePicker)

Vue.use(VueAxios, {
  main: mainAxiosInstance,
  auth: authAxiosInstance
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
