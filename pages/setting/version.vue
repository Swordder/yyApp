<template>
	<view class="page-wrap">
		
		<view class="u-p-8">
			<u-image src="/static/images/top-img-2.png" mode="widthFix"></u-image>
		</view>
		
		
		
		
		<view class="fixed-footer u-p-20">
			<u-button type="primary" @click="checkUpdate">检测更新</u-button>
		</view>
		
	</view>
</template>

<script>
	import APPUpdate from '@/utils/appUpdate.js';
	export default {
		data() {
			return {
			};
		},
		methods: {
			checkUpdate() {
				APPUpdate()
			}
		}
	}
</script>

<style lang="scss" scoped>
.page-wrap {
	padding-bottom: 100rpx;
}
.fixed-footer {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100vw;
	background-color: $color-xf;
}
</style>
