import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router