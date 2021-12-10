<template>
	<view class="tag-wrap" :class="[tagClass]" :style="{ background: bg }">{{ name || '暂无产品' }}</view>
</template>

<script>
/* 
	name	产品名称
	type	产品类型, 预设背景
	bg		自定义背景色
*/
export default {
	name: 'ProjectTag',
	props: {
		name: {
			type: String,
			default: ''
		},
		type: {
			type: [String, Number],
			default: 1
		},
		bg: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			tagClass: ''
		};
	},
	created() {
		this.tagClass = `tag-${this.type}`;
	}
};
</script>

<style lang="scss" scoped>
.tag-wrap {
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
</style>
