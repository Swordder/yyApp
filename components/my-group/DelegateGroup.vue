<template>
	<view>
		<view class="u-p-l-40 u-p-r-40 item-wrap" v-for="(item, index) in list" :key="index" @click="toDelegateGroupInfo(item)">
			<view class="u-p-t-20 u-p-b-20 u-flex u-row-between u-col-center u-border-bottom">
				<view class="item-title">{{ item.group_name }}</view>
				<project-tag :name="item.series_name" :type="1"></project-tag>
			</view>
			<view class="u-p-t-30 u-p-b-30 item-footer">{{ item.notice || '无公告内容' }}</view>
		</view>
	</view>
</template>

<script>
import ProjectTag from './ProjectTag.vue';
export default {
	name: 'DelegateGroup',
	components: {
		ProjectTag
	},
	props: {
		list: {
			type: Array,
			default: function() {
				return [];
			}
		}
	},
	data() {
		return {};
	},
	methods: {
		toDelegateGroupInfo(item) {
			this.$Router.push('/pages/myGroup/groupInfo?group_id='+ item.group_id);
		}
	}
};
</script>

<style lang="scss" scoped>
.item-wrap {
	background: $color-xf;
	border-bottom: 20rpx solid $color-f5;
}

.item-title {
	font-size: 32rpx;
	font-weight: 600;
	color: $color-x3;
}

.item-tag {
	padding: 0 16rpx;
	color: $color-xf;
	border-radius: 20rpx 4rpx 20rpx 4rpx;
	height: 40rpx;
	line-height: 40rpx;
	font-size: 20rpx;
	&.tag-1 {
		background: $color-31;
	}
	&.tag-2 {
		background: $color-33;
	}
}

.item-footer {
	color: $color-x9;
	font-size: 24rpx;
}
</style>
