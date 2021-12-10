<template>
	<view class="u-p-l-30 u-p-r-30">
		<view class="u-flex u-col-center u-border-bottom u-p-t-20 u-p-b-20" v-for="(item, index) in list" :key="index" @click="toDoctorInfo(index)">
			<u-checkbox v-if="canCheck" style="flex-shrink: 0;" @change="checkboxChange" v-model="item.checked" :name="index" @click.native.stop />

			<view class="u-flex u-col-center u-flex-1 u-line-1">
				<u-image width="88" height="88" border-radius="16" style="flex-shrink: 0;" :src="item.headimgurl"></u-image>
				<view class="u-m-l-20">
					<view class="u-font-28 " style="color: #333;">{{ item.name || item.nickname || item.openid }}</view>
					<u-tag v-if="item.hospital_name" :text="item.hospital_name" mode="dark" size="mini" bg-color="#4ED79C" />
				</view>
			</view>
		</view>
		
		<!-- 列表为空 -->
		<u-empty v-if="list.length == 0" text="暂无成员" mode="favor" margin-top="40"></u-empty>
	</view>
</template>

<script>
/*
	list	父组件传入的数据
	
	canCheck		是否可选
	
	@checkboxChange		选项状态改变, 向父组件提交数据
	@toDoctorInfo			根据 canCheck, true 选择医生, false 跳转医生详情

*/
export default {
	name: 'DoctorList',
	props: {
		list: {
			type: Array,
			default: function() {
				return [];
			}
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
				index: detail.name
			})
		},

		toDoctorInfo(index) {
			const target = this.list[index];
			if (this.canCheck) {
				this.$emit('change', {
					value: !target.checked,
					index: index
				})
			} else {
				// target
				this.$Router.push(`/pages/myGroup/doctorInfo?member_id=${target.member_id || ''}&r_id=${target.r_id || ''}`);
			}
		}
	}
};
</script>

<style lang="scss"></style>
