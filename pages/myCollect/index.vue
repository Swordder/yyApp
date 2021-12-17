<template>
	<view class="page-wrap">
		<!-- <u-sticky h5-nav-height="44" :enable="enableSticky">
			<view class="u-flex u-row-between u-p-l-30" style="background: #FFFFFF;">
				<u-search placeholder="搜索" v-model="keywords" :show-action="false" />
				<u-icon class="u-p-30" name="/static/images/myCollect/icon-add.png" size="48" @click="showAddConfirm = true" />
			</view>
		</u-sticky> -->
		<view class="list-wrap">
			<u-swipe-action
				v-for="(item, index) in list"
				:key="index"
				:index="index"
				:show="item.show"
				:options="options"
				@click="handleBtnClick"
				@open="handleOpen"
				@content-click="handleContentClick"
			>
				<view class="item-wrap u-flex u-p-t-30 u-p-b-30 u-border-bottom">
					<checkbox :checked="targetIndex == index" v-if="pageType == 'select'" />

					<u-image width="80rpx" height="80rpx" src="/static/images/myCollect/icon-item.png" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="u-m-l-30">
						<view class="item-title u-font-28">{{ item.title }}</view>
						<view class="u-font-20 u-m-t-8">{{ item.count }}个内容</view>
					</view>
				</view>
			</u-swipe-action>
		</view>

		<u-empty v-if="list.length == 0" mode="favor" margin-top="40"></u-empty>

		<!-- 新增 -->
		<view class="fixed-footer u-border-top u-flex u-row-around u-col-center">
			<u-button type="primary" class="" @click="showDialog(1)">新增收藏夹</u-button>
			<u-button type="success" class="" @click="joinCollect" v-if="pageType == 'select'">加入收藏夹</u-button>
		</view>

		<!-- 删除 -->
		<u-modal v-model="showDelConfirm" content="是否删除当前收藏夹?" show-cancel-button @confirm="confirmDelCollect"></u-modal>
		<!-- 新增 -->
		<dialog-input v-if="showDialogFlag" :show="showDialogFlag" dialogType="collect" @dialogConfirm="confirmCollectInfo" @dialogClose="hideDialog" />
	</view>
</template>

<script>
import { fetchCollectList, createCollect, deleteCollect, renameCollect, collectAddContent } from '@/api/myCollect.js';

import DialogInput from '@/components/my-group/DialogInput.vue';
export default {
	components: {
		DialogInput
	},
	data() {
		return {
			enableSticky: true, // 处理吸顶组件报错, 配合 onshow onhide
			keywords: '',
			list: [],
			options: [
				{
					text: '重命名',
					style: {
						width: '160rpx',
						backgroundColor: '#0000ff'
					}
				},
				{
					text: '删除',
					style: {
						width: '160rpx',
						backgroundColor: '#FF5252'
					}
				}
			],

			showDelConfirm: false,
			showDialogFlag: false,
			showDialogType: '',

			targetIndex: -1,

			pageType: ''
		};
	},
	watch: {
		showDialogFlag(newVal) {
			if (newVal) {
				this.collectName = '';
			}
		}
	},
	onLoad() {
		/**
		 * /pages/myCollect/index?type=select&resource_id=xxx&resource_type=x
		 *
		 * type	页面类型, 默认为空. select 选择收藏夹
		 * resource_id	资源id
		 * resource_type	1 表示视频 2 表示文献 3表示公告 4 直播视频 5大咖系列 9最新解读
		 * */

		this.pageType = this.$Route.query.type || '';

		
	},
	onShow() {
		this.enableSticky = true;
		
		this.fetchList();
	},
	onHide() {
		this.enableSticky = false;
	},
	methods: {
		fetchList() {
			fetchCollectList().then(res => {
				const resData = res.data || [];
				this.list = resData.map(item => {
					item.show = false;
					return item;
				});
			});
		},

		handleContentClick(index) {
			this.targetIndex = index;
			if (this.pageType != 'select') {
				this.$Router.push(`/pages/myCollect/list?fav_id=${this.list[index].fav_id}`);
			}
		},

		handleBtnClick(itemIndex, btnIndex) {
			console.log(itemIndex, btnIndex);
			this.targetIndex = itemIndex;
			if (btnIndex == 1) {
				this.showDelConfirm = true;
			} else {
				this.showDialog(2);
			}
		},

		// 删除收藏夹
		confirmDelCollect() {
			const { fav_id } = this.list[this.targetIndex];
			deleteCollect({ fav_id }).then(res => {
				this.hideDialog();
				this.fetchList();
			});
		},

		// 确认收藏夹信息	1: 新增		2: 重命名
		confirmCollectInfo(val) {
			console.log(val);

			const METHOD = {
				1: createCollect,
				2: renameCollect
			};

			const params = {
				title: val
			};

			if (this.showDialogType == 2) {
				params.fav_id = this.list[this.targetIndex].fav_id;
			}

			METHOD[this.showDialogType](params).then(res => {
				console.log(res);
				this.hideDialog();
				this.fetchList();
			});
		},

		joinCollect() {
			if (this.targetIndex == -1) {
				this.$u.toast('请选择一个收藏夹!');
			} else {
				// resource_id	资源id
				// resource_type 1 表示视频 2 表示 文献 3表示公告 4 直播视频 5大咖系列 9最新解读
				const { resource_id, resource_type } = this.$Route.query;
				const params = { resource_id, resource_type };
				params.fav_id = this.list[this.targetIndex].fav_id;
				collectAddContent(params).then(res => {
					console.log(res);
					this.$Router.back();
				});
			}
		},

		showDialog(type) {
			this.showDialogType = type;
			this.showDialogFlag = true;
		},

		hideDialog() {
			this.showDialogType = '';
			this.targetIndex = -1;
			this.showDialogFlag = false;
		},

		handleOpen(index) {
			// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
			// 原本为'false'，再次设置为'false'会无效
			this.list[index].show = true;
			this.list.map((val, idx) => {
				if (index != idx) {
					this.list[idx].show = false;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.page-wrap {
	padding-bottom: 120rpx;
}
.list-wrap {
	padding: 0 30rpx;
}
.item-wrap {
	color: $color-x9;
	.item-title {
		color: $color-x3;
		font-weight: 900;
	}
}

.fixed-footer {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100vw;
	height: 120rpx;
	background: $color-xf;
}
</style>
