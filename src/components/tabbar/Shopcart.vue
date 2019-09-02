<template>
  <div class="shopcart-list">
    <div class="shopcart">
      <div class="shopping" v-for="(item, index) in shopcartlist" :key="item.id">
        <mt-switch v-model="$store.getters.getSelected[item.id]" @change="selectedChanged(item.id, $store.getters.getSelected[item.id])"></mt-switch>
        <img :src="item.thumb_path" alt="">
        <div class="info">
          <h1 class="info-txt">{{ item.title }}</h1>
          <div class="info-shop">
            <span>￥{{ item.sell_price }}</span>

            <!-- 如何从购物车中获取到 商品数量 -->
            <!-- 1. 我们可以先创建一个空对象，然后循环商品购物车中的所有商品，把当前循环的这个商品的 id 作为对象的属性名，把这个商品的 count 作为对象的属性值，当循环完了所有的商品之后就可以得到一个对象：{ id : count, id : count ... }-->
            <Stepper :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></Stepper>
            <a @click.prevent="removeData(item.id, index)">删除</a>
          </div>
        </div>
      </div>
    </div>
    <div class="shopsettlement">
      <div class="settlement">
        <p class="hang">总计（不含运费）</p>
        <p class="hang">
          已选择商品<span class="red">{{ $store.getters.getGoodsCountAndPrice.count }}</span>件，总价<span class="red">￥{{ $store.getters.getGoodsCountAndPrice.price }}</span>元
        </p>
      </div>
      <mt-button type="danger" size="small">
        去结算
      </mt-button>
    </div>
    <p>{{ $store.getters.getSelected }}</p>
  </div>
</template>
<script>
  import Stepper from '../Good/ShopCart_number.vue'
  import Toast from 'mint-ui'
  export default {
    data() {
      return {
        shopcartlist: [],
        value: []
      }
    },
    created() {
        this.getShopCartList()
    },
    methods: {
        getShopCartList(){
            /**
             * http://www.liulongbin.top:3005/api/goods/getshopcarlist/:ids
             * 思路：
             * 1. 获取到 state 中的所有商品的 id，拼接为一个以逗号隔开的字符串
             * 2. 如果购物车中没有商品，则直接返回，不需要请求数据，否则会报错
             */
            var idArr = [];
            this.$store.state.shoppingCart.forEach(item => idArr.push(item.id));
            if(idArr.length <= 0){
                return;
            }
            this.axios('api/goods/getshopcarlist/' + idArr.join(',')).then(response => {
                if(response.data.status === 0){
                    // console.log(response.data.message);
                    this.shopcartlist = response.data.message;

                }else{
                    Toast({
                        message: 'error',
                        duration: 2000
                    })
                }
            })
        },
        removeData(shopId, index){
          this.shopcartlist.splice(index, 1); // splice() 数组删除函数
          this.$store.commit('removeShopCart', shopId);
        },
        selectedChanged(id, val){
          this.$store.commit('selectedChanged', { id:id, selected:val })
        }
    },
    components: {
      Stepper
    }
  }

</script>
<style lang="scss" scoped>
  .shopcart-list {
    // background: #e2e2e2;

    .shopcart {


      .shopping {
        margin: 6px;
        box-shadow: 0 0 8px #ccc;
        background: #fff;
        display: flex;
        align-items: center;
        padding: 14px 10px;
        box-sizing: border-box;

        img {
          width: 80px;
          height: 80px;
          margin: 0 10px;
        }

        .info {

          .info-txt {
            width: 200px;
            font-size: 15px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }

          .info-shop {
            display: flex;
            align-items: center;

            span {
            display: inline-block;
            width: 50px;
              font-size: 14px;
              color: red;
              font-weight: bold;
            }

            a {
              font-size: 14px;
            }
          }
        }
      }
    }

    .shopsettlement {
      margin: 6px;
      box-shadow: 0 0 8px #ccc;
      background: #ffffff;
      padding: 10px 10px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .hang{
        margin: 10px 0;

        .red{
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
      }

    }
  }

</style>
