<template>
	<view>
		<doctor-group :list="groupList" :disabled="true"></doctor-group>
		
		<u-empty v-if="groupList.length == 0" margin-top="40"></u-empty>
	</view>
</template>

<script>
	import { fetchDoctorGroupList } from '@/api/myGroup.js';
	
	import DoctorGroup from '@/components/my-group/DoctorGroup.vue';
	export default {
		components: {
			DoctorGroup
		},
		data() {
			return {
				groupList: []
			};
		},
		onShow() {
			this.fetchList()
		},
		methods: {
			// 获取群组列表
			fetchList() {
				fetchDoctorGroupList().then( res => {
					this.groupList = res.data;
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
