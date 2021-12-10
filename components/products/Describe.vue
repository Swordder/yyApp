<template>
	<view class="describe" :style="{backgroundColor:content.bgc}">
		<text class="custom-icon u-m-r-12" :style="{color:content.bgc}">&#xe643;</text>
		<view 
		class="u-text-center u-p-t-18 u-p-b-18 u-p-l-22 u-p-r-22" 
		:style="{color:content.color}">
			<!-- <u-parse :html="content"></u-parse> -->
			{{content.content}}<sup>{{content.sup}}</sup>
		</view>
	</view>
</template>

<script>
	
	export default{
		props:['content'],
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.describe{
		position: relative;
		border-radius: 20rpx;
		.custom-icon{
			position: absolute;
			top: -36rpx;
			left: 50%;
			transform: translateX(-50%);
			font-size: 48rpx;
		}
	}
</style>
