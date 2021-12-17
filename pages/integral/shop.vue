<template>
	<view class="page-wrap">
		<integral-hd ref="integral"></integral-hd>

		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
			<view class="u-flex u-row-between u-col-center u-flex-wrap u-p-l-30 u-p-r-30">
				<view class="goods-wrap" v-for="(goods, index) in goodsList" :key="index" @click="toExchangeGoods(goods)">
					<view class="img-wrap u-rela">
						<u-image width="330rpx" height="330rpx" :src="goods.pic"></u-image>
						<view class="status-wrap u-flex u-row-center u-col-center" v-if="goods.rest <= 0">已抢光</view>
					</view>
					<view class="u-p-20">
						<view class="u-font-28 u-line-1" style="color: #333;">{{ goods.name }}</view>
						<view class="u-font-20 u-m-t-20">消费积分: {{ goods.cost_money_point }}分</view>
						<view class="u-font-20 u-m-t-8">服务积分: {{ goods.cost_service_point }}分</view>
					</view>
				</view>
			</view>

			<!-- 列表为空 -->
			<u-empty v-if="goodsList.length == 0" text="暂无数据" mode="list" margin-top="80"></u-empty>
		</mescroll-body>
	</view>
</template>

<script>
import IntegralHd from '@/components/integral/IntegralHd.vue';

import { fetchIntegralGoodsList } from '@/api/integral.js';

import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
export default {
	components: {
		IntegralHd
	},
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			goodsList: [],
			// 上拉加载的配置(可选, 绝大部分情况无需配置)
			upOption: {
				auto: true,
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 20 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				textNoMore: '~ 呀, 到底了 ~',
				empty: {
					use: false // 不使用自带组件
				},
				toTop: {
					offset: 800,
					radius: 16
				}
			}
		};
	},

	onLoad() {},
	onShow() {
		setTimeout(() => {
			// 处理兑换后, 返回刷新积分信息
			this.$refs.integral.fetchInfo();
		}, 100)
	},
	methods: {
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			// page.num, page.size, keyword
			const paramsData = {
				current: page.num,
				limit: page.size
			};

			fetchIntegralGoodsList(paramsData)
				.then(res => {
					const curPageData = res.data.list;
					const totalSize = res.data.page.total;
					const curPageLen = curPageData.length;
					if (page.num == 1) {
						this.goodsList = []; //如果是第一页需手动制空列表
					}

					this.goodsList = this.goodsList.concat(curPageData); //追加新数据

					this.mescroll.endBySize(curPageLen, totalSize);

					setTimeout(() => {
						this.mescroll.endSuccess(curPageLen);
					}, 20);
				})
				.catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				});
		},
		toExchangeGoods(goods) {
			this.$Router.push('/pages/integral/exchange?goodsId=' + goods.yyid);
		}
	}
};
</script>

<style lang="scss" scoped>
.page-wrap {
	width: 100vw;
	min-height: 100vh;
	background: $color-f5;
}

.goods-wrap {
	margin-bottom: 30rpx;
	width: 330rpx;
	height: 476rpx;
	background: $color-xf;
	border-radius: 16rpx;
	color: #d39f83;
	overflow: hidden;
}

.status-wrap {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;

	background: $color-x0-6;
	color: $color-xf;
}
</style>
