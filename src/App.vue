<template>
  <div style="overflow-x:hidden;">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="muvous">
      <span slot="left" @click="toBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- 中间 路由 区域 -->
    <transition name="fade" mode="out-in">
      <router-view class="margin-content"></router-view>
    </transition>

    <!-- 底部 Footer 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcart">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">{{ $store.getters.getAllCount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>

  </div>
</template>
<script>
export default {
  data(){
    return {
      flag: false
    }
  },
  created(){
    this.flag = ( this.$route.path === '/home' ) ? false : true;
  },
  methods: {
    toBack(){
      /**
       * 点击返回上一页面
       * 使用 路由历史 操作
       * 注意：返回到首页时，隐藏此按钮
       */
      this.$router.go(-1)
    }
  },
  watch:{
    '$route.path':function(valNow){
      if(valNow === '/home'){
        this.flag = false;
      }
      else{
        this.flag = true;
      }
    }
  }
}
</script>
<style scoped>

  .margin-content {
    padding: 40px 0 50px 0;
  }

  .fade-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }
</style>
