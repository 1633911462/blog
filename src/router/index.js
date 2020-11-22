import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/index'
import life from '@/views/life'
import study from '@/views/study'
import time from '@/views/time'
import aboutMe from '@/views/aboutMe'
import message from '@/views/message'
import root from '@/views/root/index'
import login from '@/views/root/login'
import xx from '@/views/xx'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/life',
    name: 'life',
    component: life
  },
  {
    path: '/study',
    name: 'study',
    component: study
  },
  {
    path: '/time',
    name: 'time',
    component: time
  },
  {
    path: '/aboutMe',
    name: 'aboutMe',
    component: aboutMe
  },
  {
    path: '/message',
    name: 'message',
    component: message
  },
  {
    path: '/root',
    name: 'root',
    components: {
      root: root
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      login: login
    }
  },
  {
    path: '/xx/:id',
    name: 'xx',
    component: xx
  }
]

const router = new VueRouter({
  routes
})

export default router
