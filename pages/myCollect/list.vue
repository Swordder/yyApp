<template>
	<view>
		<!-- <u-sticky h5-nav-height="44" :enable="enableSticky">
			<view class="u-flex u-row-between u-p-30" style="background: #FFFFFF;">
				<u-search placeholder="搜索" v-model="keywords" :show-action="false" />
			</view>
		</u-sticky> -->
		<view class="list-wrap">
			<u-swipe-action 
				v-for="(item, index) in list" 
				:key="index" 
				:index="index" 
				:show="item.show" 
				:options="options" 
				@open="handleOpen"
				@click="handleBtnClick" 
				@content-click="handleContentClick"
			>
				<view class="item-wrap u-flex u-p-t-30 u-p-b-30 u-border-bottom">
					<u-image width="80rpx" height="80rpx" :src="item.img" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="u-m-l-30">
						<view class="item-title u-font-28">{{ item.title }}</view>
						<view class="u-font-20 u-m-t-8">{{ item.created_at }}</view>
					</view>
				</view>
			</u-swipe-action>
		</view>

		<u-empty v-if="list.length == 0" mode="favor" margin-top="40"></u-empty>

		<!-- 删除 -->
		<u-modal v-model="showDelConfirm" content="是否删除当前收藏内容?" show-cancel-button @confirm="confirmDelCollect"></u-modal>
	</view>
</template>

<script>
import { fetchCollectDetail, collectdelContent } from '@/api/myCollect.js';
export default {
	data() {
		return {
			enableSticky: true, // 处理吸顶组件报错, 配合 onshow onhide
			keywords: '',
			list: [],
			options: [
				{
					text: '删除',
					style: {
						width: '160rpx',
						backgroundColor: '#FF5252'
					}
				}
			],

			showDelConfirm: false,
			targetIndex: -1
		};
	},
	watch: {
		showDelConfirm(newVal) {
			if (!newVal) {
				this.targetIndex = -1;
			}
		}
	},
	onLoad() {
		this.fetchDetail();
	},
	onShow() {
		this.enableSticky = true;
	},
	onHide() {
		this.enableSticky = false;
	},
	methods: {
		fetchDetail() {
			const { fav_id } = this.$Route.query;
			fetchCollectDetail({ fav_id }).then(res => {
				const resData = res.data;
				
				if(resData.title) {
					uni.setNavigationBarTitle({
						title: resData.title
					});
				}

				const list = resData.list || [];
				this.list = list.map(item => {
					item.show = false;
					return item;
				});
				
			});
		},
		
		handleContentClick(index) {
			
			const { resource_id: id, resource_type: type } = this.list[index]
			
			const pathConfig = {
				2: '/pages/articleDetail/articleDetail'
			}
			
			if(pathConfig[type]) {
				this.$Router.push({
					path: pathConfig[type],
					query:{
						id
					}
				})
			}
			
			
		},

		handleBtnClick(itemIndex, btnIndex) {
			console.log(itemIndex, btnIndex);
			this.showDelConfirm = true;
			this.targetIndex = itemIndex;
		},
		// 删除收藏夹内容
		confirmDelCollect() {
			const { fav_id } = this.$Route.query;
			const { detail_id } = this.list[this.targetIndex];
			collectdelContent({ fav_id, detail_id }).then(res => {
				this.fetchDetail();
			});
		},

		handleOpen(index) {
			// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
			// 原本为'false'，再次设置为'false'会无效
			this.list[index].show = true;
			this.list.map((val, idx) => {
				if (index != idx) this.list[idx].show = false;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
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
</style>
