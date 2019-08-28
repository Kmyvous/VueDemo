<template>
  <div class="goods-list">
    <!-- :to="'/home/goodsinfo/infoId=' + item.id" -->
    <div class="goods-info" v-for="(item) in goodslist" :key="item.id" @click="goDaile(item.id)">
      <van-image width="100%" height="160px" :src="item.img_url" alt="" lazy-load v-slot:loading >
        <van-loading color="#2980b9" size="30" />
      </van-image>
      <div class="txt">
        <h1>{{ item.title }}</h1>
      </div>
      <div class="price">
        <span class="now">￥{{ item.sell_price }}&nbsp;&nbsp;</span>
        <del class="old">￥{{ item.market_price }}</del>
      </div>
      <div class="sell">
        <span>热卖中</span>
        <span>剩{{ item.stock_quantity }}件</span>
      </div>
    </div>
    <mt-button plain size="large" type="danger" @click.native="loading">加载更多</mt-button>
  </div>
</template>
<script>
  import { Taose } from 'mint-ui'
  export default {
    data(){
      return {
        pageindex: 1,
        goodslist: [] 
      }
    },
    created() {
      this.getGoodsList()
    },
    methods: {
      // 获取商品列表数据
      getGoodsList(){
        /**
         * api: api/getgoods?pageindex=number
         * http://www.liulongbin.top:3005/api/getgoods?pageindex=1
         */
        let url = 'api/getgoods?pageindex=' + this.pageindex
        this.axios(url).then(response => {
          if(response.data.status === 0){
            console.log(response.data.message);
            this.goodslist = this.goodslist.concat(response.data.message);
          }
          else{
            Taose({
              message: 'error',
              duration: 2000
            })
          }
        })
      },
      loading(){
        this.pageindex += 1;
        this.getGoodsList()
      },
      goDaile(id){
        console.log(this);
        /**
         * this.$route: 是路由参数对象，所有路由中的参数（params、query...）
         * this.$router: 是路由导航对象，用它可以方便的使用 js 代码实现路由的 前进、后退，跳转到新的 url 地址
         * 
         * 编程式导航： 如下
         * 
         * 基本用法（传递字符串）： 
         *    this.$router.push('/home/goodsinfo/infoId=' + id)
         * 传递对象： 
         *    this.$router.push({ path: '/home/goodsinfo/infoId=' + id })
         * 传递 命名的路由： 
         *    this.$router.push({ name: 'goodsinfo', params: { id: id } })
         */
        this.$router.push({ name: 'goodsinfo', params: { id: id } })
      }
    },
  }

</script>
<style lang="scss" scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 8px;
    box-sizing: border-box;

    .goods-info {
      width: 49%;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px #ccc;
      margin-bottom: 8px;
      border-radius: 2px;


      .txt {
        h1 {
          font-size: 14px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .price {
        .now {
          font-size: 16px;
          font-weight: bold;
          color: red;
        }

        .old {
          font-size: 12px;
          color: #888
        }
      }

      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #888;
        line-height: 30px;
      }
    }
  }

</style>
