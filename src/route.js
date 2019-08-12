import VueRouter from 'vue-router'

import Home from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import Shopcart from './components/tabbar/Shopcart.vue'
import Search from './components/tabbar/Search.vue'

import News from './components/news/NewsList.vue'

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/member', component: Member },
        { path: '/shopcart', component: Shopcart },
        { path: '/search', component: Search },
        { path: '/home/newslist', component: News },
    ],
    linkActiveClass: 'mui-active'
})

export default router