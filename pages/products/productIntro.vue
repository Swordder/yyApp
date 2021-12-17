<template>
	<view class="content">
		<view class="title u-m-b-40">
			{{product_name}}
		</view>
		<view class="u-p-l-30 u-p-r-30">
			<view class="prod_intro_item u-p-b-30" v-for="(item,index) in list" :key="index">
				<view class="prod_intro_hd u-content demo-layout bg-purple-light u-flex">
					<text class="custom-icon u-m-r-12">&#xe60e;</text>
					<u-parse :html="item.name"></u-parse>
				</view>
				<view class="prod_intro_bd u-content u-p-t-16 u-p-l-30 u-p-r-30">
					<u-parse :html="item.content"></u-parse>
				</view>
				<u-line class="u-m-t-30" color="#F5F5F5" :hair-line="false" />
			</view>
		</view>
	</view>
</template>
<script>
	import { productIntro } from '@/api/products.js';
	export default {
		data() {
			return {
				product_name:'',
				list:[]
			};
		},
		onLoad() {
			this.introList()
		},
		methods:{
			async introList(){
				let res = await productIntro(this.$Route.query.product_id);
				this.product_name = res.data.product_name;
				this.list = [ ...res.data.manuals ];
			}
		}
	}
</script>
<style lang="scss" scoped>
.title{
	font-size: 32rpx;
	font-weight: bold;
	text-align: center;
	padding: 40rpx;
	padding-bottom: 14rpx;
	position: relative;
	&:after{
		content: '';
		display: block;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 0;
		width: 40rpx;
		height: 6rpx;
		background-color: $color-31;
		border-radius: 2rpx;
	}
}
.prod_intro_item{
	color: $color-x6;
	.custom-icon{
		color: $color-31;
	}
	.prod_intro_hd{
		font-weight: bold;
	}
	.prod_intro_bd{
		line-height: 48rpx;
	}
}
</style>
