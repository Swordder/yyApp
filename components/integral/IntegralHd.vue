<template>
	<view class="integral_hd u-p-30">
		<view class="integral_con">
			<view class="u-flex u-col-center u-row-around">
				<view class="u-text-center u-flex-1">
					<view class="text-num">{{ info.money_point || 0 }}</view>
					<view class="u-font-24">消费积分</view>
				</view>
				<u-avatar :src="yy_app_user_info.avatar" size="120"></u-avatar>
				<view class="u-text-center u-flex-1">
					<view class="text-num">{{ info.service_point || 0 }}</view>
					<view class="u-font-24">服务积分</view>
				</view>
			</view>
			
			<view class="u-text-center u-m-t-20" style="color: #fff; font-weight: 900;">{{ yy_app_user_info.name }}</view>
			
			<view class="btn u-m-t-30" @click="toDetail">积分明细</view>
		</view>
	</view>
</template>

<script>
import { fetchAllIntegralMsg } from '@/api/integral.js';
export default {
	data() {
		return {
			info: {}
		};
	},
	created() {
		// this.fetchInfo();
	},
	methods: {
		fetchInfo() {
			fetchAllIntegralMsg().then( res => {
				this.info = res.data.info;
			})
		},
		
		toDetail() {
			this.$Router.push('/pages/integral/detail')
		}
	}
};
</script>
<style lang="scss" scoped>
.integral_hd {
	width: 100%;
	height: 400rpx;
	background: linear-gradient($color-31 0%, $color-31 50%, $color-f5 50%, $color-f5 100%);
	color: #7A4325;
}

.integral_con {
	padding-top: 40rpx;
	width: 100%;
	height: 100%;
	background: linear-gradient(315deg, #e4ae91 0%, #fcdac7 100%);
	box-shadow: 0 2rpx 40rpx 0 rgba(191, 191, 191, 0.2);
	border-radius: 16rpx;
}

.text-num {
	font-size: 56rpx;
	font-weight: 600;
}
.btn {
	height: 72rpx;
	width: 320rpx;
	line-height: 72rpx;
	margin: 0 auto;
	border-radius: 36rpx;
	background: $color-xf;
	text-align: center;
}
</style>
