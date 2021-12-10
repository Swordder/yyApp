<template>
	<view class="u-p-l-30 u-p-t-2 u-p-r-30 u-border-top">
		<view class="u-flex u-col-center u-border-bottom u-p-t-20 u-p-b-20" v-for="(item, index) in list" :key="index" @click="checkItem(index)">
			<u-checkbox v-if="canCheck" @change="checkboxChange" v-model="item.checked" :name="index" @click.native.stop />

			<view class="u-flex u-col-center u-flex-1">
				<u-image width="60" height="60" border-radius="8" :src="item.headimgurl"></u-image>
				<view class="u-m-l-20 u-flex-1 u-flex u-col-center">
					<view class="u-font-28 " style="color: #333; font-weight: 600;">{{ item.name || item.realname }}</view>
					<u-tag v-if="item.is_leader == 1" class="u-m-l-20" text="群主" mode="dark" size="mini" />
				</view>
				<view class="u-flex u-col-center" v-if="showNum">
					<view class="u-font-24" style="color: #999;">医院</view>
					<view class="num-wrap">{{ item.hospital_num }}</view>
				</view>
			</view>
		</view>

		<!-- 列表为空 -->
		<u-empty v-if="list.length == 0" text="暂无成员" mode="favor" margin-top="80"></u-empty>
	</view>
</template>

<script>
export default {
	name: 'DelegateList',
	props: {
		list: {
			type: Array,
			default: function() {
				return [];
			}
		},
		showNum: {
			type: Boolean,
			default: false
		},
		canCheck: {
			type: Boolean,
			default: false
		},
		single: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {};
	},
	methods: {
		checkboxChange(detail) {
			this.$emit('change', {
				value: detail.value,
				index: detail.name,
				single: this.single
			});
		},

		checkItem(index) {
			if (this.canCheck) {
				this.$emit('change', {
					value: !this.list[index].checked,
					index: index,
					single: this.single
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.num-wrap {
	margin-left: 12rpx;
	width: 40rpx;
	height: 40rpx;
	text-align: center;
	line-height: 40rpx;
	border-radius: 50%;
	background: $color-31;
	font-size: 24rpx;
	color: $color-xf;
}
</style>
