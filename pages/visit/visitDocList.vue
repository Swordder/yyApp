<template>
	<view class="content">
		<u-sticky>
			<view class="search_hd u-p-l-30 u-p-r-30">
				<u-search 
					class="u-p-t-20 u-p-b-20" 
					placeholder="请输入医生姓名" 
					v-model="keyword" 
					:show-action="false" 
					input-align="center"
					@change="$u.debounce(search, 500)">
				</u-search>
				<u-line color="#F3F3F3" :hair-line="false"></u-line>	
			</view>	
		</u-sticky>
		<view class="u-p-l-30 u-p-r-30">
			<u-swipe-action :show="item.show" :index="item.id" 
				v-for="(item, index) in list" :key="item.id" 
				@click="swipeClick" @open="open(index)"
				:options="options"
			>
				<view class="item u-border-bottom u-p-l-0 u-p-r-0 u-col-center"
				@click="selectDoc(item)">
					<template>
						<text v-if="select_ids.indexOf(item.id) == -1" class="custom-icon u-m-r-30">&#xe69c;</text>
						<text v-else class="custom-icon u-m-r-30" :style="{color:'#5870FE'}">&#xe620;</text>
					</template>
					<image mode="aspectFill" :src="item.head_img_url" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<view class="u-m-b-10">{{item.name}}</view>
						<view class="font_10 hos_name u-p-6">{{item.hospital_name}}</view>
					</view>
				</view>
			</u-swipe-action>
			<u-empty class="u-m-t-80" text="呀~,没有医生哦!" v-show="empty_tag" mode="data"></u-empty>
		</view>
		<view class="fix_bt_btn u-flex u-p-30">
			<u-button class="add_btn u-m-r-20" shape="circle" @click="toAddDoc('add')">
				<text class="custom-icon u-font-40 u-m-r-10">&#xe728;</text>
				新增
			</u-button>
		 	<u-button class="selected u-flex-1" type="primary" shape="circle" hover-class="none" @click="backPage">确定</u-button>
		</view>
		<!-- model -->
		<view>
			<u-modal v-model="delete_show" show-cancel-button @confirm="deleteDoc">
				<view class="slot-content u-text-center u-m-t-40 u-m-b-40">
					确定删除改医生吗？
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
	import { serveDoctor } from '@/api/common.js';
	import { operateDocInfo } from '@/api/visit.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default{
		mixins: [MescrollMixin],
		data(){
			return{
				keyword:'',
				list:[],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [
					{
						text: '编辑',
						style: {
							backgroundColor: '#5870FE'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#F65B6A'
						}
					}
				],
				doctor_id:'',
				delete_show:false,
				select_list:[],
				select_ids:[],
				empty_tag:false,
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getList();
			let visit_checkout = this.visit_checkout;
			this.select_list = visit_checkout.doctors?visit_checkout.doctors:[];
			this.select_ids = this.select_list.length !== 0?this.select_list.map(item => {
				return item.id
			}):[];
		},
		methods:{
			// 获取医生列表
			async getList(){
				let params = {
					keywords:this.keyword,
					hospital_id:this.$Route.query.hospital_id
				};
				let res = await serveDoctor(params);
				if(res.data.list.length === 0){
					this.list = [];
					this.empty_tag = true;
				} else {
					this.list = res.data.list.map(item => {
						let obj = Object.assign({},item,{show:false})
						return obj
						
					});
					this.empty_tag = false;
				}
			},
			search(){
				this.list = [];
				this.getList();
			},
			// 选择适医生
			selectDoc(data){
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
				// let type = this.$Route.query.type;
				this.$u.vuex('visit_checkout.doctors',[...this.select_list]);
				// if(type === 'visit'){
					
				// } else {
				// 	this.$u.vuex('visit_checkout.doctors',[...this.select_list]);
				// }
				
			},
			swipeClick(index, index1) {
				this.doctor_id = index;
				if(index1 == 1) {
					this.delete_show = true;
				} else {
					this.toAddDoc('edit',index);
				}
			},
			async deleteDoc(){
				let res = await operateDocInfo('delete',{id:this.doctor_id});
				this.getList()
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if(index != idx) this.list[idx].show = false;
				})
			},
			toAddDoc(type,doctor_id){
				this.$Router.push({
					path:'/pages/visit/visitDocForm',
					query:{
						type,
						doctor_id,
						hospital_id:this.$Route.query.hospital_id
					}
				})
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
		.search_hd{
			background-color: $color-xf;
		}
		.item {
			display: flex;
			padding: 20rpx;
		}
		image {
			width: 88rpx;
			flex: 0 0 88rpx;
			height: 88rpx;
			margin-right: 20rpx;
			border-radius: 12rpx;
		}
		.title {
			text-align: left;
			font-size: 28rpx;
			color: $u-content-color;
			margin-top: 20rpx;
		}
		.hos_name{
			color: $color-xf;
			background-color: $color-37;
			border-radius: 4rpx;
		}
		.add_btn{
			width: 250rpx;
			margin: 0;
			color: $color-31;
		}
	}
</style>
