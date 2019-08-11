// 入口文件
import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 按需引入 mint-ui
import { Header } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)

// 按需引入 MUI
import './lib/dist/css/mui.min.css'
import './lib/dist/css/icons-extra.css'
import './lib/dist/fonts/mui-icons-extra.ttf'

// 导入自定义的 router 模块
import router from './router.js'


new Vue({
  el: '#app',
  render: c => c(App),
  router,
})