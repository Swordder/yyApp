<template>
	<view class="page-wrap">
		<integral-hd ref="integral"></integral-hd>

		<view class="content-wrap u-rela">
			<image class="goods-img" :src="goodsInfo.pic" mode="scaleToFill"></image>

			<view class="u-p-30">
				<view class="u-line-2" style="font-weight: bold;">{{ goodsInfo.name }}</view>
				<view class="u-flex u-row-between u-col-center u-m-t-20">
					<view class="u-font-20" style="color: #D39F83;">
						<view class="">消费积分: {{ goodsInfo.cost_money_point }}分</view>
						<view class="u-m-t-8">服务积分: {{ goodsInfo.cost_service_point }}分</view>
					</view>

					<u-number-box input-width="64" input-height="48" color="#333" v-model="goodsNum" :max="goodsInfo.rest" :min="1" :disabled="goodsInfo.rest === 0"></u-number-box>
				</view>
			</view>

			<view class="u-p-30 u-border-top">
				<u-section title="积分兑换规则" sub-title="" :right="false"></u-section>
				<view class="u-m-t-20" style="color: #666;">{{ goodsInfo.desc }}</view>
			</view>
		</view>

		<view class="fixed-footer u-flex u-border-top">
			<view class="u-flex-1 u-p-l-30">
				<view class="">总消费积分: {{ goodsInfo.cost_money_point * goodsNum }} 分</view>
				<view class="u-m-t-10">总服务积分: {{ goodsInfo.cost_service_point * goodsNum }} 分</view>
			</view>
			<view class="u-flex-1 btn-exchenge" @click="exchangeGoods">立即兑换</view>
		</view>
		
		<u-modal v-model="showConfirm" title="兑换确认" :content="confirmText" ref="uModal" show-cancel-button :async-close="true" @confirm="handleConfirm">
			<view class="u-text-center u-p-20">
				<rich-text :nodes="confirmText"></rich-text>
			</view>
		</u-modal>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
import IntegralHd from '@/components/integral/IntegralHd.vue';

import { fetchIntegralGoodsInfo, exchangeIntegralGoods } from '@/api/integral.js';

export default {
	components: {
		IntegralHd
	},
	data() {
		return {
			goodsInfo: {},
			goodsNum: 1,
			
			showConfirm: false,
			confirmText: ''
		};
	},
	onShow() {
		setTimeout(() => {
			this.$refs.integral.fetchInfo()
		}, 100);
	},
	onLoad() {
		this.fetchGoodsInfo();
	},
	methods: {
		fetchGoodsInfo() {
			const goodsId = this.$Route.query.goodsId;
			fetchIntegralGoodsInfo({ yyid: goodsId }).then(res => {
				this.goodsInfo = res.data.info;
			});
		},

		exchangeGoods() {
			// if(this.goodsNum > this.goodsInfo.rest) {
			// 	this.$u.toast('库存不足, 无法兑换!');
			// 	return;
			// }
			
			this.confirmText = `
				当前兑换 ${ this.goodsNum } 份, 将消耗 <br />
				消费积分 ${ this.goodsInfo.cost_money_point * this.goodsNum } 分 和
				服务积分 ${ this.goodsInfo.cost_service_point * this.goodsNum } 分
			`;
			this.showConfirm = true;
			
		},
		
		handleConfirm() {
			exchangeIntegralGoods({
				goods_yyid: this.goodsInfo.yyid,
				num: this.goodsNum
			}).then(res => {
				this.showConfirm = false;
				if (res && res.errcode == 0) {
					this.$refs.uToast.show({
						title: '兑换成功'
					});
					this.goodsNum = 1;
					this.$refs.integral.fetchInfo();
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.page-wrap {
	padding-bottom: 90rpx;
	background-color: $color-f5;
	min-height: 100vh;
}

.content-wrap {
	margin: 0 30rpx;
	background-color: $color-xf;
	border-radius: 16rpx;

	.goods-img {
		display: block;
		width: 690rpx;
		height: 600rpx;
	}
}
.fixed-footer {
	position: fixed;
	left: 0;
	bottom: 0;

	width: 100vw;
	height: 88rpx;
	background-color: $color-xf;
	font-size: 22rpx;
	color: $color-31;
	z-index: 999;

	.btn-exchenge {
		background-color: $color-31;
		font-size: 28rpx;
		color: $color-xf;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
	}
}
</style>
