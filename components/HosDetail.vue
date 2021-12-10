<template>
	<view class="hospital_info">
		<view class="u-font-36">
			{{info.name}}
		</view>
		<view class="u-m-t-12">
			<u-button v-show="info.level" class="u-m-r-12" type="primary" size="mini" shape="circle" :style="{'backgroundColor':'#E9ECFF','color':'#5870FE'}">{{info.level}}</u-button>
			<!-- <u-button type="primary" size="mini" shape="circle" :style="{'backgroundColor':'#ffefdf','color':'#ff982a'}">{{info.level}}</u-button> -->
		</view>
		<u-line class="u-m-t-40 u-m-b-40" :hair-line="false"></u-line>
		<view class="hospital_data">
			<view class="u-flex u-col-top u-m-b-28">
				<view class="u-m-r-60">
					<text class="custom-icon u-m-r-12">&#xe60e;</text>
					主管院长
				</view>
				<view class="u-flex-1">
					{{info.hospital_dean}}
				</view>
			</view>
			<view class="u-flex u-col-top u-m-b-28">
				<view class="u-m-r-60">
					<text class="custom-icon u-m-r-12">&#xe60e;</text>
					特色专科
				</view>
				<view class="u-flex-1">
					{{info.import_department}}
				</view>
			</view>
			<view class="u-flex u-col-top u-m-b-28">
				<view class="u-m-r-60">
					<text class="custom-icon u-m-r-12">&#xe60e;</text>
					床位总数
				</view>
				<view class="u-flex-1">
					{{info.bed_num}}
				</view>
			</view>
		</view>
		<u-line class="u-m-t-40 u-m-b-40" :hair-line="false"></u-line>
		<view class="hospital_add">
			<u-icon class="u-m-r-20" name="map" color="#5870FE" size="36"></u-icon>
			{{info.addr}}
		</view>
	</view>
</template>
<script>
	import { hospitalDetail } from '@/api/hospital.js';
	export default {
		props:['info'],
		data(){
			return{
			}
		},
	}
</script>
<style lang="scss" scoped>
	.hospital_info{
		padding: 40rpx 52rpx;
		box-shadow: 0px 2px 12px 0px rgba(204, 213, 224, 0.5);
		border-radius: 16rpx;
		.custom-icon{
			color: #0BC7A7;
		}
		.hospital_dep{
			color: #666666;
			.u-m-r-16{
				border: 2rpx solid #0BC7A7;
				background-color: #F0FFFC;
				border-radius: 20rpx;
				padding: 0 20rpx;
			}
			// font-size: ;
		}
	}
</style>
