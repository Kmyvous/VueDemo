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
import { Header, Swipe, SwipeItem, Button, Checklist, Switch } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.component(Checklist.name, Checklist)
Vue.component(Switch.name, Switch)

// 按需引入 MUI
import './lib/dist/css/mui.min.css'
import './lib/dist/css/icons-extra.css'
import './lib/dist/fonts/mui-icons-extra.ttf'


// 导入自定义的 router 模块
import router from './route.js'

// 按需导入 vant UI
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
import {
  Tab,
  Tabs,
  Skeleton,
  Lazyload,
  Loading,
  Image,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Divider,
  Stepper,
  Icon,
  Checkbox, CheckboxGroup,Cell,CellGroup
} from 'vant';
Vue.use(Tab).use(Tabs).use(Skeleton).use(Lazyload).use(Loading).use(Image).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Divider).use(Stepper).use(Icon).use(Checkbox).use(CheckboxGroup).use(Cell).use(CellGroup)



// 导入 vue-preview 缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// axios 配置全局 根域名
Vue.axios.defaults.baseURL = 'http://www.liulongbin.top:3005/';

//  全局导入 vuex 
import Vuex from 'vuex'
Vue.use(Vuex)

var cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]')
var store = new Vuex.Store({
  /**
   * 总结：
   * 1. state 中的数据不能直接修改，如果想要修改，必须通过 mutations 
   * 2. 如果组件想要直接从 state 上获取数据，需要：this.$store.state.*** ( * 代表的是 state 中的数据 )
   * 3. 如果组件想要修改数据，必须使用 mutations 提供的方法，需要通过 this.$store.commit('方法名', 唯一参数)
   * 4. 如果 store 中 state 上的数据，在对外提供使用时，需要做一层包装，那么推荐使用 getters，如果需要使用 getters， 则用 this.$store.getters.*** 的形式 ( * 代表的是 getters 中的方法名 )
   */

  // state 可以想象成 data
  state: {
    shoppingCart: cart
  },
  mutations: {
    addToShoppingCart(state, info){
      /**
       * 点击 加入购物车 然后将商品信息保存到 store 中的 shoppingCart 上
       * 思路：
       * 1. 如果已经加入过购物车了，只需要更新 商品数量
       * 2. 如果没有加入过购物车，就需要将 商品数据 push 到 shoppingCart 中
       */
      var  flag = false;
      state.shoppingCart.some(item => {  
        if(item.id === info.id){
          item.count += parseInt(info.count);
          flag = true;
          return true;
        }
      })
      if(!flag){
        state.shoppingCart.push(info);
      }
      // 更新完了 shoppingCart 之后，将数据保存到 本地存储 localStorage 中，防止刷新网页后，就没有数据的情况
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart))
    },
    upDataGoodsCount(state, info){
      state.shoppingCart.forEach(item => {
        if(item.id === info.id){
          item.count = parseInt(info.count)
          return true
        }
      })
      // 修改完了最新的数量之后，还需要重新保存到 shoppingCart 中
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart))
    },
    removeShopCart(state, id){
      // 根据 id 删除对应的商品数据
      state.shoppingCart.some((item, i) => {
        if(item.id === id){
          state.shoppingCart.splice(i, 1);
          console.log('object');
          return true;
        }
      })
      // 将删除完毕之后的数据同步到本地存储中
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart))
    },
    selectedChanged(state, info){
      state.shoppingCart.forEach(item => {
        if(item.id === info.id){
          item.selected = info.selected;
          return true;
        }
      })
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart))
    }
  },
  getters: {
    /**
     * 注意：这里的 getters 只负责对外提供数据，不负责修改数据
     * 注意：如果想要修改 state 的数据，请在 mutations 中去进行操作
     * getters 中的所有都是一个 function ，它的第一个参数只能是 state ，
     * ( 相当于 计算属性，或者 相当于 filters )
     */
    getAllCount(state){
      var num = 0;
      state.shoppingCart.forEach(item => {
        num += item.count;
      })
      return num;
    },
    getGoodsCount(state){
      var _count = {}
      state.shoppingCart.forEach(item => {
        _count[item.id] = item.count
      })
      return _count
    },
    getSelected(state){
      var o = {}
      state.shoppingCart.forEach(item => {
        o[item.id] = item.selected;
      })
      return o;
    },
    getGoodsCountAndPrice(state){
      let o = {
        count: 0,
        price: 0
      };
      state.shoppingCart.forEach(item => {
        if(item.selected === true){
          o.count += item.count;
          o.price += (item.price * item.count);
        }
      })
      return o;
    }
  },
})

new Vue({
  el: '#app',
  render: c => c(App),
  router,
  store // 将 Vuex 创建的 store 挂载到 Vue 实例上
})