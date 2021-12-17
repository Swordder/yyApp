<template>
	<view class="content">
		<u-cell-group>
			<u-cell-item 
			v-for="item in list"
			:key="item.id"
			:title-style="{'lineHeight':'40rpx','color':'#333333'}" 
			:title="item.name"
			@click="toNextPage(item.id)">
			</u-cell-item>
			<view 
			class="u-p-t-20 u-p-b-20 u-text-center" 
			:style="{'color':'#5870FE'}" @click="toAddHos()">+新增服务医院
			</view>
		</u-cell-group>
		<u-empty v-show="show" text="您还没有服务的医院哦~" mode="data"></u-empty>
		<!-- <view class="fix_bt_btn u-p-20">
			<u-button 
			shape="circle" size="medium" 
			:custom-style="{color:'#5870FE',width:'100%'}">
			+添加服务医院
			</u-button>
		</view> -->
	</view>
</template>
<script>
	import { serveHosList } from '@/api/hospital.js';
	export default{
		data(){
			return {
				list:[],
				show:false
			}
		},
		onLoad() {
				this.getList()
		},
		methods:{
			async getList(){
				let res = await serveHosList();
				this.list = [...res.data.list];
				if(res.data.list.length === 0){
					this.show = true
				} else {
					this.show = false;
				}
			},
			toNextPage(hospital_id){
				this.$Router.push({
					path:'/pages/mine/myHosDetail',
					query:{
						hospital_id
					}
				})
			},
			toAddHos(){
				this.$Router.pushTab({
					path:'/pages/index/index'
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content{
		height: 100%;
		@include position_abs;
		background-color: $color-f5;
		padding-bottom: 140rpx;
	}
</style>
