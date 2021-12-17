<template>
	<view>
		<u-subsection :list="typeList" :current="typeIndex" active-color="#2979ff" mode="subsection" @change="changeType"></u-subsection>
		<u-tabs class="u-border-bottom" :list="statusList" :is-scroll="false" :current="statusIndex" @change="changeStatus"></u-tabs>

		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
			<view class="u-p-l-30 u-p-r-30">
				<view class="item-wrap u-p-t-30 u-p-b-30 u-border-bottom" v-for="(item, index) in dataList" :key="index">
					<view class="u-flex u-row-between u-col-center">
						<view class="u-flex u-col-center u-m-t-10">
							<text class="u-m-r-20">{{ item.desc }}</text>
							<u-tag :text="item.status" type="success" mode="dark" size="mini" />
						</view>
						<view class="u-font-32">{{ item.points }}</view>
					</view>
					<view class="u-font-20" style="color: #999;">{{ item.date }}</view>
				</view>
			</view>

			<!-- 列表为空 -->
			<u-empty v-if="dataList.length == 0" text="暂无数据" mode="list" margin-top="80"></u-empty>
		</mescroll-body>
	</view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';

import { fetchIntegralDetail } from '@/api/integral.js';

export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			typeIndex: 0,
			typeList: [{ name: '消费积分', type: 2 }, { name: '服务积分', type: 1 }],

			statusIndex: 0,
			statusList: [{ name: '全部', type: 0 }, { name: '发放', type: 1 }, { name: '使用', type: 2 }],

			dataList: [],
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
	onLoad() {
		
	},
	methods: {
		changeType(index) {
			this.typeIndex = index;
			this.mescroll.resetUpScroll();
		},
		changeStatus(index) {
			this.statusIndex = index;
			this.mescroll.resetUpScroll();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			// page.num, page.size, keyword
			const paramsData = {
				current: page.num,
				limit: page.size,
				type: this.statusList[this.statusIndex].type,
				point_type: this.typeList[this.typeIndex].type
			};

			fetchIntegralDetail(paramsData)
				.then(res => {
					const curPageData = res.data.list;
					const totalSize = res.data.page.total;
					const curPageLen = curPageData.length;
					if (page.num == 1) {
						this.dataList = []; //如果是第一页需手动制空列表
					}

					this.dataList = this.dataList.concat(curPageData); //追加新数据

					this.mescroll.endBySize(curPageLen, totalSize);

					setTimeout(() => {
						this.mescroll.endSuccess(curPageLen);
					}, 20);
				})
				.catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				});
		}
	}
};
</script>

<style lang="scss"></style>
