<template>
  <div class="shopCartContainer">
    <van-stepper v-model="num" integer input-width="30px" button-size="25px" min="1" :max="stock_quantity" disable-input @change="countChanged" />
  </div>
</template>
<script>
export default {
  data(){
    return {
      num: this.initCount,
    }
  },
  props: [ 'stock_quantity', 'initCount', 'goodsId' ],
  methods: {
    countChanged(){
      /**
       * 当数量改变时 还需要将商品数量同步到 localStorage 中
       */
      this.$store.commit('upDataGoodsCount', {
        id: this.goodsId,
        count: this.num
      })
    }
  },
}
</script>
<style lang="scss">
  .shopCartContainer{
    max-width: 150px;
    margin: 0 10px;

    .van-stepper__input{
      padding: 10px 0;
//       .van-stepper__input {
//     box-sizing: border-box;
//     margin: 0 2px;
//     padding: 10px 0;
//     color: #323233;
//     font-size: 14px;
//     text-align: center;
//     vertical-align: middle;

// }
    }
  }
</style>