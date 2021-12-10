<template>
	<view class="prod_info u-flex u-row-between u-p-b-30">
		<view class="u-flex u-flex-1">
			<view class="img_wrap">
				<u-image width="100rpx" height="100rpx" :src="prod_base_info.prod_img_url"></u-image>
			</view>
			<view class="u-m-l-30 u-line-2">
				<text class="u-font-32">{{prod_base_info.prod_name}}</text> <br />
				<text class="u-font-24">{{prod_base_info.prod_g_name}}</text>
			</view>
		</view>
		<view class="btn_route">
			<button type="primary" @click="toNextPage" class="u-font-md btn_1">{{prod_base_info.prod_type}}</button>
		</view>
	</view>	
</template>

<script>
	export default {
		props:['prod_base_info'],
		data() {
			return {
				
			}
		},
		methods:{
			toNextPage(){
				if(this.prod_base_info.prod_type == '产品宝典'){
					this.$Router.push({
						path:'/pages/products/productInfo',
						query:{
							...this.$Route.query
						}
					})	
				} else {
					this.$Router.push({
						path:'/pages/products/productIndex',
						query:{
							...this.$Route.query
						}
					})	
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.prod_info{
		.img_wrap{
			width: 100rpx;
			height: 100rpx;
		}
		uni-text:nth-of-type(1){
			font-weight: 500;
		}
		uni-text:nth-of-type(2){
			color: $color-x6;
		}
		.btn_route{
			width: 168rpx;
			.btn_1{
				@include btn_common(160rpx,60rpx,$color-31,$color-xf,30rpx,24rpx);
			}	
		}
	}
</style>
