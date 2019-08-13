<template>
  <div class="newsinfo-container">
      <!-- 内容区 -->
    <h1>{{ newsinfo.title }}</h1>
    <p class='mui-ellipsis'>
      <span>发布时间：{{ newsinfo.add_time | dataFormat }}</span>
      <span>阅读：<span>{{ newsinfo.click }}</span>次</span>
    </p>
    <div v-html="newsinfo.content" class="content"></div>

    <!-- 评论区 -->
    <comment :artid="this.id"></comment>
  </div>
</template>
<script>
  import comment from '../subcomponent/comment'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        id: '',
        newsinfo: {}
      }
    },
    created() {
      this.routeParams(),
        this.getNewsInfo()
    },
    methods: {
      routeParams() {
        this.id = this.$route.params.id
      },
      getNewsInfo() {
        const _url = 'api/getnew/' + this.id
        //   console.log(_url);
        this.axios.get(_url).then(response => {
          const _status = response.data.status;
          const _data = response.data.message[0];
          if (_status === 0) {
              this.newsinfo = _data
          } else {
            Toast({
              message: 'ERROR',
              duration: 2000
            })
          }
        })
      }
    },
    components: {
      comment: comment,
    }
  }

</script>
<style lang="scss" scoped>
  .newsinfo-container {
    margin: 5px;
    box-sizing: border-box;

    h1 {
      font-size: 16px;
      text-align: center;
      //   color: #e74c3c
    }

    .mui-ellipsis {
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc
    }

    .content{
        line-height: 30px;
        margin: 10px;
    }
  }

</style>
