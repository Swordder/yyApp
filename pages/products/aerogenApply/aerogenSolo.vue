<template>
	<view class="content">
		<view class="header u-p-40">
			<view class="u-font-36 u-m-b-24">Aerogen Solo</view>
			<u-avatar size="208" src="http://img.youyao99.com/BD58860E6A77A8700B4D87D482DBFD55.png"></u-avatar>
		</view>
		<!-- 产品优势 -->
		<view class="adv_list u-p-40">
			<view class="h3_title">优势-slogan</view>
			<SpecialList class="u-p-t-32" :special_list="special_list" :styles="styles"></SpecialList>
		</view>
		<!-- 产品特点 -->
		<view class="u-p-40" :style="{'backgroundColor':'#138CDE'}">
			<view class="h3_title u-m-b-54">产品特点</view>
			<u-image width="100%" height="640" src="http://img.youyao99.com/491700C0422D2DF3A18519B940DBB05E.png"></u-image>
		</view>
		<!-- 设置举例 -->
		<view class="u-p-40" :style="{'backgroundColor':'#0077C8'}">
			<view class="h3_title u-m-b-54">设置举例</view>
			<view class="setting_item u-m-b-60" v-for="(item,index) in setting_list" :key="index">
				<view class="title">{{item.title}}</view>
				<u-image width="100%" height="428" :src="item.image_url"></u-image>
			</view>
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
						title:'适用性',
						sub_title:'通气或是非通气患者所需的设备都可以使用气溶胶给药方法'
					},
					{
						title:'使用简便',
						sub_title:'通过AerogenⓇ Pro-X 控制器a 或 AerogenⓇ USB 控制器加强'
					},
					{
						title:'轻松整合不打破循环',
						sub_title:''
					},
					{
						title:'不增加气流快速简便设置',
						sub_title:''
					},
					{
						title:'最小残留体积',
						sub_title:''
					},
					{
						title:'循环上的药物潴留点',
						sub_title:''
					},
					{
						title:'多样性',
						sub_title:'适用于溶液、悬浊液、蛋白和肽'
					},
					{
						title:'经济',
						sub_title:'每个病人阶段性使用28天或是持续使用7天'
					},
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
				setting_list:[
					{
						title:'通气支持时对干燥侧进行加湿',
						image_url:'http://img.youyao99.com/5330A478E20042F16CBF1A8B05CD792F.png'
					},
					{
						title:'通气支持时在三通内的沉积 ',
						image_url:'http://img.youyao99.com/6E6BDEA119F4F6E95C61CF24ABB43A81.png'
					},
					{
						title:'儿科高流量',
						image_url:'http://img.youyao99.com/22F1AB722ABCEEEACA96D78D593CCEC7.png'
					},
				]
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
.setting_item{
	.title{
		line-height: 80rpx;
		color: $color-43;
		text-align: center;
		border: 2rpx solid $color-xf;
	}
}
</style>
