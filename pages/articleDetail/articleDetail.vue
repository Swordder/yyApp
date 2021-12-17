<template>
	<view class="content">
		<view class="article_hd u-p-b-30">
			<view class="u-line-2 u-font-32 u-m-b-20">{{info.title}}</view>
			<u-cell-group :border="false">
				<u-cell-item 
					class="u-m-b-10"
					icon="account" 
					:border-bottom="false" 
					icon-size="30"
					:title="info.sub_title" :arrow="false">
				</u-cell-item>
				<u-cell-item
					icon="eye" 
					:border-bottom="false" 
					icon-size="30"
					title="345" :arrow="false">
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="article_bd u-p-t-26 u-p-b-26">
			<u-parse :html="info.content" :tag-style="style"></u-parse>
		</view>
		
		<view class="fixed-btn-wrap u-p-30">
			
			<view class="btn u-p-30" @click="toSelectCollect">
				<u-icon name="heart" size="44" color="red"></u-icon>
			</view>
			
		</view>
		
	</view>
</template>
<script>
	import { interpretDetail } from '@/api/products.js';
	export default {
		data() {
			return {
				info:{},
				style: {
					img: 'max-width: 100%'
				}
			};
		},
		onLoad() {
			this.detail();
		},
		methods:{
			async detail(){
				let res = await interpretDetail(this.$Route.query.id);
				this.info = res.data.info;
			},
			
			toSelectCollect() {
				this.$Router.push(`/pages/myCollect/index?type=select&resource_id=${this.$Route.query.id}&resource_type=2`)
			}
		}
	}
</script>
<style lang="scss" scoped>
.content{
	padding: 30rpx 40rpx;
	.article_hd{
		border-bottom: 2rpx solid #F1F1F1;
		.u-cell{
			line-height: 40rpx;
			font-size: 24rpx;
			padding: 0;
			color: $color-x9;
			align-items: baseline;
		}
	}
	.article_bd{
		color: $color-x6!important;
		line-height: 48rpx!important;
	}
}

.fixed-btn-wrap {
	position: fixed;
	right: 30rpx;
	bottom: 10vh;
	
	.btn {
		background-color: $color-xf;
		border-radius: 50%;
		box-shadow: 0 0 10rpx $color-35;
	}
}
</style>
