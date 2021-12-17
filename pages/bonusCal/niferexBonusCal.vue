<template>
	<view class="content">
		<view class="tabs_wrap u-p-t-10">
			<u-tabs 
			:list="tab_list" 
			:is-scroll="false" 
			:current="current" 
			bg-color="#5870FE"
			inactive-color="#ffffff"
			active-color="#ffffff"
			@change="change">
			</u-tabs>
		</view>
		<view class="bonus_com">
			<NiferexQuBonus v-if="current == 0"></NiferexQuBonus>
			<NiferexHosBonus v-else-if="current == 1"></NiferexHosBonus>
		</view>
	</view>
</template>

<script>
	import NiferexQuBonus from '@/components/bonus/NiferexQuBonus.vue';
	import NiferexHosBonus from '@/components/bonus/NiferexHosBonus.vue';
	export default {
		data() {
			return {
				tab_list:[
					{
						name: '达成增长奖'
					}, {
						name: '策略医院增长奖'
					},
				],
				current: 0
			};
		},
		components:{
			NiferexQuBonus,
			NiferexHosBonus
		},
		methods:{
			change(index) {
				this.current = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
.tabs_wrap{
    height: 220rpx;
    text-align: center;
	background-color: $color-31;
	
}
</style>
