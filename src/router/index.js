import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Panel from '../pages/Panel'
import Operations from '../pages/Operations'
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
  {
    path: '/painel',
    component: Panel,
    beforeEnter(to, from, next) {
      if (store.getters.user_authenticated) {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/operacoes',
    component: Operations,
    beforeEnter(to, from, next) {
      if (store.getters.user_authenticated) {
        next()
      } else {
        next(false)
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
