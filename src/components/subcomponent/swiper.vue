<template>
  <div>
    <mt-swipe :auto="2000" >
      <mt-swipe-item v-for="(item) in LunBoTuList" :key="item.id">
        <img :src="item.img" alt="" :class="{ 'wid': isfull }">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
  export default {
    props: [ 'LunBoTuList', 'isfull' ]
  }

</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 140px;

  .mint-swipe-item {
    text-align: center;

    img {
      height: 100%;
    }
  }
}
.wid{
  width: 100%
}
</style>
