<template>
  <div class="goods">
    <!-- 轮播图区域 -->
    <div class="lunbotu">
      <Swiper :LunBoTuList="list" :isfull="false"></Swiper>
    </div>

    <!-- 商品信息区域 -->
    <div class="goodsinfo">
      <p>{{ goodsInfoList.title }}</p>
      <van-divider :style="{ borderColor: '#999', margin: '0' }"></van-divider>
      <div class="info-div">
        <p>
          <span>市场价：<del>￥{{ goodsInfoList.market_price }}</del></span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>销售价：<span>￥{{ goodsInfoList.sell_price }}</span></span>
        </p>
        <div class="info-setpper">购买数量：<Setpper @getCount="getCountChanged" :stock_quantity="goodsInfoList.stock_quantity"></Setpper></div>
      </div>
      <div class="info-btn">
        <mt-button type="primary" size="small">立即购买</mt-button>
        <mt-button type="danger" size="small" @click.native="add_goods">加入购物车</mt-button>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="goodsparameter">
      <p>商品参数</p>
      <van-divider :style="{ borderColor: '#999', margin: '0' }"></van-divider>
      <div class="info-div">
        <p>商品货号：{{ goodsInfoList.goods_no }}</p>
        <p>库存情况：{{ goodsInfoList.stock_quantity }}</p>
        <p>上架时间：{{ goodsInfoList.add_time | dataFormat }}</p>
      </div>
      <div class="goodsparameter-btn">
        <mt-button type="danger" plain @click="goDesc(imgId)">图文介绍</mt-button>
        <mt-button type="danger" plain @click="goComment(imgId)">商品评论</mt-button>
      </div>
      
    </div>


  </div>
</template>
<script>
import { Toast  } from 'vant'
import Swiper from '../subcomponent/swiper.vue'
import Setpper from './Goodsinfo_number.vue'
export default {
  data(){
    return {
      imgId: this.$route.params.id,
      list: [],
      value: 1,
      goodsInfoList: [],
      selectdCount: 1
    }
  },
  created(){
    this.getPhotoList(),
    this.getGoodsInfo()
  },
  methods: {
    getPhotoList(){
      // http://www.liulongbin.top:3005/api/getthumimages/:imgId
      let _url = 'api/getthumimages/' + this.imgId
      this.axios(_url).then(response => {
        if(response.data.status === 0){
          // console.log(response.data.message);
          /**
           * 先循环轮播图数据的每一项，为 item 添加一个 img 属性，因为轮播图组件中，只认识 item.img 属性；
           */
          response.data.message.forEach(item => {
            item.img = item.src
          })
          this.list = response.data.message
        }else{
          Toast ({
            message: 'error',
          })
        }
      })
    },
    getGoodsInfo(){
      // http://www.liulongbin.top:3005/api/goods/getinfo/:id
      let _url = 'api/goods/getinfo/' + this.imgId
      this.axios(_url).then(response => {
        if(response.data.status === 0){
          this.goodsInfoList = response.data.message[0]
        }
        else{
          Toast ({
            message: 'error',
          })
        }
      })
    },
    goDesc(goodsId){
      // 使用 编程式导航 进行跳转到图文介绍
      this.$router.push({ name: 'GoodsDesc', params: { id: goodsId } })
    },
    goComment(goodsId){
      // 使用 编程式导航 进行跳转到评论列表
      this.$router.push({ name: 'GoodsComment', params: { id: goodsId } })
    },
    add_goods(count){
      Toast ({
        message: '成功加入购物车',
        icon: 'passed',
        forbidClick: true, 
      })
    },
    getCountChanged(count){
      this.selectdCount = count;
    }
  },
  components: {
    Swiper,
    Setpper
  }
}
</script>
<style lang="scss" scoped>
  .goods {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-color: rgba($color: #e2e2e2, $alpha: 0.5);

    .lunbotu {
      width: 100%;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #ccc;
      background-color: #fff;
      margin: 6px;
    }

    .goodsinfo {
      width: 100%;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #ccc;
      background-color: #fff;
      margin: 6px;

      >p {
        font-size: 20px;
        font-weight: bold;
        line-height: 40px;
        margin: 0 16px;
      }

      .info-div {
        margin: 0 16px;

        > p{
          line-height: 30px;

          span:nth-child(2) > span{
            color: red;
            font-size: 16px;
            font-weight: bold;
          }
        }
        .info-setpper {
          font-size: 14px;
          color: #8f8f94;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
      .info-btn{
        margin: 10px 16px;
      }
    }

    .goodsparameter {
      width: 100%;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #ccc;
      background-color: #fff;

      margin: 6px;

      >p {
        font-size: 20px;
        font-weight: bold;
        line-height: 40px;
        margin: 0 16px;
      }

      .info-div {
        margin: 0 16px;

        > p{
          line-height: 30px;

          span:nth-child(2) > span{
            color: red;
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
      .goodsparameter-btn{
        margin: 0 16px;

        .mint-button--danger.is-plain{
          width: 100%;
          margin-bottom: 15px;
        }
      }
      
    }
  }
</style>