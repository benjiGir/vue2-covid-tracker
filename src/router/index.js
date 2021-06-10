import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import France from '../views/France.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/France',
    name: 'France',
    component: France
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
