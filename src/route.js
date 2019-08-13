import VueRouter from 'vue-router'

import Home from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import Shopcart from './components/tabbar/Shopcart.vue'
import Search from './components/tabbar/Search.vue'

import News from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/member', component: Member },
        { path: '/shopcart', component: Shopcart },
        { path: '/search', component: Search },
        { path: '/home/newslist', component: News },
        { path: '/home/newslist/newsinfo/list:id', component: NewsInfo },
    ],
    linkActiveClass: 'mui-active'
})

export default router