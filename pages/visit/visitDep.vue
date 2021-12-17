<template>
	<view class="content">
		<u-sticky>
			<view class="search_hd u-p-l-30 u-p-r-30">
				<u-search 
					class="u-p-t-20 u-p-b-20" 
					placeholder="请输入科室名称" 
					v-model="keyword" 
					:show-action="false" 
					input-align="center"
					@change="$u.debounce(search, 500)">
				</u-search>
				<u-line color="#F3F3F3" :hair-line="false"></u-line>	
			</view>	
		</u-sticky>
		<view class="u-p-l-30 u-p-r-30">
			<template v-for="item in list">
				<view :key="item.id" class="u-flex u-row-between u-p-t-20 u-p-b-20" @click="selectDep(item)">
					<text>{{item.name}}</text>
					<text v-if="select_ids.indexOf(item.id) == -1" class="custom-icon">&#xe668;</text>
					<text v-else class="custom-icon active">&#xe601;</text>
				</view>
				<u-line :hair-line="false"></u-line>
			</template>
			<u-empty class="u-m-t-80" v-show="empty_tag" mode="search"></u-empty>
		</view>
		<view class="fix_bt_btn u-flex u-p-30">
			<u-button v-show="!this.$Route.query.type" class="add_btn u-m-r-20" shape="circle" @click="toAddDep('/pages/authentication/departments','visit')">
				<text class="custom-icon u-font-40 u-m-r-10" :style="{color:'#5870FE'}">&#xe728;</text>
				新增
			</u-button>
		 	<u-button class="selected u-flex-1" type="primary" shape="circle" hover-class="none" @click="backPage">确定</u-button>
		</view>
	</view>
</template>
<script>
	import { serveDeps } from '@/api/common.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default{
		mixins: [MescrollMixin],
		data(){
			return{
				keyword:'',
				list:[],
				select_list:[],
				select_ids:[],
			}
		},
		onLoad() {
			// 判断来源
			let type = this.$Route.query.type;
			if(type&&type == 'visit_record_search'){
				if(!this.visit_search_condition.departs){
					return
				}
				this.select_list = [...this.visit_search_condition.departs];
			} else {
				if(!this.visit_checkout.departs){
					return
				}
				this.select_list = [...this.visit_checkout.departs];	
			}
			this.select_ids = this.select_list.length !== 0?this.select_list.map(item => {
				return item.id
			}):[]
		},
		onShow() {
			this.getServeDeps()
		},
		methods:{
			async getServeDeps(){
				let params = {
					hospital_id:this.$Route.query.hospital_id,
					keywords:this.keyword
				}
				let res = await serveDeps(params);
				this.list = res.data.list;
				if(this.list.length == 0){
					this.empty_tag = true;
				} else {
					this.empty_tag = false;
				}
			},
			search(){
				this.list = [];
				this.getServeDeps();
			},
			// 选择适科室
			selectDep(data){
				let num = 0;
				let len = this.select_list.length;
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
				this.select_ids = this.select_list.length !== 0?this.select_list.map(item => {
					return item.id
				}):[];
				let type = this.$Route.query.type;
				if(type&&type == 'visit_record_search'){
					this.$u.vuex('visit_search_condition.departs',[...this.select_list]);
				} else {
					this.$u.vuex('visit_checkout.departs',[...this.select_list]);
				}
			},
			toAddDep(url,type){
				let hospital_id = this.$Route.query.hospital_id;
				this.$Router.push({
					path:url,
					query:{
						hospital_id,
						type
					}
				})
			},
			downCallback(){
			},
			toHosDetail(){
				
			},
			backPage(){
				this.$Router.back();
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content{
		padding-bottom: 140rpx;
	}
	.search_hd{
		background-color: $color-xf;
	}
	.custom-icon{
		font-size: 48rpx;
		color: $color-x6;
	}
	.active{
		color: $color-31;
	}
	.selected{
		background-color: $color-31;
	}
	.add_btn{
		width: 250rpx;
		margin: 0;
		color: $color-31;
		
	}
</style>
