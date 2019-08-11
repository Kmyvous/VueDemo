// 入口文件

import Vue from 'vue' // 导入 vue 模块

import VueRouter from 'vue-router' // 导入 路由 vue-router 模块
Vue.use(VueRouter) 
import axios from 'axios' // 导入 axios 模块
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import App from './App.vue'

// 按需引入 mint-ui
import { Header, Swipe, SwipeItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

// 按需引入 MUI
import './lib/dist/css/mui.min.css'
import './lib/dist/css/icons-extra.css'
import './lib/dist/fonts/mui-icons-extra.ttf'

// 导入自定义的 router 模块
import router from './route.js'


new Vue({
  el: '#app',
  render: c => c(App),
  router,
})