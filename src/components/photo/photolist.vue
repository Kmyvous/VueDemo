<template>
	<div>
		<van-tabs animated ellipsis v-model="active" @click="getImagesList">
			<van-tab v-for="(item) in list" :key="item.id" :title="item.title" :name="item.id">
				<ul>
					<router-link tag="li" v-for="(item) in imageList" :key="item.id" :to="'/home/photolist/photoinfo/' + item.id">
						<van-image :src="item.img_url" alt="" lazy-load v-slot:loading class="vanimg">
							<van-loading color="#2980b9" size="30" />
						</van-image>
						<div class="mask">
							<h1 class="mask-title">{{ item.title }}</h1>
							<span class="mask-content">{{ item.zhaiyao }}</span>
						</div>
					</router-link>
				</ul>
			</van-tab>
		</van-tabs>
	</div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data(){
    return {
			active: 0,
			list: [],
			imageList: []
		}
	},
	created(){
		this.getImgCateGory()
		this.getImagesList(0	)
	},
  methods: {
    getImgCateGory(){
			// api: /api/getimgcategory
			const _url = 'api/getimgcategory'
			this.axios.get(_url).then(response=>{
				const _msg = response.data.message;
				if(response.data.status === 0){
					// console.log(response.data.message);
					_msg.unshift({ title: '全部', id: 0 });
					this.list = _msg;
				}
				else{
					Toast({
						message: 'ERROR',
						duration: 2000
					})
				}
			})
		},
		getImagesList(cateid){
			// api: api/getimages/:cateid
			console.log(cateid);
			var _url2 = 'api/getimages/' + cateid
			this.axios.get(_url2).then(response => {
				var res = response.data.message;
				if(response.data.status === 0){
					this.imageList = res;
				}
				else{
					Toast({
						message: 'ERROR',
						duration: 2000
					})
				}
			})
		}
  },
}
</script>
<style scoped>
	ul > li{
		margin: 10px;
		position: relative;
		border-radius: 10px;
		box-sizing: border-box;
		overflow: hidden;	
	}
	ul > li .vanimg{
		width: 100%;
		vertical-align: middle
	}
	.mask{
		max-height: 120px;
		padding: 4px;
		background-color: rgba(0,0,0,.5);
		color: #fff;
		position: absolute;
		z-index: 9;
		bottom: 0;
		text-align: left;
		overflow: hidden;
		vertical-align: middle;
		box-sizing: border-box
	}
	.mask .mask-title{
		font-size: 14px;
	}
	.mask .mask-content{
		font-size: 13px;
	}
</style>