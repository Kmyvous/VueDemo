<template>
  <div class="detail">
    <h4>{{ DetailList.title }}</h4>
    <hr>
    <span v-html="DetailList.content"></span>
  </div>
</template>
<script>
import Taose from 'mint-ui'
export default {
  data(){
    return {
      id: this.$route.params.id,
      DetailList: []
    }
  },
  methods: {
    getDoogsDesc() {
      // http://www.liulongbin.top:3005/api/goods/getdesc/:id
      let _url = 'api/goods/getdesc/' + this.id
      this.axios(_url).then(response => {
        if (response.data.status === 0) {
          this.DetailList = response.data.message[0]
        } else {
          Taose({
            message: 'error',
            duration: 2000
          })
        }
      })
    }
  },
  created(){
    this.getDoogsDesc()
  },
  components: {
       
  }
}
</script>
<style lang="scss">
  .detail{
    margin: 8px;

    h4{
      line-height: 30px;
    }
    img{
      width: 100%;
    }
  }
</style>