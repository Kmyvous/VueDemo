// 入口文件

import Vue from 'vue' // 导入 vue 模块

import VueRouter from 'vue-router' // 导入 路由 vue-router 模块
Vue.use(VueRouter) 

// 导入 时间格式化 插件 
import moment from 'moment'
// 定义 全局 过滤器

Vue.filter('dataFormat', function(dataStr, pattern="YYYY-MM-DD hh:mm:ss"){
  return moment(dataStr).format(pattern)
})

import axios from 'axios' // 导入 axios 模块
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import App from './App.vue'

// 按需引入 mint-ui
import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

// 按需引入 MUI
import './lib/dist/css/mui.min.css'
import './lib/dist/css/icons-extra.css'
import './lib/dist/fonts/mui-icons-extra.ttf'

// 导入自定义的 router 模块
import router from './route.js'



// axios 配置全局 根域名
Vue.axios.defaults.baseURL = 'http://www.liulongbin.top:3005/';

new Vue({
  el: '#app',
  render: c => c(App),
  router,
})