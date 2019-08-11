<template>
  <div>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="(item) in list" :key="item.id">
        <img :src="item.img" alt="" class="img">
      </mt-swipe-item>
    </mt-swipe>

    <!-- 六宫格区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/icon01.png" alt="" class="mu-icon">
          <div class="mui-media-body">新闻资讯</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/icon02.png" alt="" class="mu-icon">
          <div class="mui-media-body">图片分享</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/icon03.png" alt="" class="mu-icon">
          <div class="mui-media-body">商品购买</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/icon04.png" alt="" class="mu-icon">
          <div class="mui-media-body">留言反馈</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/icon05.png" alt="" class="mu-icon">
          <div class="mui-media-body">视频专区</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/icon06.png" alt="" class="mu-icon">
          <div class="mui-media-body">联系我们</div>
        </a></li>
    </ul>
  </div>
</template>

<script>
  import {
    Toast
  } from 'mint-ui';
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
        const _url = 'http://www.liulongbin.top:3005/api/getlunbo'
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
  }

</script>

<style lang="scss" scoped>
  .mint-swipe {
    height: 140px;
  }

  .img {
    width: 100%;
    height: 100%;
  }

  .mui-grid-view.mui-grid-9 {
    background-color: white;
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: none;
    img{
        width: 40px;
        height: 40px;
    }
    .mui-media-body{
        font-size: 14px;
    }
  }

</style>
