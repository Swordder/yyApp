<template>
	<view class="page-wrap">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
			<template v-for="(item, index) in newsList">
				<view class="item-wrap u-flex u-row-between u-col-center u-m-b-20" :key="index" @click="handleClick(item)">
					<view class="u-font-28">
						<view class="u-flex u-col-bottom">
							<view class="" style="font-weight: bold;">{{ item.title }}</view>
							<view class="u-font-24 u-m-l-20" style="color: #999;">{{ item.created_time }}</view>
						</view>
						<view class="u-m-t-20" style="color: #666;">{{ item.sub_title }}</view>
					</view>
					<view class="u-flex u-col-center">
						<u-badge type="error" :is-dot="true" :absolute="false" v-if="item.is_read == 0"></u-badge>
						<u-icon name="arrow-right" color="#aaa"></u-icon>
					</view>
				</view>
			</template>

			<u-empty v-if="newsList.length == 0" text="暂无消息" icon-size="100rpx"></u-empty>
		</mescroll-body>
		
		
		<view class="fixed-btn">
			<u-tag text="全部已读" mode="plain" type="warning" shape="circleLeft" @click="removeDot" />
		</view>

	</view>
</template>

<script>
import { fetchNewsList, readAllNews } from '@/api/news.js';
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			newsList: [],

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
			this.newsList = []; // 置空列表,显示加载进度条
			this.mescroll.resetUpScroll();
			this.mescroll.scrollTo(0, 0);
		}, 10)
	},
	methods: {
		// 获取群组列表
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			// page.num, page.size
			const { num: page_num, size: page_size } = page;

			fetchNewsList({ page: page_num, page_size })
				.then(res => {
					console.log(res);
					const curPageData = res.data.list;
					const totalSize = res.data.total;
					const curPageLen = curPageData.length;
					if (page.num == 1) {
						this.newsList = []; //如果是第一页需手动制空列表
					}

					this.newsList = this.newsList.concat(curPageData); //追加新数据

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
		
		removeDot() {
			readAllNews().then(res => {
				this.newsList = []; // 置空列表,显示加载进度条
				this.mescroll.resetUpScroll();
				this.mescroll.scrollTo(0, 0);
			})
		},
		
		handleClick(item) {
			// type
			// 1 医院的推荐 2 表示平台求助 3 表示平台消息公告
			// 4 数据更新提醒  5 系统回复用户的消息   6 表示平台消息公告微信展示
			// 7 日流向更新 8 投票提醒 9 获得积分 10 消耗积分  11 问卷邀请  12 邀请加入群组 13 签到消息
			
			const { id, link, paper_yyid, type } = item;
			let path = `/pages/mine/newsDetail?id=${id}`;
			// if (type == 11 && paper_yyid) {
			// 	path = `/pages/question/questionInvitees?id=${paper_yyid}`;
			// } else if(type == 13) {
			// 	path = `/pages/webview/activity`;
			// }
			
			this.$Router.push(path);
		}
	}
};
</script>

<style lang="scss" scoped>

.page-wrap {
	min-height: 100vh;
	background: $color-f5;
}
.top-wrap {
	background: $color-xf;
}
.item-wrap {
	padding: 20rpx 30rpx 20rpx 40rpx;
	background: $color-xf;
}

.fixed-btn {
	position: fixed;
	bottom: 10vh;
	right: 0;
}
</style>
