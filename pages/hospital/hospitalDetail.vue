<template>
	<view class="content u-p-30">
		<HosDetail :info="info"></HosDetail>
		<view class="agree u-m-t-40">
			<view class="u-m-b-20 u-text-center u-font-32">
				服务须知
			</view>
			<view class="u-m-b-20">
				1. 提交服务申请后，优药平台将在1-3个工作日内进行处理
			</view>
			<view class="">
				2. 申请处理过程中，优药平台有可能与您进行联系，请保持手机畅通。
			</view>
		</view>
		<view class="btn u-p-30">
			<u-button class="selected" type="primary" shape="circle" hover-class="none" @click="applyHos()">申请服务</u-button>
		</view>
		<u-modal v-model="show" :show-title="false" :confirm-style="{color:'#5870FE'}">
			<view class="slot-content u-rela u-m-t-20">
				<u-image class="u-abso" width="360" height="340" src="http://img.youyao99.com/550B03B0AD09EB627B695CDC1A3F4558.png"></u-image>
				<view class="u-text-center u-m-b-30">
					服务申请已提交
				</view>
			</view>
		</u-modal>
	</view>
</template>
<script>
	import HosDetail from '@/components/HosDetail.vue';
	import { hospitalDetail,applyServe } from '@/api/hospital.js';
	
	export default {
		data(){
			return{
				info:{},
				show:false
			}
		},
		components:{
			HosDetail
		},
		onLoad() {
			let query = this.$Route.query;
			this.getDetail(query.hospital_id,query.series_id);
		},
		methods:{
			async getDetail(id,series_id){
				let res = await hospitalDetail(id,series_id);
				this.info = { ...res.data.info };
			},
			// 申请服务
			async applyHos(){
				let res = await applyServe({
					series_id:this.$Route.query.series_id,
					hospital_id:this.$Route.query.hospital_id
				});
				if(res.errcode == 0){
					this.show = true	
				};
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content{
		padding-bottom: 160rpx;
	}
	.slot-content{
		font-size: 28rpx;
		.u-abso{
			left: 50%;
			transform: translateX(-50%);
		}
	}
	.agree{
		.u-font-32{
			color: $color-x3;
			font-weight: bold;
		}
		color: $color-x6;
	}
	.btn{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: $color-xf;
		.selected{
			background-color: $color-31;
		}
	}
</style>
