<template>
	<view class="">
		<!-- 吸顶 -->
		<u-sticky :enable="enableSticky">
			<!-- 只能有一个根元素 -->
			<view class="u-p-l-30 u-p-r-30 u-p-b-10 u-border-bottom" style="background-color: #fff;">
				<u-subsection bgColor="#f7f7f7" buttonColor="#2979ff" active-color="#fff" inactive-color="#999" height="72" :list="tabList" :current="tabIndex" @change="changeTab" />
			</view>
		</u-sticky>

		<view class="u-p-l-30 u-p-r-30 u-p-b-30">
			<template v-for="(item, index) in list">
				<view class="u-flex u-row-between u-col-center u-p-t-20 u-p-b-20 u-border-bottom" :key="index">
					<u-image width="60rpx" height="60rpx" border-radius="8" :src="item.headimgurl"></u-image>
					<view class="u-flex-1 u-flex u-col-center u-m-l-20">
						<view class="u-m-r-20">{{ item.nickname }}</view>
						<u-tag v-if="item.user_type" :text="tagOption[item.user_type].text" :type="tagOption[item.user_type].type" mode="dark" size="mini" />
						<u-tag v-else text="未认证" type="warning" mode="dark" size="mini" />
					</view>
					<view class="u-font-20" style="color: #999;">{{ item.created_at }}</view>
				</view>
			</template>

			<u-empty v-if="list.length == 0" margin-top="40"></u-empty>
		</view>
	</view>
</template>

<script>
import { fetchMyInviteList } from '@/api/myInvite.js';
export default {
	data() {
		return {
			enableSticky: true, // 处理吸顶组件报错, 配合 onshow onhide

			tabIndex: 0,
			tabList: [
				{
					name: '全部',
					type: 'all'
				},
				{
					name: '医生',
					type: 'doctor'
				},
				{
					name: '代表',
					type: 'agent'
				},
				{
					name: '未认证',
					type: 'unSign'
				}
			],

			tagOption: {
				1: { text: '代表', type: 'primary' },
				2: { text: '医生', type: 'primary' }
			},

			pageData: {},

			list: []
		};
	},
	onShow() {
		this.enableSticky = true;
	},
	onHide() {
		this.enableSticky = false;
	},
	onLoad() {
		fetchMyInviteList().then(res => {
			this.pageData = res.data;

			this.tabList = this.tabList.map(item => {
				const num = this.pageData[item.type].count;
				item.name += `(${num})`;
				return item;
			});

			this.changeTab(this.tabIndex);
		});
	},
	methods: {
		changeTab(index) {
			this.list = this.pageData[this.tabList[index].type].list || [];
		}
	}
};
</script>

<style lang="scss" scoped>
::v-deep {
	.u-subsection,
	.u-item-bg {
		border-radius: 36rpx !important;
	}
}
</style>
