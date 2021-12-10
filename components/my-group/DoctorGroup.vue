<template>
	<u-collapse ref="collapse">
		<u-collapse-item v-for="(item, index) in list" :key="index" class="u-border-bottom" :class="{ 'group-collapse-wrap': !disabled }" @change="toEditGroup(item)">
			<u-section slot="title-all" class="u-p-l-30 u-p-r-30" lineColor="#5870FE" color="#333" :title="`${item.group_name}`" :arrow="false">
				<view slot="right" class="u-flex u-col-top">
					<view class="">( {{ item.group_num }} )</view>
					<u-icon name="arrow-right" size="30"></u-icon>
				</view>
			</u-section>

			<view v-if="!disabled"><doctor-list :list="item.members" :canCheck="$attrs.canCheck"></doctor-list></view>
		</u-collapse-item>
	</u-collapse>
</template>

<script>
/*
	list	群组列表数据
	disabled	是否可展开
	
	DoctorList	群组医生列表

*/
import DoctorList from './DoctorList.vue';
export default {
	name: 'DoctorGroup',
	props: {
		list: {
			type: Array,
			default: function() {
				return [];
			}
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	components: {
		DoctorList
	},
	data() {
		return {};
	},
	mounted() {
		setTimeout(() => {
			this.$refs.collapse.init()
		}, 200)
	},
	methods: {
		toEditGroup(item) {
			if (this.disabled) {
				this.$u.vuex('edit_doctor_group', item);
				this.$Router.push('/pages/myGroup/editDoctorGroup?type=1&groupId=' + item.group_id);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.group-collapse-wrap {
	border-bottom: 20rpx solid $color-f5;
}
</style>
