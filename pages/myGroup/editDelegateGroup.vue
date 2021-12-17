<template>
	<view class="page-wrap u-p-l-30 u-p-r-30">
		<u-cell-group :border="false">
			<u-cell-item class="cell-item" title="群名" :arrow="isLeader" @click="showDialog('resetName')">
				<view slot="right-icon">{{ groupInfo.group_name }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="群组二维码" @click="showQrcode">
				<view slot="right-icon">{{ groupInfo.name }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="群公告" :arrow="isLeader" @click="showDialog('notice')">
				<view slot="right-icon" class="u-line-1 u-text-right" style="width: 450rpx;">{{ groupInfo.notice }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="群组长" :arrow="isLeader" @click="showPopup('leader')">
				<view slot="right-icon">{{ groupInfo.leader_name }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="负责的产品" :arrow="isLeader" @click="selectProject">
				<view slot="right-icon"><project-tag :name="groupInfo.series_name"></project-tag></view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="贡献消费积分设定" :arrow="isLeader" @click="showDialog('vote')">
				<view slot="right-icon">{{ groupInfo.current_tax_rate }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="投票" v-if="isLeader && groupInfo.vote_status != -1" @click="showVoteInfo">
				<view slot="right-icon">{{ voteStatus[groupInfo.vote_status] }}</view>
			</u-cell-item>
			<u-cell-item class="cell-item" title="待加入列表" v-if="isLeader" @click="showPopup('apply')">
				<view slot="right-icon" style="color: #FF982A;">{{ groupInfo.join_num || 0 }}人</view>
			</u-cell-item>
		</u-cell-group>

		<view class="u-flex u-row-between u-col-center u-m-t-40 u-m-b-40">
			<view class="btn-edit" @click="showPopup('all')">
				<u-icon name="plus" size="28"></u-icon>
				<view class="u-m-t-10">添加成员</view>
			</view>
			<view v-if="isLeader" class="btn-edit u-m-l-30" @click="showPopup('remove')">
				<u-icon name="minus" size="28"></u-icon>
				<view class="u-m-t-10">移除成员</view>
			</view>
		</view>

		<view class="fixed-footer u-p-30">
			<view class="btn" v-if="isLeader" @click="showConfirmModel(1)">解散群组</view>
			<!-- <view class="btn" v-else @click="showConfirmModel(2)">退出群组</view> -->
		</view>

		<!-- 群名/公告/发起投票 弹窗 -->
		<dialog-input v-if="dialogShowFlag" :show="dialogShowFlag" :dialogType="dialogShowType" @dialogConfirm="handleDialogConfirm" @dialogClose="hideDialog" />

		<!-- 二维码 -->
		<my-qrcode v-if="qrcodeShowFlag" :show="qrcodeShowFlag" :url="groupQrcode" @hide="hideQrcode" />

		<!-- 选择代表 -->
		<u-popup mode="center" v-model="showPopupSelect" width="570rpx" border-radius="16">
			<view class="popup-select-wrap">
				<view class="u-p-30 u-text-center">{{ popupTitle[showPopupType] || '' }}</view>
				<scroll-view scroll-y="true" style="height: 440rpx;">
					<delegate-list :list="popupDataList" :canCheck="true" :single="showPopupType == 'leader'" @change="updateCheckStatus"></delegate-list>
				</scroll-view>
				<view class="u-flex u-row-between u-col-center footer u-p-30">
					<template v-if="showPopupType == 'leader'">
						<u-button @click="confirmGroupLeader" shape="circle" type="primary" :custom-style="btnStyle1">确定</u-button>
					</template>

					<template v-if="showPopupType == 'apply'">
						<view class="u-flex u-col-center">
							<u-checkbox @change="checkAllChange" v-model="selectAllFlag" />
							<view class="">全选</view>
						</view>
						<u-button @click="showConfirmModel(4)" shape="circle" type="primary" plain :custom-style="btnStyle2">拒绝</u-button>
						<u-button @click="handleApply(1)" shape="circle" type="primary" :custom-style="btnStyle2">通过</u-button>
					</template>

					<template v-if="['remove', 'all'].indexOf(showPopupType) > -1">
						<view class="u-flex u-col-center">
							<u-checkbox @change="checkAllChange" v-model="selectAllFlag" />
							<view class="">全选</view>
						</view>
						<u-button v-if="showPopupType == 'remove'" @click="showConfirmModel(3)" shape="circle" type="primary" plain :custom-style="btnStyle2">移除</u-button>
						<u-button v-if="showPopupType == 'all'" @click="handleMember(1)" shape="circle" type="primary" :custom-style="btnStyle2">加入</u-button>
					</template>
				</view>
			</view>
		</u-popup>

		<!-- 投票统计 -->
		<u-popup mode="center" v-model="showVoteFlag" width="570rpx" border-radius="16">
			<view class="popup-vote-wrap u-p-30">
				<view class="u-text-center" style="font-weight: 600;">贡献消费积分更改投票</view>

				<view class="u-p-30">
					<view class="u-flex u-col-center u-m-b-20">
						<view class="rate-wrap bg-1" :style="{ flexBasis: `${voteInfo.agree_rate}%` }"></view>
						<view class="rate-wrap bg-2" :style="{ flexBasis: `${voteInfo.disagree_rate}%` }"></view>
						<view class="rate-wrap bg-3" :style="{ flexBasis: `${voteInfo.abstain_rate}%` }"></view>
					</view>
					<view class="u-flex u-row-around u-col-center u-font-24">
						<view class="u-flex u-col-center">
							<view class="legend bg-1"></view>
							同意 {{ voteInfo.agree_rate }}%
						</view>
						<view class="u-flex u-col-center">
							<view class="legend bg-2"></view>
							不同意 {{ voteInfo.disagree_rate }}%
						</view>
						<view class="u-flex u-col-center">
							<view class="legend bg-3"></view>
							未投票 {{ voteInfo.abstain_rate }}%
						</view>
					</view>
				</view>

				<view class="btn" @click="endVoting" v-if="groupInfo.vote_status < 3">终止投票</view>
			</view>
		</u-popup>

		<!-- 确认提示 -->
		<u-modal v-model="showTipsConfirm" :content="tipsContent[showTipsType]" async-close show-cancel-button @confirm="confirmHandleAgain"></u-modal>

		<!-- 选择产品 -->
		<u-picker mode="selector" v-model="showProjectFlag" :default-selector="[projectIndex]" range-key="name" :range="projectOption" @confirm="confrimProject"></u-picker>
	</view>
</template>

<script>
import DialogInput from '@/components/my-group/DialogInput.vue';
import MyQrcode from '@/components/my-group/MyQrcode.vue';
import ProjectTag from '@/components/my-group/ProjectTag.vue';
import DelegateList from '@/components/my-group/DelegateList.vue';

import {
	fetchDelegateGroupInfo,
	fetchGroupQrcode,
	resetDelegateGroupName,
	resetDelegateGroupNotice,
	resetDelegateGroupLeader,
	fetchGroupProjectList,
	resetGroupProject,
	dissolveDelegateGroup,
	fetchDelegateGroupMemberList,
	fetchDelegateGroupJoinList,
	fetchAllDelegateList,
	createGroupVote,
	fetchGroupVoteInfo,
	endGroupVote,
	addDelegateGroupMember,
	delDelegateGroupMember,
	handleApplyMember
} from '@/api/myGroup.js';

const btnStyle1 = {
	width: '510rpx',
	height: '72rpx',
	borderRadius: '36rpx'
};
const btnStyle2 = {
	margin: '0',
	width: '160rpx',
	height: '72rpx',
	borderRadius: '36rpx'
};

export default {
	components: {
		DialogInput,
		MyQrcode,
		ProjectTag,
		DelegateList
	},
	data() {
		return {
			btnStyle1,
			btnStyle2,

			group_id: '',
			groupInfo: {},
			isLeader: false,

			dialogShowFlag: false,
			dialogShowType: '',

			qrcodeShowFlag: false,
			groupQrcode: '',

			showVoteFlag: false,
			voteInfo: {},

			showPopupSelect: false,
			showPopupType: '',
			selectAllFlag: false,
			popupTitle: {
				leader: '选择新的群组长',
				apply: '待加入成员',
				remove: '群组成员',
				all: '我的所有代表'
			},
			popupDataList: [],

			showProjectFlag: false,
			projectIndex: 0,
			projectOption: [],

			showTipsConfirm: false,
			showTipsType: '',
			tipsContent: {
				0: '',
				1: '确定解散当前群组么?',
				2: '确定退出当前群组么?',
				3: '确定从群组移除选择的成员么?',
				4: '确定拒绝选择的成员么?'
			},

			voteStatus: {
				'-1': '未开启',
				0: '进行中',
				1: '已通过',
				2: '未通过',
				3: '已过期',
				4: '已关闭'
			}
		};
	},
	watch: {
		showTipsConfirm(newVal) {
			if (!newVal) {
				this.showTipsType = 0;
			}
		}
	},
	onLoad() {
		this.group_id = this.$Route.query.group_id;

		this.fetchGroupInfo();
	},
	methods: {
		fetchGroupInfo() {
			fetchDelegateGroupInfo({ group_id: this.group_id }).then(res => {
				this.groupInfo = res.data;
				this.isLeader = this.groupInfo.is_leader == 1;
			});
		},

		showDialog(type) {
			if (this.isLeader) {
				this.dialogShowType = type;
				this.dialogShowFlag = true;
			}
		},

		hideDialog() {
			this.dialogShowType = '';
			this.dialogShowFlag = false;
		},

		async handleDialogConfirm(val) {
			
			let METHOD = '',
				resData = null,
				paramsData = { group_id: this.group_id };

			switch (this.dialogShowType) {
				case 'resetName': // 群组重命名
					METHOD = resetDelegateGroupName;
					paramsData.group_name = val;
					resData = await METHOD(paramsData);
					break;

				case 'notice': // 修改群组公告
					METHOD = resetDelegateGroupNotice;
					paramsData.content = val;
					resData = await METHOD(paramsData);
					break;

				case 'vote': // 发起投票
					METHOD = createGroupVote;
					paramsData.tax = val;
					resData = await METHOD(paramsData);
					break;
			}

			this.fetchGroupInfo();
			this.hideDialog();
		},

		// 显示二维码
		showQrcode() {
			fetchGroupQrcode({ group_id: this.group_id }).then(res => {
				this.groupQrcode = res.data.url;
				this.qrcodeShowFlag = true;
			});
		},
		// 隐藏二维码
		hideQrcode() {
			this.qrcodeShowFlag = false;
		},

		// 选择产品
		selectProject() {
			if (!this.isLeader) {
				return;
			}
			if (this.groupInfo.series_id) {
				this.$u.toast('您的组群已绑定产品, 无法变更产品!');
				return;
			}
			
			fetchGroupProjectList({ group_id: this.group_id }).then(res => {
				this.projectOption = res.data;
				const targetIndex = this.projectOption.findIndex(item => item.selected == 1);
				this.projectIndex = targetIndex > -1 ? targetIndex : 0;
				this.showProjectFlag = true;
			});
		},
		// 确认产品
		confrimProject(detail) {
			const index = detail[0];
			resetGroupProject({
				group_id: this.group_id,
				series_id: this.projectOption[index].series_id
			}).then(res => {
				this.fetchGroupInfo();
			});
		},

		// 查看投票统计
		showVoteInfo() {
			fetchGroupVoteInfo({
				group_id: this.group_id,
				vote_id: this.groupInfo.vote_id
			}).then(res => {
				this.voteInfo = res.data;
				this.showVoteFlag = true;
			});
		},

		// 终止投票
		endVoting() {
			endGroupVote({ vote_id: this.groupInfo.vote_id }).then(res => {
				this.showVoteFlag = false;
				this.fetchGroupInfo();
			});
		},

		async showPopup(type) {
			if (!this.isLeader && type != 'all') {
				return;
			}
			this.showPopupType = type;

			const paramsData = { group_id: this.group_id };
			const methodConfig = {
				leader: fetchDelegateGroupMemberList,
				apply: fetchDelegateGroupJoinList,
				remove: fetchDelegateGroupMemberList,
				all: fetchAllDelegateList
			};

			const resData = await methodConfig[type](paramsData);

			this.popupDataList = resData.data
				.filter(item => item.is_leader != 1)
				.map(item => {
					item.checked = false; // 初始化 checkbox 的值(必须在父组件设置, 否则子组件 checkbox 不能双向绑定)
					return item;
				});
			this.selectAllFlag = false;
			this.showPopupSelect = true;
		},

		// 全选/取消全选
		checkAllChange(detail) {
			this.popupDataList = this.popupDataList.map(item => {
				item.checked = detail.value; // 修改 checkbox 的值(必须在父组件设置, 否则子组件 checkbox 不能双向绑定)
				return item;
			});
		},

		// 更新选中状态
		updateCheckStatus(detail) {
			const { value, index, single } = detail;
			if (single) {
				this.popupDataList.forEach(item => {
					item.checked = false;
				});
			}
			this.popupDataList[index].checked = value;
			this.selectAllFlag = this.popupDataList.every(item => item.checked);
		},

		confirmGroupLeader() {
			const memberList = this.popupDataList.filter(item => item.checked).map(item => item.member_id);
			if (memberList.length == 0) {
				this.$u.toast('请选择一位成员进行操作!');
				return;
			}
			resetDelegateGroupLeader({
				group_id: this.group_id,
				member_id: memberList[0]
			}).then(res => {
				this.reloadData();
			});
		},

		handleApply(type) {
			// type 1: 通过	2: 拒绝

			const memberList = this.popupDataList.filter(item => item.checked).map(item => item.member_id);

			if (memberList.length == 0) {
				this.$u.toast('请至少选择一位成员进行操作!');
				return;
			}
			handleApplyMember({
				group_id: this.group_id,
				approve: type,
				member_ids: memberList.join(',')
			}).then(res => {
				this.reloadData();
			});
		},
		handleMember(type = 1) {
			const KEY = {
				1: 'user_unionid',
				2: 'member_id'
			};
			const memberList = this.popupDataList.filter(item => item.checked).map(item => item[KEY[type]]);

			if (memberList.length == 0) {
				this.$u.toast('请至少选择一位成员进行操作!');
				return;
			}

			const METHODS = {
				1: addDelegateGroupMember,
				2: delDelegateGroupMember
			};
			const PARAMS = {
				1: 'add_user_unionids',
				2: 'member_ids'
			};

			METHODS[type]({
				group_id: this.group_id,
				[PARAMS[type]]: memberList.join(',')
			}).then(res => {
				this.reloadData();
			});
		},

		// 显示弹窗, 进行二次确认
		showConfirmModel(type) {
			if ([3, 4].indexOf(type) > -1) {
				const memberList = this.popupDataList.filter(item => item.checked);

				if (memberList.length == 0) {
					this.$u.toast('请至少选择一位成员进行操作!');
					return;
				}
			}

			// type 	1: 解散群组	2: 退出群组	3: 移除成员	4: 拒绝申请
			this.showTipsType = type;
			this.showTipsConfirm = true;
		},

		confirmHandleAgain() {
			// type 	1: 解散群组	2: 退出群组	3: 移除成员	4: 拒绝申请
			this.showPopupSelect = false;
			this.showPopupType = '';
			switch (this.showTipsType) {
				case 1:
					dissolveDelegateGroup({ group_id: this.group_id }).then(res => {
						this.showTipsConfirm = false;
						this.$Router.back(2);
					});
					break;

				case 2:
					// delDelegateGroupMember({
					// 	group_id: this.group_id,
					// 	del_user_unionids: `${this.yy_app_openid}`
					// }).then(res => {
					// 	this.showTipsConfirm = false;
					// 	this.$Router.back(2);
					// })
					break;

				case 3:
					this.handleMember(2);
					break;

				case 4:
					this.handleApply(2);
					break;
			}
		},

		reloadData() {
			this.showTipsType = '';
			this.showTipsConfirm = false;

			this.showPopupType = '';
			this.showPopupSelect = false;
			this.fetchGroupInfo();
		}
	}
};
</script>

<style lang="scss" scoped>
.page-wrap {
	padding: 0 30rpx 150rpx;
}
.cell-item {
	padding: 20rpx 0;
}
.btn-edit {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;
	height: 120rpx;
	color: $color-x9;
	background: #f7f8ff;
	border: 2rpx solid $color-45;
	font-size: 24rpx;
}

.popup-select-wrap {
	.footer {
		height: 120rpx;
	}
}

.popup-vote-wrap {
	.rate-wrap {
		flex-basis: 33.33%;
		height: 30rpx;
	}

	.legend {
		margin-right: 4rpx;
		width: 16rpx;
		height: 16rpx;
		border-radius: 4rpx;
	}

	.bg-1 {
		background: #5870fe;
	}
	.bg-2 {
		background: #ff982a;
	}
	.bg-3 {
		background: #c4c9d2;
	}

	.btn {
		margin-top: 20rpx;
		height: 72rpx;
		width: 100%;
		text-align: center;
		line-height: 72rpx;
		border-radius: 36rpx;
		color: $color-33;
		border: 2rpx solid $color-33;
		font-size: 28rpx;
	}
}

.fixed-footer {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 750rpx;
	height: 150rpx;
	background-color: $color-xf;
	.btn {
		height: 88rpx;
		width: 100%;
		text-align: center;
		line-height: 88rpx;
		border-radius: 44rpx;
		color: $color-33;
		border: 2rpx solid $color-33;
		font-size: 28rpx;
	}
}
</style>
