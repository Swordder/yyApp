<template>
	<view class="u-p-20 u-border-top">
		<template v-if="showInfo">
			
		
		<view class="u-text-center u-font-40 u-p-10">{{ newsInfo.title }}</view>
		<view class="u-text-center u-font-24">{{ newsInfo.created_time }}</view>
		
		
		<view class="u-font-28 u-m-t-20">{{ newsInfo.sub_title }}</view>
		
		<view class="u-m-t-20 u-font-32">{{ newsInfo.content }}</view>
		</template>
	</view>
</template>

<script>
	import { fetchNewsDetail } from '@/api/news.js';
	export default {
		data() {
			return {
				showInfo: false,
				newsInfo: {}
			};
		},
		onLoad() {
			fetchNewsDetail(this.$Route.query.id).then( res => {
				this.newsInfo = res.data;
				console.log(res);
				this.handleRouter(this.newsInfo)
			})
		},
		
		methods: {
			handleRouter(msgInfo) {
				// type
				// 1 医院的推荐 2 表示平台求助 3 表示平台消息公告
				// 4 数据更新提醒  5 系统回复用户的消息   6 表示平台消息公告微信展示
				// 7 日流向更新 8 投票提醒 9 获得积分 10 消耗积分  11 问卷邀请  12 邀请加入群组 13 签到消息
				
				const { id, link, paper_yyid, type } = msgInfo;
				let path = '';
				// if (type == 11 && paper_yyid) {
				// 	path = `/pages/question/questionInvitees?id=${paper_yyid}`;
				// } else if(type == 13) {
				// 	path = `/pages/webview/activity`;
				// }
				
				console.log(path);
				
				if(path) {
					this.$Router.replace(path);
				} else {
					this.showInfo = true;
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
