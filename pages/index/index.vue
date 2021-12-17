<template>
	<view class="content">
		<view class="img_wrap u-m-b-20" @click="$Router.push('/pages/webview/activity')">
			<u-image 
			width="750" 
			height="280"
			src="http://img.youyao99.com/897F4FA732E7F8C5883097DB64A80E9F.png" 
			mode="widthFix">
			</u-image>
		</view>
		<view class="prod_list">
			<view class="" v-for="item in product_list" :key="item.series_id">
				<navigator 
				class="prod_item u-flex u-flex-wrap u-row-between u-m-b-20" 
				:url="item.prod_index_path+'?series_id='+item.series_id+'&product_id='+item.id">
					<view class="prod_left u-flex u-flex-1">
						<u-image 
						width="120rpx" 
						height="120rpx"
						:src="item.pic" 
						mode="scaleToFill"
						>
						</u-image>	
						<view class="prod_info u-m-l-30">
							<text class="prod_name u-font-md">{{item.name}}</text><br/>
							<text class="prod_g_name u-line-2 u-m-t-12">{{item.intro}}</text>
						</view>
					</view>
					<view class="icon u-font-40">
						<u-icon name="arrow-right" size="40" color="#AAAAAA"></u-icon>
					</view>
				</navigator>	
			</view>
		</view>
		<Tabbar></Tabbar>
	</view>
</template>
<script>
	import Tabbar from '@/components/Tabbar.vue';
	import { productList } from '@/api/index.js';
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				product_list:[]
			}
		},
		components:{
			Tabbar
		},
		onShow() {
			this.product_list = [];
			productList().then(res => {
				res.data.list.map(item =>{
					if(item.name.indexOf('爱尔真') != -1){
						this.product_list.push({
							...item,
							prod_index_path:'/pages/products/aerogenInfo'
						})
					} else {
						this.product_list.push({
							...item,
							prod_index_path:'/pages/products/productIndex'
						})
					}
				})
			})
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		@include position_abs;
		background-color: $color-f5;
		.img_wrap{
			width: 100%;
		}
		.prod_list{
			.prod_item{
				padding: 20rpx 30rpx;
				background-color: $color-xf;
				.prod_left{
					.u-image{
						flex: 0 0 120rpx;
					}
					.prod_info{
						width: 100%;
						height: 120rpx;
						position: relative;
						.prod_name{
							font-weight: 500;
						}
						.prod_g_name{
							color: $color-x6;
							font-size: 24rpx;
							@include position_abs;
							top: auto;
						}
					}
				}
			}
		}
	}
</style>
