<template>
	<view class="page-wrap" v-if="showPage">
		<view class="page-content">
			<image class="guide-img" src="/static/images/bg-guide.png" mode="widthFix"></image>

			<view class="btn-wrap" @click="toIndex">立即体验</view>
		</view>

		<version></version>
	</view>
</template>

<script>
// #ifdef APP-PLUS
import APPUpdate from '@/utils/appUpdate.js';
// #endif
export default {
	data() {
		return {
			showPage: true
		};
	},
	onLoad() {
		// #ifdef APP-PLUS
		// 版本更新
		APPUpdate();
		// #endif

		this.$u.vuex('APP_LAUNCH_TIME', 0);
		const APP_LAUNCH_TIME = this.APP_LAUNCH_TIME;

		if (APP_LAUNCH_TIME == 0) {
			this.showPage = true;
		} else {
			this.toIndex();
		}
	},
	mounted() {},
	methods: {
		toIndex() {
			this.$u.vuex('APP_LAUNCH_TIME', this.APP_LAUNCH_TIME + 1);
			this.$Router.replaceAll('/pages/index/index');
		}
	}
};
</script>

<style lang="scss" scoped>
.page-wrap,
.page-content {
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
.btn-wrap {
	position: fixed;
	left: 50%;
	bottom: 60rpx;
	transform: translateX(-50%);
	width: 410rpx;
	height: 88rpx;
	line-height: 88rpx;
	text-align: center;
	border-radius: 44rpx;
	font-size: 32rpx;
	font-weight: 900;
	color: #2c4aff;
	background: #ffbe00;
	letter-spacing: 6rpx;
}
.guide-img {
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	display: block;
	width: 750rpx;
	height: 2000rpx;
}
</style>
