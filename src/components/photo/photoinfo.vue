<template>
    <div class="newsinfo-container">
      <!-- 标题区域 -->
      <h1>{{ list.title }}</h1>
      <p class='mui-ellipsis'>
        <span>发布时间：{{ list.add_time | dataFormat }}</span>
        <span>阅读：<span>{{ list.click }}</span>次</span>
      </p>
      <div v-html="list.content" class="content"></div>
      
      <!-- 缩略图区域 -->
      <vue-preview :slides="img_list" class="preview"></vue-preview>

      <!-- 评论子组件 -->
    <comment :artid="id"></comment>
    </div>
</template>
<script>
import comment from '../subcomponent/comment'
import { Toast } from 'mint-ui'
export default {
  data(){
    return {
      id: this.$route.params.id,
      list: {},
      img_list:[]
    }
  },
  components: {
    comment
  },
  created () {
    this.getImgInfo(),
    this.getThum()
  },
  methods: {
    getImgInfo(){
      // http://www.liulongbin.top:3005/api/getimageinfo/:imgid
      const _api = 'api/getimageinfo/' + this.id
      this.axios.get(_api).then(response => {
        var _msg = response.data.message
        if(response.data.status === 0){
          this.list = _msg[0];
        }
        else{
          Toast({
            message: 'error',
            duration: 2000
          })
        }
      })
    },
    getThum(){
      // http://www.liulongbin.top:3005/api/getthumimages/:imgId
        const _thum = 'api/getthumimages/' + this.id  
        this.axios(_thum).then(response => {
          if(response.data.status === 0){
            response.data.message.forEach(item => {
              item.w = 600;
              item.h = 400;
              item.msrc = item.src
            })
            this.img_list = response.data.message;
          }else{
            Toast({
              message: 'error',
              duration: 2000
            })
          }
        })
    }
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
      line-height: 30px;
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
        font-size: 13px;
        text-indent: 2em;
    }

    .preview{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>