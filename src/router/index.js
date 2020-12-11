import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import AppIndex from "../home/AppIndex";
import Login from "../components/Login";
import App from "../App";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 默认进入 hello world
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex
    }


  ]
})
