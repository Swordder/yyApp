<template>
	<view class="content u-p-30">
		<view class="u-flex u-row-between u-p-t-26 u-p-b-26">
			<view class="">
				<text class="custom-icon u-font-40" style="marginLeft:-30rpx">&#xe603;</text>
				<text style="marginLeft:-10rpx">真实姓名</text>
			</view>
			<text class="right_txt">{{info.true_name}}</text>
		</view>
		<u-line></u-line>
		<view class="u-p-t-26">
			<view class="u-flex u-row-between u-m-b-30">
				<view class="">
					可服务的医院
				</view>
				<text class="right_txt">已选 {{info.serve_hospitals.length}}</text>
			</view>	
			<view class="">
				<template v-for="item in info.serve_hospitals">
					<view class="u-flex u-col-top u-m-r-20 u-m-b-24" :key="item.id">
						<text class="custom-icon green u-m-r-16 u-m-t-8">&#xe60e;</text>
						<view class="show_name">
							{{item.name}}
						</view>
					</view>
				</template>	
			</view>
		</view>
		<u-line></u-line>
		<view class="u-flex u-row-between u-p-t-26 u-p-b-26">
			<view class="">
				<text class="custom-icon u-font-40" style="marginLeft:-30rpx">&#xe603;</text>
				<text style="marginLeft:-10rpx">可服务的城市</text>
			</view>
			<text class="right_txt">{{info.city.name}}</text>
		</view>
		<u-line></u-line>
		<view class="u-flex u-row-between u-p-t-26 u-p-b-26">
			<view class="">
				<text class="custom-icon u-font-40" style="marginLeft:-30rpx">&#xe603;</text>
				<text style="marginLeft:-10rpx">公司</text>
				
			</view>
			<text class="right_txt">{{info.company.name}}</text>
		</view>
		<u-line></u-line>
		<view class="u-p-t-26">
			<view class="u-flex u-row-between u-m-b-30">
				<view class="">
					近期服务过的公司
				</view>
				<text class="right_txt">已选 {{info.serve_company.length}}</text>
			</view>	
			<view class="">
				<template v-for="(item,index) in info.serve_company">
					<view class="com_list u-col-top u-p-20 u-m-b-24" :key="index">
						<view class="u-flex u-col-top">
							<view class="left_txt ">公司名称：</view>
							<view class="u-flex-1">{{item.company_name}}</view>
						</view>
						<view class="u-flex u-col-top">
							<view class="left_txt">治疗领域：</view>
							<view class="u-flex-1">{{item.field.toString()}}</view>
						</view>
						<view class="u-flex u-col-top">
							<view class="left_txt">适应症：</view>
							<view class="u-flex-1">{{item.adaption.toString()}}</view>
						</view>
						<view class="u-flex u-col-top">
							<view class="left_txt">产品名称：</view>
							<view class="u-flex-1">{{item.product}}</view>
						</view>
					</view>
				</template>	
			</view>
		</view>
		<u-line></u-line>
		<view class="u-p-t-26">
			<view class="u-flex u-row-between u-m-b-30">
				<view class="">
					<text class="custom-icon u-font-40" style="marginLeft:-30rpx">&#xe603;</text>
					<text style="marginLeft:-10rpx">熟悉的科室</text>
				</view>
				<text class="right_txt">已选 {{info.department.length}}</text>
			</view>	
			<view class="">
				<template v-for="item in info.department">
					<view class="u-flex u-col-top u-m-r-20 u-m-b-24" :key="item.id">
						<text class="custom-icon green u-m-r-16 u-m-t-8">&#xe60e;</text>
						<view class="show_name">
							{{item.name}}
						</view>
					</view>
				</template>	
			</view>
		</view>
		<u-line></u-line>
		<view class="u-p-t-26">
			<view class="u-flex u-row-between u-m-b-30">
				<view class="">
					您擅长的服务方向
				</view>
				<text class="right_txt">已选 {{info.direction.length}}</text>
			</view>	
			<view class="btn_list">
				<template v-for="(item,index) in info.direction">
					<u-button class="u-m-r-20 u-m-b-20" size="mini" hover-class="none" shape="circle">{{item}}</u-button>
				</template>	
			</view>
		</view>
	</view>
</template>
<script>
	import { getVerifyInfo } from '@/api/auth.js';
	export default {
		data(){
			return {
				info:{
					true_name: "",
					serve_hospitals: [],
					city: {},
					company: {},
					serve_company: [],
					department: {},
					direction: []
				}
			}
		},
		onLoad() {
			this.getInfo()
		},
		methods:{
			async getInfo(){
				let res = await getVerifyInfo();
				this.info = { ...res.data.info };
			}
		}
	}
</script>
<style lang="scss" scoped>
	.custom-icon{
		color: $color-35;
	}
	.green{
		color: $color-37;
	}
	.show_name{
		line-height: 44rpx;
	}
	.right_txt{
		color: $color-x6;
	}
	.com_list{
		border: 2rpx solid $color-37;
		border-radius: 8rpx;
		color: $color-x6;
		line-height: 48rpx;
		.left_txt{
			width: 160rpx;
			font-weight: bold;
		}
	}
	.btn_list{
		.u-btn{
			background-color: #F0FFFC;
		}
	}
</style>
