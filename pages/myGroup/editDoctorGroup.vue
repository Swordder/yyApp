<template>
	<view class="page-wrap">
		<!-- 吸顶 -->
		<u-sticky :enable="enableSticky">
			<!-- 只能有一个根元素 -->
			<view class="page-header u-rela">
				<view class="u-flex u-row-between u-col-center u-p-30">
					<template v-if="editType == 1">
						<view class="title u-font-32">{{ edit_doctor_group.group_name }}</view>
						<u-icon name="more-circle-fill" size="48" color="#fff" @click="showMenuPopup = true" />
					</template>
					<template v-if="editType == 2">
						<view class="title u-font-32">我的医生服务群组</view>
					</template>
				</view>
				<view class="select-all u-p-30 u-flex u-col-center u-border-bottom">
					<u-checkbox @change="pageCheckAll" v-model="pageAllFlag" />
					<view class="">全选</view>
				</view>
			</view>
		</u-sticky>
		<u-gap height="20" bg-color="#f5f5f5"></u-gap>

		<doctor-list :list="pageDataList" :canCheck="true" @change="updatePageCheckStatus"></doctor-list>

		<u-gap height="20" bg-color="#f5f5f5"></u-gap>
		<view class="fixed-footer u-flex u-row-between u-col-center u-border-top">
			<template v-if="editType == 1">
				<u-button shape="circle" type="primary" plain :custom-style="btnStyle1" @click="showConfirmModel(2)">删除成员</u-button>
				<u-button shape="circle" type="primary" :custom-style="btnStyle2" @click="selectGroup">移动到分组</u-button>
			</template>
			<template v-if="editType == 2">
				<u-button shape="circle" type="primary" plain :custom-style="btnStyle1" @click="confirmDoctorAdd(0)">取消</u-button>
				<u-button shape="circle" type="primary" :custom-style="btnStyle2" @click="confirmDoctorAdd(1)">通过</u-button>
			</template>
		</view>

		<!-- 菜单弹窗 -->
		<u-mask v-if="showMenuPopup" :zoom="false" :show="showMenuPopup" @click="showMenuPopup = false">
			<view v-if="showMenuPopup"  class="popup-menu" @tap.stop>
				<view class="menu-item u-flex u-col-center" v-for="(menu, index) in MENU" :key="index" @click="handleMenuClick(menu)">
					<u-icon :name="menu.icon" size="36"></u-icon>
					<view class="u-m-l-14">{{ menu.name }}</view>
				</view>
			</view>
		</u-mask>

		<!-- 重命名分组弹窗 -->
		<dialog-input v-if="dialogShowFlag" :show="dialogShowFlag" :dialogType="dialogShowType" @dialogConfirm="handleDialogConfirm" @dialogClose="hideDialog" />

		<!-- 删除提示 -->
		<u-modal v-if="showTipsConfirm" v-model="showTipsConfirm" :content="tipsContent[showTipsType]" async-close show-cancel-button @confirm="confirmHandleAgain"></u-modal>

		<!-- 添加医生 -->
		<u-popup v-if="showAddDoctor" mode="center" v-model="showAddDoctor" width="570rpx" border-radius="16">
			<view class="popup-select-doctor">
				<view class="u-p-30 u-text-center u-border-bottom">添加医生</view>
				<scroll-view scroll-y="true" style="height: 440rpx;">
					<doctor-list :list="popupDataList" :canCheck="true" @change="updatePopupCheckStatus"></doctor-list>
				</scroll-view>
				<view class="u-flex u-row-between u-col-center footer u-p-30 u-border-top">
					<view class="u-flex u-col-center">
						<u-checkbox @change="popupCheckAll" v-model="popupAllFlag" />
						<view class="">全选</view>
					</view>
					<u-button @click="confirmDoctorAdd(2)" shape="circle" type="primary" size="medium" :custom-style="btnStyle3">批量加入</u-button>
				</view>
			</view>
		</u-popup>

		<!-- 选择分组 -->
		<u-picker mode="selector" v-model="selectShowFlag" :default-selector="[rangeIndex]" range-key="group_name" :range="rangeOption" @confirm="confrimSelectGroup"></u-picker>
	</view>
</template>

<script>
import DoctorList from '@/components/my-group/DoctorList.vue';
import DialogInput from '@/components/my-group/DialogInput.vue';

import {
	renameDoctorGroup,
	delDoctorGroup,
	fetchDoctorGroupMemberList,
	joinDefaultDoctorGroup,
	fetchDoctorGroupJoinList,
	delDoctorGroupMember,
	moveDoctorGroupMember,
	joinDoctorGroup,
	fetchDoctorGroupList
} from '@/api/myGroup.js';

