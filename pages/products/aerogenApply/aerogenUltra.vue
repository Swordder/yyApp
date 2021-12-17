<template>
	<view class="content">
		<view class="header u-p-40">
			<view class="u-font-36 u-m-b-24">Aerogen Ultra</view>
			<u-avatar size="208" src="http://img.youyao99.com/83DB55D3902A4E914B1237CAE6E5140F.png"></u-avatar>
		</view>
		<!-- 产品优势 -->
		<view class="adv_list u-p-40">
			<view class="h3_title">优势-slogan</view>
			<SpecialList class="u-p-t-32" :special_list="special_list" :styles="styles"></SpecialList>
		</view>
		<!-- 产品特点 -->
		<view class="u-p-40" :style="{'backgroundColor':'#138CDE'}">
			<view class="h3_title u-m-b-54">产品特点</view>
			<u-image width="100%" height="990" src="http://img.youyao99.com/A111432FB49ED80C8A8A1F9C17E8A8BA.png"></u-image>
		</view>
		<view class="fix_bt_btn u-p-30">
			<u-button 
			type="primary" 
			shape="circle" 
			hover-class="none"  
			:custom-style="{backgroundColor:'#0077C8'}"
			@click="toNextPage('/pages/webview/aerogenSurvey')">成为经销商</u-button>
		</view>
	</view>
</template>

<script>
	import SpecialList from '@/components/products/SpecialList.vue';
	export default {
		data() {
			return {
				special_list:[
					{
						title:'全静音设备',
						sub_title:''
					},
					{
						title:'使用简便',
						sub_title:'通过AerogenⓇ Pro-X 控制器a 或 AerogenⓇ USB 控制器加强'
					},
					{
						title:'给药快速，而且不增加额外流量',
						sub_title:''
					},
					{
						title:'全部标准气溶胶/有刻度的面罩内部可调',
						sub_title:''
					},
					{
						title:'在时间减半的情况下吸入药物更多',
						sub_title:''
					},
					{
						title:'更加快速的患者响应，缩短了治疗时间',
						sub_title:''
					}
				],
				styles:{
					width:'40rpx',
					height:'40rpx',
					backgroundColor:'#0077C8',
					indexColor:'#FFD100',
					color:'#FFD100',
					fontColor:'#0077C8',
					textAlign:'center'
				},
			};
		},
		components:{
			SpecialList
		},
		methods:{
			toNextPage(url){
				this.$Router.push({
					path:url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding-bottom: 160rpx;
	}
.header{
	color: $color-xf;
	text-align: center;
	background-color: $color-42;
}
.adv_list{
	color: #FFFFFF;
	background-color: $color-41;
}
.h3_title{
	position: relative;
	text-align: center;
	color: $color-xf;
	&::after{
		content: '';
		position: absolute;
		bottom: -10rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 36rpx;
		height: 6rpx;
		background-color: $color-xf;
	}
}
</style>
