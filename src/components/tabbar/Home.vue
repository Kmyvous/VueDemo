<template>
  <div>
    <!-- 轮播图区域 -->
    <Swiper :LunBoTuList="list" :isfull="true"></Swiper>

    <!-- 六宫格区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/icon01.png" alt="" class="mu-icon">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/icon02.png" alt="" class="mu-icon">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/icon03.png" alt="" class="mu-icon">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/icon04.png" alt="" class="mu-icon">
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/icon05.png" alt="" class="mu-icon">
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/icon06.png" alt="" class="mu-icon">
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import Swiper from '../subcomponent/swiper.vue'
  export default {
    data() {
      return {
        list: []
      }
    },
    created() {
      this.getLunBoTu()
    },
    methods: {
      getLunBoTu() {
        // http://www.liulongbin.top:3005/api/getlunbo
        const _url = 'api/getlunbo'
        // axios 用法： this.$http.get/post() | this.axios.get/post()
        this.axios.get(_url).then((response) => {
          //   console.log(response.data)
          const _data = response.data
          if (_data.status === 0) {
            this.list = _data.message
          } else {
            Toast({
              message: 'ERROR',
              duration: 2000
            })
          }
        })
      },
    },
    components: {
      Swiper
    }
  }

</script>

<style lang="scss" scoped>
  

  .mui-grid-view.mui-grid-9 {
    background-color: white;
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: none;

    img {
      width: 40px;
      height: 40px;
    }

    .mui-media-body {
      font-size: 14px;
    }
  }

</style>