const MENU = [
	{
		icon: 'plus-people-fill',
		name: '添加医生',
		type: 'addDoctor'
	},
	{
		icon: 'trash',
		name: '删除分组',
		type: 'delGroup'
	},
	{
		icon: 'edit-pen',
		name: '分组重命名',
		type: 'resetName'
	}
];
const btnStyle1 = {
	margin: '0',
	width: '190rpx',
	height: '88rpx',
	borderRadius: '44rpx'
};
const btnStyle2 = {
	margin: '0',
	width: '480rpx',
	height: '88rpx',
	borderRadius: '44rpx'
};
const btnStyle3 = {
	margin: '0',
	width: '220rpx',
	height: '72rpx',
	borderRadius: '36rpx'
};
export default {
	components: {
		DoctorList,
		DialogInput
	},
	data() {
		return {
			btnStyle1,
			btnStyle2,
			btnStyle3,
			enableSticky: false,
			MENU,

			editType: 1, // 1:群组编辑	2: 待加入列表
			showMenuPopup: false,
			pageDataList: [],
			popupDataList: [],

			pageAllFlag: false,
			popupAllFlag: false,

			dialogShowFlag: false,
			dialogShowType: '',

			showTipsConfirm: false,
			showTipsType: '',
			tipsContent: {
				0: '',
				1: '确定删除当前群组么?',
				2: '确定删除选中成员么?',
				3: '确定将选中成员移动到目标群组么?'
			},

			showAddDoctor: false,

			selectShowFlag: false,
			rangeIndex: 0,
			rangeOption: [],
			moveTargetGroup: ''
		};
	},
	onShow() {
		this.enableSticky = true;
	},
	onHide() {
		this.enableSticky = false;
	},
	onLoad() {
		this.editType = this.$Route.query.type || 1;
		this.groupId = this.$Route.query.groupId;

		this.fetchList();
	},
	methods: {
		async fetchList(type) {
			const TYPE = type || this.editType;
			const METHOD = {
				1: fetchDoctorGroupMemberList,
				2: fetchDoctorGroupJoinList
			};
			const params = {};
			if (TYPE == 1 && !this.showAddDoctor) {
				params.group_id = this.groupId;
			}
			const resData = await METHOD[TYPE](params);
			if (resData.errcode == 0) {
				let result = 'pageDataList';
				if (this.showAddDoctor) {
					result = 'popupDataList';
				}

				this[result] = resData.data.map(item => {
					item.checked = false; // 修改 checkbox 的值(必须在父组件设置, 否则子组件 checkbox 不能双向绑定)
					return item;
				});
			}
		},

		handleMenuClick(menu) {
			this.showMenuPopup = false;
			if (menu.type === 'addDoctor') {
				this.showAddDoctor = true;
				this.fetchList(1);
			} else if (menu.type === 'delGroup') {
				this.showConfirmModel(1);
			} else if (menu.type === 'resetName') {
				this.showDialog('resetName');
			}
		},

		// 全选/取消全选
		pageCheckAll(detail) {
			this.pageDataList = this.pageDataList.map(item => {
				item.checked = detail.value; // 修改 checkbox 的值(必须在父组件设置, 否则子组件 checkbox 不能双向绑定)
				return item;
			});
		},

		// 更新选中状态
		updatePageCheckStatus(detail) {
			const { value, index } = detail;
			this.pageDataList[index].checked = value;
			this.pageAllFlag = this.pageDataList.every(item => item.checked);
		},

		popupCheckAll(detail) {
			this.popupDataList = this.popupDataList.map(item => {
				item.checked = detail.value; // 修改 checkbox 的值(必须在父组件设置, 否则子组件 checkbox 不能双向绑定)
				return item;
			});
		},
		updatePopupCheckStatus(detail) {
			const { value, index } = detail;
			this.popupDataList[index].checked = value;
			this.popupAllFlag = this.popupDataList.every(item => item.checked);
		},

		showDialog(type) {
			this.dialogShowType = type;
			this.dialogShowFlag = true;
		},

		hideDialog() {
			this.dialogShowType = '';
			this.dialogShowFlag = false;
		},

		async handleDialogConfirm(val) {
			let METHOD = '',
				resData = null,
				paramsData = { group_id: this.groupId };

			switch (this.dialogShowType) {
				case 'resetName': // 群组重命名
					METHOD = renameDoctorGroup;
					paramsData.group_name = val;
					resData = await METHOD(paramsData);
					if (resData.errcode == 0) {
						this.$u.vuex('edit_doctor_group', Object.assign(this.edit_doctor_group, resData.data));
					}
					break;
			}
			this.hideDialog();
		},

		confirmDoctorAdd(type) {
			
			let METHOD = joinDefaultDoctorGroup;
			let TARGET = this.pageDataList;
			
			if(type == 2) {
				METHOD = joinDoctorGroup;
				TARGET = this.popupDataList;
			}
			
			let memberList = TARGET.filter(item => item.checked).map( item => item.r_id );
			
			if(memberList.length == 0) {
				this.$u.toast('请至少选择一位成员进行操作!');
				return
			}
			const paramsData = {
				r_ids: memberList.join(',')
			}
			
			if(type == 0) {
				paramsData.approve = 3
			} else if(type == 1) {
				paramsData.approve = 1
			} else if(type == 2) {
				paramsData.group_id = this.groupId;
			}
			
			METHOD(paramsData).then( res => {
				this.showAddDoctor = false;
				this.fetchList();
			})
			
		},

		selectGroup() {
			if(this.hasNoSelect()) {return};

			fetchDoctorGroupList().then(res => {
				this.rangeOption = res.data;
				this.selectShowFlag = true;
			});
		},
		confrimSelectGroup(detail) {
			this.moveTargetGroup = this.rangeOption[detail[0]].group_id;
			this.showConfirmModel(3);
		},

		// 显示弹窗, 进行二次确认
		showConfirmModel(type) {
			if ([2, 3].indexOf(type) > -1) {
				if(this.hasNoSelect()) {return};
			}

			// type 	1: 删除群组	2: 删除成员	3: 移动成员
			this.showTipsType = type;
			this.showTipsConfirm = true;
		},

		confirmHandleAgain() {
			// type 	1: 删除群组	2: 删除成员	3: 移动成员
			this.showPopupSelect = false;
			this.showPopupType = '';
			const memberList = this.pageDataList.filter(item => item.checked).map( item => item.member_id );
			switch (this.showTipsType) {
				case 1:
					delDoctorGroup({ group_id: this.groupId }).then(res => {
						this.showTipsConfirm = false;
						this.$Router.back();
					});
					break;

				case 2:
					delDoctorGroupMember({ group_id: this.groupId, member_ids: memberList.join(',') }).then(res => {
						console.log(res);
						this.reloadData()
						this.fetchList();
					});
					break;

				case 3:
					moveDoctorGroupMember({ group_id: this.moveTargetGroup, member_ids: memberList.join(',') }).then(res => {
						console.log(res);
						this.reloadData()
						this.fetchList();
					});
					break;
			}
		},
		
		hasNoSelect() {
			const memberList = this.pageDataList.filter(item => item.checked);
			
			if (memberList.length == 0) {
				this.$u.toast('请至少选择一位成员进行操作!');
				return true;
			}
			
			return false;
		},
		reloadData() {
			this.showTipsType = '';
			this.showTipsConfirm = false;
			
			this.showPopupSelect = false;
			this.showPopupType = '';
			
			this.pageAllFlag = false;
			this.popupAllFlag = false;
			
			this.showAddDoctor = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.page-wrap {
	padding-bottom: 180rpx;
}
.page-header {
	width: 750rpx;
	// height: 200rpx;
	background: $color-31;
	.title {
		color: $color-xf;
		font-weight: 900;
	}

	.select-all {
		color: $color-x3;
		background-color: $color-xf;
	}
}

// 菜单弹窗
.popup-menu {
	padding: 20rpx 0;
	position: absolute;
	// top: 100rpx;
	top: calc(var(--status-bar-height) + var(--window-top) + 100rpx);
	right: 50rpx;
	width: 270rpx;
	background-color: $color-xf;
	border-radius: 8rpx;
	z-index: 99999;
	&::before {
		content: '';
		position: absolute;
		top: -8rpx;
		right: 0;
		width: 30rpx;
		height: 30rpx;
		background-color: $color-xf;
		transform: skewY(-30deg);
	}
	.menu-item {
		padding: 20rpx 0 20rpx 30rpx;
		height: 80rpx;
		font-size: 28rpx;
		color: $color-x3;
	}
}

.popup-select-doctor {
	.footer {
		height: 120rpx;
	}
}

.fixed-footer {
	position: fixed;
	bottom: 0;
	left: 0;
	padding: 30rpx;
	width: 750rpx;
	height: 160rpx;
	background-color: $color-xf;
	z-index: 99;
}
</style>
