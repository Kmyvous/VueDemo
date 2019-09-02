<template>
  <div class="div-container">
    <van-stepper v-model="num" integer input-width="60px" button-size="30px" min="1" :max="stock_quantity" @change="countChanged" />
  </div>
</template>
<script>
export default {
  data(){
    return {
      num: 1,
    }
  },
  props: [ 'stock_quantity' ],
  methods: {
    countChanged(){
      this.$emit("getCount", parseInt(this.num))
    }
  },
}
</script>
<style lang="scss" scoped>
  .div-container{
    max-width: 150px;
    margin: 0 4px;
  }
</style>