import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Home,
    alias: ['/', '/home'],
    beforeEnter(to, from, next) {
      if (store.getters.user_authenticated) {
        next('/painel')
      } else {
        next()
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
