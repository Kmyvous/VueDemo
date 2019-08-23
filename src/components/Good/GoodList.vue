<template>
  <div class="goods-list">
    <div class="goods-info">
      <img src="../../images/bizhi.jpeg" alt="" width="100%">
      <div class="txt">
        <h1>小米（Mi）小米Note 16G双网通版 还有很多的新手机啊</h1>
      </div>
      <div class="price">
        <span class="now">￥1999&nbsp;&nbsp;</span>
        <del class="old">￥2199</del>
      </div>
      <div class="sell">
        <span>热卖中</span>
        <span>剩60件</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 8px;
  box-sizing: border-box;
  .goods-info{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px #ccc;
    margin-bottom: 8px;
    border-radius: 2px;

    
    .txt{
      h1{
        font-size: 14px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .price{
      .now{
        font-size: 16px;
        font-weight: bold;
        color: red;
      }
      .old{
        font-size: 12px;
        color: #888
      }
    }
    .sell{
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #888;
      line-height: 30px;
    }
  }
}
</style>