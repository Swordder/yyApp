<template>
	<view class="content u-p-l-30 u-p-r-30">
		<view v-for="item in list" :key="item.id" @click="selectTerr(item)">
			<view class="u-flex u-row-between u-p-t-20 u-p-b-20">
				<text>{{item.name}}</text>
				<text v-if="select_ids.indexOf(item.id) == -1" class="custom-icon">&#xe668;</text>
				<text v-else class="custom-icon active">&#xe601;</text>
			</view>
			<u-line :hair-line="false"></u-line>
		</view>
		<view class="btn u-p-30">
			<u-button class="selected" type="primary" shape="circle" hover-class="none" @click="backPage">确定</u-button>
		</view>
	</view>
</template>
<script>
	import { adaptions } from '@/api/common.js';
	export default{
		data(){
			return{
				list : [],
				select_list:[],
				select_ids:[],
			}
		},
		onLoad() {
			this.getList();
			// 获取选择的治疗领域
			// 判断页面来源
			let query = this.$Route.query;
			if(query.type &&query.type == 'doctor' ){
				this.select_list = [...this.doctor_info.territory];
			} else {
				this.select_list = uni.getStorageSync('serve_inner_data').territory?uni.getStorageSync('serve_inner_data').territory:[];
			}
			this.select_ids = this.select_list.length !== 0?this.select_list.map(item => {
				return item.id
			}):[];
		},
		methods:{
			async getList(){
				let params = {
					keywords:'',
					current:1,
					limit:999
				}
				let res = await adaptions(params);
				this.list = [...res.data.list];
			},
			// 选择治疗领域
			selectTerr(data){
				let query = this.$Route.query;
				let num = 0;
				let len = this.select_list.length;
				if(query.type === 'doctor'){
					this.select_list[0] = data;
				} else {
					if(len === 0){
						this.select_list.push(data)
					} else {
						this.select_list.forEach((item,index) => {
							if(item.id == data.id){
								this.select_list.splice(index,1)
							} else {
								num++
							}
							if(num == len){
								this.select_list.push(data)
							}
						})
					};	
				}
				this.select_ids = this.select_list.length !== 0?this.select_list.map(item => {
					return item.id
				}):[];
				let serve_data = uni.getStorageSync('serve_inner_data');
				if(query.type == 'doctor'){
					this.$u.vuex('doctor_info.territory',[...this.select_list]);
					return
				} else {
					uni.setStorageSync('serve_inner_data',Object.assign({},{...serve_data},{'territory':this.select_list}))
				}
				
			},
			backPage(){
				this.$Router.back();
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content{
		padding-bottom: 200rpx;
	}
	.custom-icon{
		font-size: 48rpx;
		color: $color-x6;
	}
	.active{
		color: $color-31;
	}
	.btn{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: $color-xf;
		.selected{
			background-color: $color-31;
		}
	}
</style>
