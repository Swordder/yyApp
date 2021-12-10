<template>
	<view class="location_model">
		<u-modal 
		v-model="err_correct_con.show" 
		title="纠错" 
		:show-cancel-button="true"
		confirm-text="提交"
		:confirm-style="{color:'#5870FE'}"
		:title-style="{color: '#333333',padding:'40rpx 0',fontSize:'32rpx'}"
		@confirm="submitCorrCon()">
			<view 
			class="slot-content u-p-l-30 u-p-r-30"
			:style="{color: '#333333',fontSize:'28rpx'}">
				<view class="">
					如果您的流向信息有误，请在下方提交错误纠正信息，我们会尽快为您更新
				</view>
				<u-input 
				v-model="err_correct_con.content"
				class="u-m-b-40 u-m-t-40" 
				type="textarea" 
				:border="true" 
				placeholder="请输入内容">
				</u-input>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import { forHelp } from '@/api/mine.js';
	export default {
		props:['err_correct_con'],
		data(){
			return {
				
			}
		},
		methods:{
			async submitCorrCon(){
				this.$emit('submitCon');
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
