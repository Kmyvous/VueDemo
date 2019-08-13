<template>
    <div class="container">
        <hr>
        <div class="title">
            <h4>发表评论</h4>
        </div>
        <div class="content">
            <textarea name="" id="" maxlength="150" class="txtarea" placeholder="请输入你要发表的评论" v-model="commentsContent">

            </textarea>
        </div>
        <div class="button">
            <mt-button type="primary" size="large" @click.native="postComment">评论</mt-button>
        </div>
        <div class="list">
            <div class="cmt-list" v-for="(item, index) in cmtList" :key="index">
                <div class="cmt-title">
                    第{{ index + 1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dataFormat }}
                </div>
                <div class="cmt-content">
                    {{ (item.content === "undefined")||(item.content === "") ? "该用户的评论被官方菌吃掉啦" : item.content }}
                </div>
            </div>

            <mt-button plain size="large" type="danger" @click.native="loading">加载更多</mt-button>
        </div>
        <br><br><br>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            pageindex: 1,
            cmtList: [],
            commentsContent: ''
        }
    },
    props: [ 'artid' ],
    created(){
        this.getCommentList()
    },
    methods: {
        // 接口地址：http://www.liulongbin.top:3005/api/getcomments/:artid?pageindex=1
        getCommentList(){
            const _url = 'api/getcomments/'+ this.artid +'?pageindex='+ this.pageindex +''
            // console.log(_url);
            this.axios.get(_url).then(response =>{
                const _sta = response.data.status;
                const _msg = response.data.message;
                // console.log(_msg);
                if(_sta === 0){
                    /**
                     * 需求：加载第二页以及更多页数据，是需要将数组中的数据进行拼接的
                     * 所以要用 js 中的 concat() 方法
                     * 将后面的数据 拼接上 前面的数据
                     * */ 
                    this.cmtList = this.cmtList.concat(_msg)
                }else{
                    Toast({
                        message: 'ERROR',
                        duration: 2000
                    })
                }
            })
        },
        loading(){
            this.pageindex += 1;
            this.getCommentList()
        },
        postComment(){
            // 校验 commentContent 内容是否为空
            if(this.commentsContent.trim().length === 0){
                return Toast({
                    message: "评论内容不能为空",
                    duration: 2000
                })
            }
            /**
             * 发表评论的 url 地址：http://www.liulongbin.top:3005/api/postcomment/:artid
             * 请求方式 Post
             * 返回数据 JSON 格式 
             * status: 0 => 成功
             */
            const _postUrl = 'api/postcomment/'+ this.$route.params.id +''
            var cmtcon = this.commentsContent;
            var cmtlist = this.cmtList;
            this.axios.post(_postUrl, {content: this.commentsContent.trim()}).then(function(response){
                if(response.data.status === 0){
                    var cmt = {
                        user_name: "匿名用户",
                        add_time: Date.now(),
                        content: cmtcon
                    };
                    cmtlist.unshift(cmt);
                    cmtcon = ''
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.container{
    position: relative;
    .title{
        width: 100%;
    }
    .content{
        width: 100%;
        margin-top: 20px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        .txtarea{
        width: 100%;
        height: 100px;
        font-size: 14px;
        margin: 6px 0 0 0;
        border: none;
        outline: none;
        resize: none;
        }
    }
    .content::before{
        content: "";
        position: absolute;
        width: 0;
        border: 16px solid;
        border-color: transparent transparent #ccc transparent;
        transform: translate(50%, -100%)
    }
    .content::after{
        content: "";
        position: absolute;
        width: 0;
        left: 0;
        margin: 2px 0 0 1px;
        border: 16px solid;
        border-color: transparent transparent white transparent;
        transform: translate(50%, -100%)
    }
    .button{
        width: 100%;
        margin: 6px 0 20px 0;
    }
    .list{
        .cmt-list{
            margin: 5px 0;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #ecf0f1;
            padding: 0 0 2px 0;
            .cmt-title{
                font-size: 14px;
                line-height: 30px;
                background-color: #ecf0f1;
                color: #707070;
                padding: 0 4px;
            }
            .cmt-content{
                font-size: 14px;
                line-height: 18px;
                text-indent: 2em;
                margin: 8px 0;
            }
        }
    }
}
</style>