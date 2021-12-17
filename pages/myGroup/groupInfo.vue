<template>
	<view>
		<!-- 吸顶 -->
		<u-sticky :enable="enableSticky">
			<!-- 只能有一个根元素 -->
			<view class="page-header u-p-30">
				<view class="u-flex u-row-between u-col-center u-m-b-30">
					<view class="title u-font-32">{{ groupInfo.group_name || '我的群组' }}</view>
					<u-icon name="more-circle-fill" size="48" color="#fff" @click="toEditGroup" />
				</view>
				<view class="u-flex u-col-center">
					<view class="u-m-r-20">负责产品:</view>
					<project-tag :name="groupInfo.series_name" bg="#465FF4"></project-tag>
				</view>
			</view>
		</u-sticky>

		<!-- 投票 -->
		<view class="vote-wrap u-p-l-30 u-p-r-30" v-if="groupInfo.vote_status == 0 && groupInfo.is_leader != 1">
			<view class="container u-p-l-40 u-p-r-40">
				<view class="u-font-32 u-text-center u-p-t-30 u-p-b-30" style="font-weight: 900;">投票</view>
				<view class="content">你是否同意贡献{{ groupInfo.vote_tax_rate }}的积分用于群组的日常管理使用</view>
				<view class="u-p-t-40 u-p-b-40 u-flex u-row-between u-col-center">
					<u-button @click="handleVote(2)" shape="circle" type="primary" size="medium" hover-class="" :custom-style="btnStyle1">不同意</u-button>
					<u-button @click="handleVote(1)" shape="circle" type="primary" size="medium" hover-class="" :custom-style="btnStyle2">同意</u-button>
				</view>
			</view>
		</view>

		<!-- 代表列表 -->
		<delegate-list :list="groupMember" :showNum="true"></delegate-list>
		
	</view>
</template>

<script>
import ProjectTag from '@/components/my-group/ProjectTag.vue';
import DelegateList from '@/components/my-group/DelegateList.vue';

import { 
	fetchDelegateGroupInfo,
	fetchDelegateGroupMemberList,
	handleGroupVoting
} from '@/api/myGroup.js';

const btnStyle1 = {
	margin: '0',
	width: '280rpx',
	height: '72rpx',
	borderRadius: '36rpx',
	background: '#FF982A'
};
const btnStyle2 = {
	margin: '0',
	width: '280rpx',
	height: '72rpx',
	borderRadius: '36rpx',
	background: '#5870FE'
};
export default {
	components: {
		ProjectTag,
		DelegateList
	},
	data() {
		return {
			btnStyle1,
			btnStyle2,
			enableSticky: true ,// 处理吸顶组件报错, 配合 onshow onhide
			group_id: '',
			groupInfo: {},
			groupMember: []
		};
	},
	onShow() {
		this.enableSticky = true;
		
		this.fetchGroupDetail();
	},
	onHide() {
		this.enableSticky = false;
	},
	onLoad() {
		this.group_id = this.$Route.query.group_id;
	},
	methods: {
		fetchGroupDetail() {
			const paramsData = { group_id: this.group_id }
			fetchDelegateGroupInfo(paramsData).then(res => {
				this.groupInfo = res.data;
			})
			fetchDelegateGroupMemberList(paramsData).then(res => {
				this.groupMember = res.data;
			})
		},
		handleVote(type) {
			handleGroupVoting({
				group_id: this.group_id,
				vote_id: this.groupInfo.vote_id,
				agree: type,
			}).then(res => {
				this.fetchGroupDetail()
			})
		},
		toEditGroup() {
			this.$Router.push('/pages/myGroup/editDelegateGroup?group_id=' + this.group_id);
		}
	}
};
</script>

<style lang="scss" scoped>
.page-header {
	width: 100vw;
	background: $color-31;
	color: $color-xf;
	.title {
		font-weight: 900;
	}
}
.vote-wrap {
	border-bottom: 20rpx solid $color-f5;
	background: linear-gradient(to top, $color-f5 0%, $color-f5 100rpx, $color-31 100rpx, $color-31 100%);
	.container {
		background: $color-xf;
		border-radius: 15rpx;
		color: $color-31;
	}
}
</style>
