<template>
	<view>
		<!-- 吸顶 -->
		<u-sticky :enable="enableSticky">
			<!-- 只能有一个根元素 -->
			<view class="page-header u-p-30 u-rela">
				<view class="u-flex u-row-between u-col-center">
					<view class="title u-font-32">{{ TITLE[groupType] || '' }}</view>
					<u-icon name="plus-circle-fill" size="48" color="#fff" @click="handleAddBtn" />
				</view>
				<u-search class="u-m-t-30" placeholder="请输入" v-model="keywords" bg-color="#fff" :show-action="false" clearabled @change="searchGroup"></u-search>
			</view>
		</u-sticky>

		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
			<!-- 医生群组列表 -->
			<doctor-group v-if="groupType == 1" :list="groupList"></doctor-group>

			<!-- 代表群组列表 -->
			<delegate-group v-if="groupType == 2" :list="groupList"></delegate-group>

			<!-- 列表为空 -->
			<u-empty v-if="groupList.length == 0" text="暂无数据" mode="list" margin-top="80"></u-empty>
		</mescroll-body>

		<!-- 菜单弹窗 -->
		<u-mask :show="showMenuPopup" @click="showMenuPopup = false">
			<view v-if="showMenuPopup" class="popup-menu">
				<view class="menu-item u-flex u-col-center" v-for="(menu, index) in MENU" :key="index" @click="handleMenuClick(menu)">
					<u-icon :name="menu.icon" custom-prefix="custom-icon" size="36"></u-icon>
					<view class="u-m-l-14">{{ menu.name }}</view>
				</view>
			</view>
		</u-mask>

		<!-- 新建分组弹窗 -->
		<dialog-input v-if="dialogShowFlag" :show="dialogShowFlag" :dialogType="dialogShowType" @dialogConfirm="handleDialogConfirm" @dialogClose="hideDialog" />

		<!-- 二维码 -->
		<my-qrcode v-if="showQrcode" :show="showQrcode" :url="qrcodeUrl" @hide="hideQrcode" />
	</view>
</template>

<script>
const TITLE = {
	1: '我的医生服务组',
	2: '我的代表群组'
};
const MENU = [
	{
		icon: 'erweima1',
		name: '我的二维码',
		type: 'qrcode'
	},
	{
		icon: 'jiarubanji',
		name: '待加入列表',
		type: 'link',
		path: '/pages/myGroup/editDoctorGroup?type=2'
	},
	{
		icon: 'xinjian',
		name: '新建分组',
		type: 'createGroup'
	},
	{
		icon: 'shezhi',
		name: '管理分组',
		type: 'link',
		path: '/pages/myGroup/list'
	}
];

import DoctorGroup from '@/components/my-group/DoctorGroup.vue';
import DelegateGroup from '@/components/my-group/DelegateGroup.vue';
import DialogInput from '@/components/my-group/DialogInput.vue';
import MyQrcode from '@/components/my-group/MyQrcode.vue';

import { 
	fetchDelegateGroupList,
	createDelegateGroup,
	fetchAllDoctorGroupMsg,
	createDoctorGroup,
	fetchMyDoctorGroupQrcode
} from '@/api/myGroup.js';

import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';

export default {
	components: {
		DoctorGroup,
		DelegateGroup,
		DialogInput,
		MyQrcode
	},
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			TITLE,
			MENU,
			enableSticky: true, // 处理吸顶组件报错, 配合 onshow onhide

			dialogShowFlag: false,
			dialogShowType: '',

			groupType: '', // 1: 医生群组		2: 代表群组
			keywords: '',
			showMenuPopup: false,

			showQrcode: false,
			qrcodeUrl: '',

			groupList: [],

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
	watch: {
		showMenuPopup(newVal) {
			console.log(newVal);
		}
	},
	onShow() {
		this.enableSticky = true;
		
		setTimeout(() => {
			this.groupList = []; // 置空列表,显示加载进度条
			this.mescroll.resetUpScroll();
			this.mescroll.scrollTo(0, 0);
		}, 10)
	},
	onHide() {
		this.enableSticky = false;
	},
	onLoad() {
		this.groupType = this.$Route.query.type || 1;
	},
	methods: {
		// 获取群组列表
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			// page.num, page.size, keyword
			
			const keys = {
				1: 'group_name',
				2: 'key_word'
			}
			
			const paramsData = {
				[keys[this.groupType]]: this.keywords,
				page: page.num,
				page_size: page.size
			};

			const METHODS = this.groupType == 1 ? fetchAllDoctorGroupMsg : fetchDelegateGroupList;

			METHODS(paramsData)
				.then(res => {
					
					const curPageData = this.groupType == 1 ? res.data : res.data.list;
					const totalSize = this.groupType == 1 ? curPageData.length : res.data.total;
					const curPageLen = curPageData.length;
					if (page.num == 1) {
						this.groupList = []; //如果是第一页需手动制空列表
					}

					this.groupList = this.groupList.concat(curPageData); //追加新数据

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
		
		searchGroup(){
			this.$u.throttle(() => {
				this.mescroll.resetUpScroll();
			}, 1000)
		},

		// 点击右上角 + 按钮
		handleAddBtn() {
			if (this.groupType == 1) {
				this.showMenuPopup = true;
			} else if (this.groupType == 2) {
				this.handleMenuClick({ type: 'createGroup' });
			}
		},

		// 点击菜单
		handleMenuClick(menu) {
			console.log(menu);
			this.showMenuPopup = false;
			if (menu.type === 'link') {
				this.$Router.push(menu.path);
			} else if (menu.type === 'qrcode') {
				fetchMyDoctorGroupQrcode().then(res => {
					this.qrcodeUrl = res.data.url;
					this.showQrcode = true;
				})
			} else if (menu.type === 'createGroup') {
				this.showDialog('createGroup');
			}
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
			console.log(val);
			let resData = null;
			if(this.dialogShowType == 'createGroup') {
				if(this.groupType == 1) {
					resData = await createDoctorGroup({ group_name: val })
				}else if(this.groupType == 2) {
					resData = await createDelegateGroup({ group_name: val })
				}
				// this.keywords = '';
				resData && resData.errcode == 0 && this.searchGroup();
			}
			
			this.hideDialog();
		},

		hideQrcode() {
			this.showQrcode = false;
			this.qrcodeUrl = '';
		}
	}
};
</script>

<style lang="scss" scoped>
.page-header {
	width: 750rpx;
	// height: 200rpx;
	background: $color-31;
	.title {
		color: $color-xf;
		font-weight: 900;
	}
}

// 菜单弹窗
.popup-menu {
	padding: 20rpx 0;
	position: absolute;
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

.group-collapse-wrap {
	border-bottom: 20rpx solid $color-f5;
}
</style>
