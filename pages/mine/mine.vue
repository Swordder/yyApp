<template>
	<view class="content">
		<view class="user_con u-flex u-row-left" @click="toNextPage('/pages/mine/myData')">
			<u-avatar class="u-m-r-30" :src="show_info.avatar" size="120"></u-avatar>
			<view class="u-flex u-flex-1 u-row-between">
				<view class="">
					<view class="nick_name u-m-b-20 u-font-36">{{ show_info.name }}</view>
					<u-tag
						class="u-font-xs"
						:text="show_info.is_verified == 0 ? '未认证' : '已认证'"
						shape="circle"
						size="mini"
						color="#FFFFFF"
						mode="plain"
						bg-color="#5870FE"
						border-color="#FFFFFF"
					/>
				</view>
				<view class="u-flex u-col-center">
					<u-icon class="u-p-20" name="erweima1" custom-prefix="custom-icon" color="#ffffff" size="88" @click.native.stop="fetchQrcode"></u-icon>
					<u-icon name="arrow-right" color="#ffffff" size="36"></u-icon>
				</view>
			</view>
		</view>
		
		<!-- 最新消息 -->
		<view v-if="latestNews.id" class="notice-wrap" @click="$Router.push('/pages/mine/news')">
			<u-notice-bar
				bg-color="#fff"
				color="#5870FE"
				padding="30rpx"
				border-radius="16"
				more-icon
				:list="[`${ latestNews.title } - ${ latestNews.sub_title }`]"
			/>
		</view>
		
		
		<view class="set_list u-m-30">
			<u-cell-group>
				<u-cell-item
					v-for="(item, index) in setting_list"
					:key="index"
					:icon-style="{ color: '#5870FE' }"
					:icon="item.icon_name"
					:title="item.title"
					@click="toNextPage(item.url)"
				>
					<u-tag v-if="item.right && cellRight[item.type]" slot="right-icon" :text="cellRight[item.type]" mode="dark" type="error" shape="circle" />
				</u-cell-item>
			</u-cell-group>
		</view>
		<Tabbar></Tabbar>

		<!-- 二维码 -->
		<my-qrcode v-if="showQrcode" :show="showQrcode" :url="qrcodeUrl" @hide="hideQrcode" />
	</view>
</template>
<script>
import Tabbar from '@/components/Tabbar.vue';
import MyQrcode from '@/components/my-group/MyQrcode.vue';
import { getUserInfo } from '@/api/login.js';
import { fetchMyQrcode } from '@/api/mine.js';
import { fetchNewsList, fetchLatestNews } from '@/api/news.js';
export default {
	data() {
		return {
			showQrcode: false,
			qrcodeUrl: '',
			show_info: {},
			latestNews: {},
			setting_list: [
				{
					title: '积分商城',
					icon_name: 'integral-fill',
					url: '/pages/integral/shop'
				},
				{
					title: '观看直播',
					icon_name: 'play-circle-fill',
					url: '/pages/redirect'
				},
				{
					title: '合规中心',
					icon_name: 'edit-pen-fill',
					url: '/pages/compliance/compliance'
				},
				{
					title: '流向月报',
					icon_name: 'hourglass-half-fill',
					url: '/pages/report/report'
				},
				{
					title: '力蜚能奖金计算',
					icon_name: 'rmb-circle-fill',
					url: '/pages/bonusCal/niferexBonusCal'
				},
				{
					title: '问卷调查',
					icon_name: 'question-circle-fill',
					url: '/pages/question/question'
				},
				{
					title: '拜访系统',
					icon_name: 'man-add-fill',
					url: '/pages/visit/visit'
				},

				{
					title: '我的医院',
					icon_name: 'plus-square-fill',
					url: '/pages/mine/myHospitalList'
				},
				{
					title: '我的医生群组',
					icon_name: 'grid',
					url: '/pages/myGroup/index?type=1'
				},
				{
					title: '我的代表群组',
					icon_name: 'grid-fill',
					url: '/pages/myGroup/index?type=2'
				},
				{
					title: '我的邀请',
					icon_name: 'attach',
					url: '/pages/myInvite/index'
				},
				{
					title: '消息',
					icon_name: 'chat-fill',
					url: '/pages/mine/news',
					right: true,
					type: 'news'
				},
				{
					title: '我的收藏',
					icon_name: 'star-fill',
					url: '/pages/myCollect/index'
				},
				{
					title: '治疗领域',
					icon_name: 'info-circle-fill',
					url: '/pages/webview/cureAreas'
				},
				{
					title: '热门消息',
					icon_name: 'info-circle-fill',
					url: '/pages/webview/hotNews'
				},
				{
					title: '优云邀请',
					icon_name: 'grid',
					url: '/pages/inviteQrCode/inviteQrCode'
				},
				{
					title: '设置',
					icon_name: 'setting',
					url: '/pages/setting/setting'
				}
			],
			
			cellRight: {
				news: 0
			},
			
		};
	},
	components: {
		Tabbar,
		MyQrcode
	},
	onLoad() {},
	onShow() {
		this.getUserInfo();
		
	},
	methods: {
		// 获取更新用户信息
		async getUserInfo() {
			// 登录后获取用户信息
			let user_res = await getUserInfo();
			console.log(user_res);
			this.show_info = { ...user_res.data.info };
			this.$u.vuex('yy_app_user_info', Object.assign({}, this.yy_app_user_info, user_res.data.info));
			
			this.handleNewsFatch()
		},
		toNextPage(url) {
			this.$Router.push({
				path: url
			});
		},
		
		handleNewsFatch() {
			fetchNewsList({ page: 1, page_size: 1 }).then( res => {
				this.cellRight.news = res.data.unread_total || 0
			})
			
			fetchLatestNews().then( res => {
				console.log(res);
				this.latestNews = res.data;
			})
		},
		
		fetchQrcode() {
			fetchMyQrcode().then(res => {
				this.qrcodeUrl = res.data.url;
				this.showQrcode = true;
			});
		},
		hideQrcode() {
			this.showQrcode = false;
			this.qrcodeUrl = '';
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	height: 100%;
	// @include position_abs;
	background-color: $color-f5;
	.user_con {
		padding: 40rpx 30rpx 100rpx;
		background-color: $color-31;
	}
	.nick_name {
		color: #ffffff;
	}
	.set_list {
		.u-cell-item-box {
			border-radius: 16rpx 16rpx 0 0;
		}
		.u-cell {
			color: $color-x3;
			padding-top: 18rpx;
			padding-bottom: 18rpx;
		}
	}
}

.notice-wrap {
	padding: 0 30rpx;
	margin-top: -60rpx;
}
</style>
