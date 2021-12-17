<template>
	<view class="content product_con">
		<view class="u-padding-30">
			<ProdBaseInfo v-if="$Route.query.series_id == 6" :prod_base_info="prod_base_info"></ProdBaseInfo>
			<ProdBaseInfo v-else-if="$Route.query.series_id == 9" :prod_base_info="prod_base_info_otc"></ProdBaseInfo>
			<view class="u-m-b-40">
				<u-image v-if="$Route.query.series_id == 6" border-radius="16" width="100%" height="300" src="http://img.youyao99.com/C4E8EB9F59E45AD03A2B6643E93719AB.png"></u-image>
				<u-image v-else-if="$Route.query.series_id == 9" border-radius="16" width="100%" height="300" src="http://img.youyao99.com/55ea763f0532487c0ccc5edf4edc1624.png"></u-image>
			</view>
			<view class="prod_intro">
				<button type="default" @click="toProductIntro('/pages/products/productIntro')">查看产品说明书</button>
			</view>
		</view>
		<u-line class="y_m_20 u-m-t-18" color="#F5F5F5" :hair-line="false" />
		<view class="prod_application">
			<u-section class="u-p-l-30 u-p-r-30 u-p-t-20 u-p-b-20" title="科室应用" line-color="#5870FE" :right="false" :bold="false"></u-section>
			<u-line color="#F3F3F3" :hair-line="false" />
			<u-grid :col="3" :border="false">
				<u-grid-item @click="toApplyList(1)">
					<view class="grid-icon u-m-b-14">
						<text class="custom-icon">&#xe6f4;</text>
					</view>
					<view class="grid-text">产科</view>
				</u-grid-item>
				<u-grid-item @click="toApplyList(2)">
					<view class="grid-icon u-m-b-14">
						<text class="custom-icon">&#xe624;</text>
					</view>
					<view class="grid-text">肾科</view>
				</u-grid-item>
				<u-grid-item @click="toApplyList(3)">
					<view class="grid-icon u-m-b-14">
						<text class="custom-icon">&#xe716;</text>
					</view>
					<view class="grid-text">全科</view>
				</u-grid-item>
			</u-grid>
		</view>
		<u-line class="y_m_20" color="#F5F5F5" :hair-line="false" />
		<view class="prod_application">
			<u-section class="u-p-l-30 u-p-r-30 u-p-t-20 u-p-b-20" title="文献&解读" line-color="#5870FE" :right="false" :bold="false"></u-section>
			<u-line color="#F3F3F3" :hair-line="false" />
			<view class="list u-p-30">
				<view
					class="list_item u-p-30 u-m-b-30" 
					v-for="item in list"
					:key = "item.id"
					@click="toInterpretDetail(item.id)">
					<view class="u-p-b-16 u-line-2">{{item.title}}</view>
					<u-line class="u-m-b-16" color="#F5F5F5" :hair-line="false" />
					<view class="list_bt u-flex">
						<text class="u-m-r-60">
							<text class="custom-icon u-m-r-12">&#xe602;</text>
							{{item.create_time}}
						</text>
						<text><text class="custom-icon u-m-r-12">&#xe621;</text>{{item.read_num}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="fix_bt_btn u-p-30">
			<u-button 
			class="selected" 
			type="primary" 
			shape="circle" 
			hover-class="none" 
			@click="toNextPage('/pages/hospital/hospital')">申请服务</u-button>
		</view>
	</view>
</template>
<script>
	import ProdBaseInfo from '@/components/products/ProdBaseInfo.vue';
	import { productInterpret } from '@/api/products.js';
	export default {
		data(){
			return {
				list:[],
				prod_base_info:{
					prod_img_url:'http://img.youyao99.com/913443AB0672F8D9CDC2BEFDAD45E6A6.png',
					prod_name:'力蜚能',
					prod_g_name:'多糖铁复合物胶囊',
					prod_type:'业务介绍'
				},
				prod_base_info_otc:{
					prod_img_url:'http://img.youyao99.com/55ea763f0532487c0ccc5edf4edc1624.png',
					prod_name:'力蜚能OTC',
					prod_g_name:'多糖铁复合物胶囊',
					prod_type:'业务介绍'
				},
			}
		},
		components:{
			ProdBaseInfo
		},
		beforeRouteLeave(to, from, next) {
			if(to.BACKTYPE) {
			   next({
					path: '/pages/index/index',
					NAVTYPE: 'pushTab'
			   })
			} else {
			   next()
			}
		},
		onLoad() {
			this.prodInterpret();
		},
		methods:{
			async prodInterpret(){
				let res = await productInterpret(this.$Route.query.product_id,1,10);
				this.list = [...res.data.list];
			},
			toInterpretDetail(id){
				this.$Router.push({
					path:'/pages/articleDetail/articleDetail',
					query:{
						id
					}
				})
			},
			toProductIntro(page){
				this.$Router.push({
					path:page,
					query:{
						...this.$Route.query
					}
				})
			},
			toApplyList(type){
				this.$Router.push({
					path:'/pages/products/prodApplyList',
					query:{
						type
					}
				})
			},
			toNextPage(page){
				this.$Router.push({
					path:page,
					query:{
						...this.$Route.query
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.product_con{
		padding-bottom: 140rpx;
		.prod_intro{
			button{
				border: 2rpx solid $color-31;
				@include btn_common(100%,72rpx,$color-xf,$color-31,36rpx,28rpx);
			}
		}
		.grid-icon{
			width: 88rpx;
			height: 88rpx;
			background-color: $color-45;
			border-radius: 50%;
			text-align: center;
			color: $color-31;
			line-height: 88rpx;
			.custom-icon{
				font-size: 56rpx;
			}
		}
		.grid-text{
			color: $color-x6;
		}
		.list{
			.list_item{
				background-color: #F8F9FF;	
				.list_bt{
					color: $color-x9;
					font-size: 24rpx;
				}
			}
			
		}
	}
</style>
