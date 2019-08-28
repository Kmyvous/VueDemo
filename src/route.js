import VueRouter from 'vue-router'

import Home from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import Shopcart from './components/tabbar/Shopcart.vue'
import Search from './components/tabbar/Search.vue'

import News from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'

import PhotoList from './components/photo/photolist.vue'
import PhotoInfo from './components/photo/photoinfo.vue'
import GoodsList from './components/Good/GoodList.vue'
import GoodsInfo from './components/Good/GoodsInfo.vue'
import GoodsDesc from './components/Good/GoodsDesc.vue'
import GoodsComment from './components/Good/GoodsComment.vue'

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/member', component: Member },
        { path: '/shopcart', component: Shopcart },
        { path: '/search', component: Search },
        { path: '/home/newslist', component: News },
        { path: '/home/newslist/newsinfo/list:id', component: NewsInfo },
        { path: '/home/photolist', component: PhotoList },
        { path: '/home/photolist/photoinfo/:id', component: PhotoInfo },
        { path: '/home/goodslist', component: GoodsList },
        { path: '/home/goodslist/goodsinfo/infoId=:id', component: GoodsInfo, name:'goodsinfo' },
        { path: '/home/goodslist/goodsinfo/infoId=:id/goodsdesc/:id', component: GoodsDesc, name: 'GoodsDesc' },
        { path: '/home/goodsinfo/goodscomment/:id', component: GoodsComment, name: 'GoodsComment' }
    ],
    linkActiveClass: 'mui-active'
})

export default router