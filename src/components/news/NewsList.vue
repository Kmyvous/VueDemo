<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(item) in newslist" :key="item.id">
        <router-link to="">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class='mui-ellipsis'>
              <span>发布时间：{{ item.add_time | dataFormat }}</span>
              <span>阅读：<span>{{ item.click }}</span>次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            newslist: []
        }
    },
    created(){
        this.getNewsList()
    },
    methods: {
        getNewsList(){
            // 新闻地址：http://www.liulongbin.top:3005/api/getnewslist
            const _url = 'api/getnewslist';
            this.axios.get(_url).then( response => {
                const _status = response.data.status;
                const _data = response.data.message;
                if(_status === 0){
                    // console.log(_data);
                    this.newslist = _data;
                }
                else{
                    Toast({
                        message: 'ERROR',
                        duration: 2000
                    })
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
  .mui-table-view-cell>a:not(.mui-btn).mui-active {
    background-color: #fff;
  }

  .mui-table-view {
    li {
      h1 {
        font-size: 14px;
      }

      .mui-ellipsis {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
      }
    }
  }

</style>style
