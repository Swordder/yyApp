<template>
	<view class="content u-abso">
		<view class="about_yy u-p-t-40 u-p-b-40 u-p-l-60 u-p-r-60 u-m-b-40">
			<view class="title u-text-center u-font-32 u-m-b-40">关于优药</view>
			<view class="">
				优药致力于中国新特药品与医疗器械的市场和学术服务。链接药企的优质产品，学术代表和专科诊疗医生，让医生用好的产品，给患者好的治疗！你可以立即查看药品，申请加入，或者留言咨询！
			</view>
		</view>
		<view class="about_yy u-p-t-40 u-p-l-30 u-p-r-30">
			<view class="title u-text-center u-font-32">
				联系我们
			</view>
			<view class="u-flex u-col-top u-p-t-20 u-p-b-20">
				<text class="custom-icon">&#xe675;</text>
				<text>021-32035318</text>
			</view>
			<u-line></u-line>
			<view class="u-flex u-col-top u-p-t-20 u-p-b-20">
				<text class="custom-icon">&#xe7b0;</text>
				<text>info@nuancebiotech.cn</text>
			</view>
			<u-line></u-line>
			<view class="u-flex u-col-top u-p-t-20 u-p-b-20">
				<text class="custom-icon">&#xe79e;</text>
				<text>上海市静安区南京西路1376号上海商城东峰办公楼639室</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>
<style lang="scss" scoped>
	.content{
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: $color-f5;
	}
	.title{
		font-weight: bold;
		color: $color-x3;
	}
	.about_yy{
		color: $color-x6;
		background-color: $color-xf;
		line-height: 48rpx;
	}
	.custom-icon{
		font-weight: bold;
		font-size: 36rpx;
		color: $color-31;
		margin-right: 20rpx;
	}
</style>
