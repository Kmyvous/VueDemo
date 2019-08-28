<template>
  <div class="goodsComment-container">
    <Comment :artid="id"></Comment>
  </div>
</template>
<script>
import Comment from '../subcomponent/comment.vue'
export default {
  data(){
    return {
      id: this.$route.params.id
    }
  },
  methods: {
    
  },
  components: {
    Comment
  }
}
</script>
<style lang="scss" scoped>
  .goodsComment-container{
    margin: 6px;
  }
</style>